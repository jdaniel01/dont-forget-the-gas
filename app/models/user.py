from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from .db import db


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), unique=True, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)
    on_trip = db.Column(db.Boolean, nullable=False)
    about = db.Column(db.Text)

#1
    # vehicles = db.relationship("Vehicle", back_populates="owner")
    # trips = db.relationship("Trip", back_populates="leader")
    # comments = db.relationship("Comment", back_populates="author")
    # lists = db.relationship("List", back_populates="owner")
    # photos = db.relationship("Photo", back_populates="user")
#2
    # vehicles = db.relationship("Vehicle", backref="owner", lazy="dynamic")
    trips = db.relationship("Trip", backref="leader")
    comments = db.relationship("Comment", backref="author", lazy="dynamic")
    lists = db.relationship("List", backref="owner")
    photos = db.relationship("Photo", backref="user", lazy="dynamic")
#3
    companions = db.relationship("Trip", secondary="companions", backref=db.backref("companions", lazy="dynamic"))
    

    @property
    def username(self):
        return self.username
    
    @username.setter
    def username(self, username):
        self.username = username
    
    @property
    def email(self):
        return self.email
    
    @email.setter
    def email(self, email):
        self.email = email

    @property
    def on_trip(self):
        return self.on_trip
    
    @on_trip.setter
    def on_trip(self):
        self.on_trip = on_trip
    
    @property
    def about(self):
        return self.about
    
    @about.setter
    def about(self, about):
        self.about = about

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
            "about": self.about,
        }

    
    # def profile_load(self):

    #     return {
    #          "id": self.id,
    #         "username": self.username,
    #         "email": self.email,
    #         "on_trip": self.on_trip,
    #         "about": self.about,
    #         "lists": self.lists.to_dict(),
    #         "vehicles": self.vehicles.to_dict(),
    #         "photos": self.photos.to_dict(),
    #         "trips": self.trips.to_dict(),
    #     }
