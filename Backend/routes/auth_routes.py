from flask import Blueprint, request, jsonify
from extensions import client
import bcrypt

auth_bp = Blueprint("auth", __name__)

db = client["auth_db"]
users_collection = db["users"]


@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if not name or not email or not password:
        return jsonify({"message": "All fields are required!"}), 400

    if users_collection.find_one({"email": email}):
        return jsonify({"message": "Email already registered!"}), 400

    hashed_pw = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    users_collection.insert_one({
        "name": name,
        "email": email,
        "password": hashed_pw
    })

    return jsonify({"message": "Signup successful!"}), 201


@auth_bp.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = users_collection.find_one({"email": email})
    if not user:
        return jsonify({"message": "Invalid email or password!"}), 401

    if not bcrypt.checkpw(password.encode('utf-8'), user['password']):
        return jsonify({"message": "Invalid email or password!"}), 401

    return jsonify({
        "message": "Login successful!",
        "user": {"name": user['name'], "email": user['email']}
    }), 200
