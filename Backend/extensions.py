from pymongo import MongoClient
from flask_mail import Mail

mail = Mail()

client = MongoClient("mongodb://localhost:27017/")
