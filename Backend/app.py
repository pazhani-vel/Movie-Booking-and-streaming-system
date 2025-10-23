from flask import Flask, json, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import bcrypt
from bson import ObjectId
from datetime import datetime
from bson.objectid import ObjectId
from bson.errors import InvalidId

import os                   # To interact with the env
from flask_mail import Mail,Message
import dotenv

dotenv.load_dotenv()

app = Flask(__name__)

CORS(app)                   # Allow frontend to access backend

# 🔗 MongoDB connection
client = MongoClient("mongodb://localhost:27017/")

db = client["auth_db"]
users_collection = db["users"]


db_home_movies = client["DBMS_project"]
home_movie_collection = db_home_movies["Movies_list"]
top_movie_collection = db_home_movies["Top_movies"]



dbmovie = client["movie_booking"]
movie_collection = dbmovie["movies"]
theatre_collection = dbmovie["theatres"]
bookings_collection = dbmovie["bookings"]

dbAdmin = client["admin"]
AdminDetails_collection = dbAdmin["AdminDetails"]


app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False

app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')  # your Gmail
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')  # App Password
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('MAIL_USERNAME')  # default sender

mail = Mail(app)            # Integrating the mail and flask


# 🟢 Signup API
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if not name or not email or not password:
        return jsonify({"message": "All fields are required!"}), 400

    # Check if email already exists
    if users_collection.find_one({"email": email}):
        return jsonify({"message": "Email already registered!"}), 400

    # Hash password
    hashed_pw = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    users_collection.insert_one({
        "name": name,
        "email": email,
        "password": hashed_pw
    })

    return jsonify({"message": "Signup successful!"}), 201


# 🔑 Login API
@app.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = users_collection.find_one({"email": email})
    if not user:
        return jsonify({"message": "Invalid email or password!"}), 401

    if not bcrypt.checkpw(password.encode('utf-8') , user['password']):
        return jsonify({"message": "Invalid email or password!"}), 401

    return jsonify({"message": "Login successful!", "user" : {"name": user['name'], "email": user['email']}}), 200


@app.route('/admin_login', methods=['POST'])
def login_admin():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Find admin by email
    admin = AdminDetails_collection.find_one({"email": email})

    # If no admin found
    if not admin:
        return jsonify({"message": "Invalid email or password!"}), 401

    # Compare plain text password
    if password != admin['password']:
        return jsonify({"message": "Invalid email or password!"}), 401

    # If everything is correct
    return jsonify({
        "message": "Login successful!",
        "user": {
            "name": admin['name'],
            "email": admin['email']
        }
    }), 200



#Admin API

@app.route("/Add_movie_admin", methods=["POST"])
def admin_add_movie():
    data = request.get_json()
    title = data.get("title")
    cast = data.get("cast")
    description = data.get("description")
    genre = data.get("genre")

    if not all([title, cast, description, genre]):
        return jsonify({"message": "All fields are required!"}), 400

    movie = {
        "title": title,
        "cast": cast,
        "description": description,
        "genre": genre,
        "poster":"http://127.0.0.1:5000/static/poster_not_available.png",
        "trailer":""
    }

    home_movie_collection.insert_one(movie)
    return jsonify({"message": "Movie added successfully!"}), 201


# Get all movies
@app.route("/admin_page_movies", methods=["GET"])
def admin_get_movies():
    movies = []
    for m in home_movie_collection.find():
        m["_id"] = str(m["_id"])
        movies.append(m)
    return jsonify({"movies": movies})


# Delete a movie
@app.route("/Delete_movie_admin/<movie_id>", methods=["DELETE"])
def admin_delete_movie(movie_id):
    result = home_movie_collection.delete_one({"_id": ObjectId(movie_id)})
    if result.deleted_count == 1:
        return jsonify({"message": "Movie deleted successfully!"})
    else:
        return jsonify({"message": "Movie not found!"}), 404
    
# Home API

@app.route("/get", methods=["GET"])
def getdata():
    data = []
    for doc in home_movie_collection.find():
        doc['_id'] = str(doc['_id'])       # convert ObjectId to string
        data.append(doc)
    return jsonify(data)


@app.route("/gettopmovie", methods=["GET"])
def gettopdata():
    data = []
    for doc in top_movie_collection.find():
        doc['_id'] = str(doc['_id'])       # convert ObjectId to string
        data.append(doc)
    return jsonify(data)

# Movie Card API

