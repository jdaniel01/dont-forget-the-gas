from .db import db


class Trip(db.Model):
    __tablename__ = "trips"

    id = db.Column(db.Integer, primary_key=True)
    leader_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    departure = db.Column(db.DateTime, nullable=False)
    arrival = db.Column(db.DateTime, nullable=False)
    days = db.Column(db.Integer, nullable=False)
    distance = db.Column(db.Float, nullable=False)
    description = db.Column(db.Text, nullable=False)

    photos = db.relationship("Photo", back_populates="trip")
    comments = db.relationship("Comment", back_populates="trip")
    leader = db.relationship("User", back_populates="trips")

    def to_dict(self):
        return {
            "id": self.id,
            "departure": self.departure,
            "arrival": self.arrival,
            "days": self.days,
            "distance": self.distance,
            "description": self.description,
            "photos": self.photos.to_dict()
        }
