from flask import Blueprint, jsonify
from extensions import client
from bson import ObjectId
from bson.errors import InvalidId

home_bp = Blueprint("home", __name__)

db_home = client["DBMS_project"]
home_movie_collection = db_home["Movies_list"]
top_movie_collection = db_home["Top_movies"]


@home_bp.route("/get", methods=["GET"])
def getdata():
    data = []
    for doc in home_movie_collection.find():
        doc['_id'] = str(doc['_id'])
        data.append(doc)
    return jsonify(data)


@home_bp.route("/gettopmovie", methods=["GET"])
def get_top_movies():
    data = []
    for doc in top_movie_collection.find():
        doc['_id'] = str(doc['_id'])
        data.append(doc)
    return jsonify(data)


@home_bp.route("/get/<id>", methods=['GET'])
def gettrailer(id):
    try:
        movie = home_movie_collection.find_one({"_id": ObjectId(id)})
        if movie:
            movie['_id'] = str(movie['_id'])
            return jsonify(movie)
        return jsonify({"error": "No record for this movie"}), 404

    except InvalidId:
        return jsonify({"error": "Invalid movie ID"}), 400


@home_bp.route("/gettopmovie/<id>", methods=['GET'])
def get_top_trailer(id):
    try:
        movie = top_movie_collection.find_one({"_id": ObjectId(id)})
        if movie:
            movie['_id'] = str(movie['_id'])
            return jsonify(movie)
        return jsonify({"error": "No record for this movie"}), 404

    except InvalidId:
        return jsonify({"error": "Invalid movie ID"}), 400
