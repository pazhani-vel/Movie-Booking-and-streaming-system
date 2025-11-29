from flask import Blueprint, request, jsonify
from extensions import client
from bson import ObjectId

admin_bp = Blueprint("admin", __name__)

db_home_movies = client["DBMS_project"]
home_movie_collection = db_home_movies["Movies_list"]

dbAdmin = client["admin"]
AdminDetails_collection = dbAdmin["AdminDetails"]


@admin_bp.route('/admin_login', methods=['POST'])
def login_admin():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    admin = AdminDetails_collection.find_one({"email": email})
    if not admin or password != admin['password']:
        return jsonify({"message": "Invalid email or password!"}), 401

    return jsonify({
        "message": "Login successful!",
        "user": {"name": admin['name'], "email": admin['email']}
    }), 200


@admin_bp.route("/Add_movie_admin", methods=["POST"])
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
        "poster": "http://127.0.0.1:5000/static/poster_not_available.png",
        "trailer": ""
    }

    home_movie_collection.insert_one(movie)
    return jsonify({"message": "Movie added successfully!"}), 201


@admin_bp.route("/admin_page_movies", methods=["GET"])
def admin_get_movies():
    movies = []
    for m in home_movie_collection.find():
        m["_id"] = str(m["_id"])
        movies.append(m)
    return jsonify({"movies": movies})


@admin_bp.route("/Delete_movie_admin/<movie_id>", methods=["DELETE"])
def admin_delete_movie(movie_id):
    result = home_movie_collection.delete_one({"_id": ObjectId(movie_id)})
    if result.deleted_count == 1:
        return jsonify({"message": "Movie deleted successfully!"})
    return jsonify({"message": "Movie not found!"}), 404
