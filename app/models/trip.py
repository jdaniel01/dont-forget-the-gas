from .db import db


class Trip(db.Model):
    __tablename__ = "trips"

    id = db.Column(db.Integer, primary_key=True)
    trip_name = db.Column(db.String, nullable=False)
    lead_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    # start = db.Column(db.Integer, db.ForeignKey("stops.id"), nullable=False)
    # end = db.Column(db.Integer, db.ForeignKey("stops.id"), nullable=False)
    departure = db.Column(db.DateTime, nullable=False)
    arrival = db.Column(db.DateTime, nullable=False)
    days = db.Column(db.Integer, nullable=False)
    distance = db.Column(db.Float, nullable=False)
    description = db.Column(db.Text, nullable=False)

    lead = db.relationship('User', back_populates='trips')
    # start = db.relationship("Stop", back_populates="trip")
    # end = db.relationship("Stop", back_populates="trip")
    stops = db.relationship("Stop", back_populates="trip")
    def to_dict(self):
        return {
            "id": self.id,
            "lead_id": self.lead_id,
            "trip_name": self.trip_name,
            # "start": self.stop.to_dict(),
            # "end": self.stop.to_dict(),
            "departure": self.departure,
            "arrival": self.arrival,
            "days": self.days,
            "distance": self.distance,
            "description": self.description,
            "stops": [stop.to_dict() for stop in self.stops]
        }
