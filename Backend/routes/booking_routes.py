from flask import Blueprint, request, jsonify
from extensions import client
from bson import ObjectId
from datetime import datetime

booking_bp = Blueprint("booking", __name__)

dbmovie = client["movie_booking"]
movie_collection = dbmovie["movies"]
theatre_collection = dbmovie["theatres"]
bookings_collection = dbmovie["bookings"]


@booking_bp.route("/movies", methods=["GET"])
def get_movies():
    try:
        movies = list(movie_collection.find({}, {
            "_id": 1, "name": 1, "poster_url": 1,
            "genre": 1, "language": 1, "rating": 1, "likes": 1
        }))

        for m in movies:
            m["_id"] = str(m["_id"])

        return jsonify(movies), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@booking_bp.route("/booking/<movie_id>", methods=["GET"])
def get_movie_by_id(movie_id):
    movie = movie_collection.find_one({"_id": movie_id})
    if not movie:
        return jsonify({"message": "Movie not found"}), 404

    movie["_id"] = str(movie["_id"])
    return jsonify(movie), 200


@booking_bp.route("/likes/<movie_id>", methods=["POST"])
def give_like(movie_id):
    result = movie_collection.update_one({"_id": movie_id}, {"$inc": {"likes": 1}})
    if result.matched_count == 0:
        return jsonify({"Message": "Movie not found"}), 404
    return jsonify({"Message": "Like added successfully"}), 200


@booking_bp.route("/theaters", methods=["GET"])
def get_theaters():
    movie_id = request.args.get("movieId")
    city = request.args.get("city")
    lang = request.args.get("lang")

    theaters = list(theatre_collection.find({
        "city": city,
        "movies": {"$elemMatch": {"_id": movie_id, "language": lang}}
    }))

    for t in theaters:
        t["_id"] = str(t["_id"])
        for m in t.get("movies", []):
            if "_id" in m:
                m["_id"] = str(m["_id"])

    return jsonify(theaters), 200


@booking_bp.route("/get_time", methods=["GET"])
def get_show_times():
    movie_id = request.args.get("movieId")
    city = request.args.get("city")
    lang = request.args.get("lang")
    theater_name = request.args.get("theater")

    theater = theatre_collection.find_one({
        "name": theater_name,
        "city": city,
        "movies.language": lang,
        "movies._id": movie_id
    }, {"movies.$": 1, "_id": 0})

    if not theater:
        return jsonify({"showTimes": []}), 200

    return jsonify({"showTimes": theater["movies"][0].get("showTimes", [])}), 200


@booking_bp.route("/api/bookedSeats", methods=["GET"])
def get_booked_seats():
    movieId = request.args.get("movieId")
    city = request.args.get("city")
    language = request.args.get("language")
    theaterName = request.args.get("theaterName")
    timing = request.args.get("timing")

    booked_docs = bookings_collection.find({
        "movieId": movieId,
        "city": city,
        "language": language,
        "theaterName": theaterName,
        "timing": timing
    })

    booked_seats = []
    for doc in booked_docs:
        booked_seats.extend([seat['seat'] for seat in doc['seats']])

    return jsonify(booked_seats)


@booking_bp.route("/api/bookSeats", methods=["POST"])
def book_seats():
    data = request.get_json()
    userId = data.get("userId")
    movieId = data.get("movieId")
    city = data.get("city")
    language = data.get("language")
    theaterName = data.get("theaterName")
    timing = data.get("timing")
    seats = data.get("seats")

    conflict = bookings_collection.find_one({
        "movieId": movieId,
        "city": city,
        "language": language,
        "theaterName": theaterName,
        "timing": timing,
        "seats.seat": {"$in": [s['seat'] for s in seats]}
    })

    if conflict:
        return jsonify({"message": "Some seats are already booked"}), 400

    booking_doc = {
        "userId": userId,
        "movieId": movieId,
        "city": city,
        "language": language,
        "theaterName": theaterName,
        "timing": timing,
        "seats": seats,
        "bookingTime": datetime.utcnow()
    }

    bookings_collection.insert_one(booking_doc)

    return jsonify({"message": "Seats booked successfully"}), 200


@booking_bp.route("/api/bookedseat/<user_id>", methods=["GET"])
def get_user_bookings(user_id):
    bookings = list(bookings_collection.find({"userId": user_id}))

    for b in bookings:
        b["_id"] = str(b["_id"])
        movie = movie_collection.find_one({"_id": b.get("movieId")})

        if movie:
            b["movieTitle"] = movie.get("name", "Unknown Movie")
            b["poster"] = movie.get("poster_url", "")

    return jsonify(bookings), 200
