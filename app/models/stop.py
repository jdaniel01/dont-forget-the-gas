from .db import db


class Stop(db.Model):
    __tablename__ = "stops"

    id = db.Column(db.Integer, primary_key=True)
    trip_id = db.Column(db.Integer, db.ForeignKey("trips.id"), primary_key=True)
    location_id = db.Column(db.Integer, db.ForeignKey(
        "locations.id"), primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    is_start = db.Column(db.Boolean)
    is_end = db.Column(db.Boolean)
    description = db.Column(db.Text())

    location = db.relationship("Location", back_populates="stops")
    trip = db.relationship("Trip", back_populates="stops")

    def to_dict(self):
        return {
            "id": self.id,
            "location": self.location.to_dict(),
            "name": self.name,
            "description": self.description,
            "is_start": self.is_start,
            "is_end": self.is_end
        }
