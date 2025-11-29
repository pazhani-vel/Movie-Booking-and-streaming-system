from flask_mail import Message
from extensions import mail

def send_mail(userId, theaterName, city, language, timing, seat_list):
    msg = Message(
        subject="From Cine Flow....",
        recipients=[userId]
    )

    msg.body = (
        f"Hello sir/Madam,\n\n"
        f"Your booking was successful!\n\n"
        f"Theater: {theaterName}\n"
        f"City: {city}\n"
        f"Language: {language}\n"
        f"Timing: {timing}\n"
        f"Seats: {seat_list}\n\n"
        "Thanks for choosing Cine Flow!"
    )

    mail.send(msg)
