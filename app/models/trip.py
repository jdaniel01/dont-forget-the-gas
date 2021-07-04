from .db import db


class Trip(db.Model):
    __tablename__ = "trips"

    id = db.Column(db.Integer, primary_key=True)
    lead_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    start = db.Column(db.Integer, db.ForeignKey("stops.id"), nullable=False)
    end = db.Column(db.Integer, db.ForeignKey("stops.id"), nullable=False)
    departure = db.Column(db.DateTime, nullable=False)
    arrival = db.Column(db.DateTime, nullable=False)
    days = db.Column(db.Integer, nullable=False)
    distance = db.Column(db.Float, nullable=False)
    description = db.Column(db.Text, nullable=False)

    start = db.relationship("Stop", backref="trip", lazy=True, uselist=False)
    end = db.relationship("Stop", backref="trip", lazy=True, uselist=False)
    photos = db.relationship("Photo", backref="trip", lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "start": self.stop.to_dict(),
            "end": self.stop.to_dict(),
            "departure": self.departure,
            "arrival": self.arrival,
            "days": self.days,
            "distance": self.distance,
            "description": self.description,
            "photos": self.photos.to_dict()
        }
