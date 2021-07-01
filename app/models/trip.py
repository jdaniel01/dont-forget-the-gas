from .db import db


class Trip(db.Model):
    __tablename__ = "trips"

    id = db.Column(db.Integer, primary_key=True)
    lead_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    start = db.Column(db.Integer, db.ForeignKey("stops.id"), nullable=False)
    end = db.Column(db.Integer, db.ForeginKey("stops.id"), nullable=False)
    departure = db.Column(db.Datetime, nullable=False)
    arrival = db.Column(db.Datetime, nullable=False)
    days = db.Column(db.Integer, nullable=False)
    distance = db.Column(db.Float, nullable=False)
    description = db.Column(db.Text, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "lead": self.lead.to_dict(),
            "start": self.stop.to_dict(),
            "end": self.stop.to_dict(),
            "departure": self.departure,
            "arrival": self.arrival,
            "days": self.days,
            "distance": self.distance,
            "description": self.description
        }
