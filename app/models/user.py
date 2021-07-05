from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from .db import db


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    on_trip = db.Column(db.Boolean, nullable=False)
    about = db.Column(db.Text)

    vehicle = db.relationship("Vehicle", back_populates="owner")
    trip = db.relationship("Trip", back_populates="lead")
    # comment = db.relationship("Comment", back_populates="author")
    lists = db.relationship("List", back_populates="owner")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):

        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "on_trip": self.on_trip,
            "about": self.about
        }