@app.route("/get/<id>", methods=['GET'])
def gettrailer(id):
    try:
        movie = home_movie_collection.find_one({"_id": ObjectId(id)})
        if movie:
            movie['_id'] = str(movie['_id'])  # convert for JSON
            return jsonify(movie)
        else:
            return jsonify({"error": "No record for this movie"}), 404
    except InvalidId:
        return jsonify({"error": "Invalid movie ID"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@app.route("/gettopmovie/<id>", methods=['GET'])
def gettoptrailer(id):
    try:
        movie = top_movie_collection.find_one({"_id": ObjectId(id)})
        if movie:
            movie['_id'] = str(movie['_id'])  
            return jsonify(movie)               # convert for JSON
        else:
            return jsonify({"error": "No record for this movie"}), 404
    except InvalidId:
        return jsonify({"error": "Invalid movie ID"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

 # Booking movie collection  API

@app.route("/movies", methods=["GET"])
def get_movies():
    try:
        movies = list(movie_collection.find({}, {"_id": 1, "name": 1, "poster_url": 1,
                                                 "genre": 1, "language": 1,
                                                 "rating": 1, "likes": 1}))
        # Convert ObjectId to string
        for movie_items in movies:
            movie_items["_id"] = str(movie_items["_id"])
        return jsonify(movies), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# Particular movie details API

@app.route("/booking/<movie_id>", methods=["GET"])
def get_movie_by_id(movie_id):
    try:
        movie = movie_collection.find_one({"_id": movie_id})
        if not movie:
            return jsonify({"message": "Movie not found"}), 404

        # Convert ObjectId to string
        movie["_id"] = str(movie["_id"])
        return jsonify(movie), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# Like API

@app.route("/likes/<movie_id>", methods=["POST"])
def Give_Like_To_Movies(movie_id):
    try:
        result = movie_collection.update_one({"_id":movie_id},{"$inc":{"likes":1}})

        if result.matched_count == 0:
            return jsonify({"Message":"Movie is not found"}),404
        return jsonify({"Message":"Like added successfully"}),200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# Available Theaters API
    
@app.route("/theaters", methods=["GET"])
def get_theaters():
    try:
        movie_id = request.args.get("movieId")
        city = request.args.get("city")
        lang = request.args.get("lang")

        if not movie_id or not city or not lang:
            return jsonify({"error": "Missing required query parameters"}), 400

        # Query theaters where city matches and movie list contains the given movieId with the requested language
        theaters = list(theatre_collection.find({
            "city": city,
            "movies": {
                "$elemMatch": {
                    "_id": movie_id,
                    "language": lang
                }
            }
        }))

        # Convert ObjectId to string
        for theater in theaters:
            theater["_id"] = str(theater["_id"])

            # convert movie objectId of the movie inside the theater list to string
            for movie in theater.get("movies", []):
                if "_id" in movie:
                    movie["_id"] = str(movie["_id"])

        return jsonify(theaters), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

    
@app.route("/get_time", methods=["GET"])
def get_show_times():
    try:
        movie_id = request.args.get("movieId")
        city = request.args.get("city")
        lang = request.args.get("lang")
        theater_name = request.args.get("theater")

        if not movie_id or not city or not lang or not theater_name:
            return jsonify({"error": "Missing required query parameters"}), 400

        # Find theater document
        theater = theatre_collection.find_one({
            "name": theater_name,
            "city": city,
            "movies.language": lang,
            "movies._id": movie_id
        } , {"movies.$": 1, "_id": 0})

        if not theater or "movies" not in theater:
            return jsonify({"showTimes": []}), 200

        show_times = theater["movies"][0].get("showTimes", [])
        return jsonify({"showTimes": show_times}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# API to find the already booked seats

@app.route("/api/bookedSeats", methods=["GET"])
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


#  API To Book seats

@app.route("/api/bookSeats", methods=["POST"])
def book_seats():
    data = request.get_json()
    userId = data.get("userId")
    movieId = data.get("movieId")
    city = data.get("city")
    language = data.get("language")
    theaterName = data.get("theaterName")
    timing = data.get("timing")
    seats = data.get("seats")  # list of selected seats {seat: "A1", type: "Adult"}

    # Check for conflicts whether the selected seats are already booked

    conflict = bookings_collection.find_one({
        "movieId": movieId,
        "city": city,
        "language": language,
        "theaterName": theaterName,
        "timing": timing,
        "seats.seat": { "$in": [s['seat'] for s in seats] }
    })

    if conflict:
        return jsonify({"message": "Some seats are already booked"}), 400

    # Insert booking

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

def send_mail(userId,theaterName,city,language,timing,seat_list):
    msg = Message(
        subject="From Cine Flow....",
        recipients=[userId]    
        )                   # must be a valid email
    msg.body = (
        f"Hello sir/Madam,\n\n"
        f"Your booking was successful!\n\n"
        f"Booking Details:\n"
        f"Theater: {theaterName}\n"
        f"City: {city}\n"
        f"Language: {language}\n"
        f"Timing: {timing}\n"
        f"Seats: {seat_list}\n\n"
        "Thanks for choosing Cine Flow!\n"
        "If you have any queries, contact support."
        )
    mail.send(msg)

    print(os.getenv("MAIL_USERNAME"))
    print(os.getenv("MAIL_PASSWORD"))

@app.route("/sendmail", methods=["POST"])
def send_email():
    data = request.get_json()
    userId = data.get("userId")
    theaterName = data.get("theaterName")
    city = data.get("city")
    language = data.get("language")
    timing = data.get("timing")
    seats = data.get("seats")  # list of selected seats {seat: "A1", type: "Adult"}

    seat_list = ", ".join([s['seat'] for s in seats])

    send_mail(userId,theaterName,city,language,timing,seat_list)

    return jsonify({"message": "Email sent successfully"}), 200


@app.route("/api/bookedseat/<user_id>", methods=["GET"])
def get_user_bookings(user_id):
    
    # Fetch bookings for the user
    bookings = list(bookings_collection.find({"userId": user_id}))

    for b in bookings:
        b["_id"] = str(b["_id"])

        # Fetch movie details using string _id
        if "movieId" in b:
            movie = movie_collection.find_one({"_id": b["movieId"]})  # direct string match
            if movie:
                b["movieTitle"] = movie.get("name", "Unknown Movie")
                b["poster"] = movie.get("poster_url", "")
            else:
                b["movieTitle"] = "Unknown Movie"
                b["poster"] = ""

    return jsonify(bookings), 200


if __name__ == '__main__':
    app.run(debug=True)
