from flask import Blueprint, request, jsonify
from services.email_service import send_mail

email_bp = Blueprint("email", __name__)


@email_bp.route("/sendmail", methods=["POST"])
def send_email():
    data = request.get_json()

    userId = data.get("userId")
    theaterName = data.get("theaterName")
    city = data.get("city")
    language = data.get("language")
    timing = data.get("timing")
    seats = data.get("seats")

    seat_list = ", ".join([s['seat'] for s in seats])

    send_mail(userId, theaterName, city, language, timing, seat_list)

    return jsonify({"message": "Email sent successfully"}), 200
