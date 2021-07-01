from .db import db


class Stop(db.Model):
    __tablename__ = "stops"

    id = db.Column(db.Integer, primary_key=True)
    trip_id = db.Column(db.Integer, db.ForeignKey("trips.id"), nullable=False)
    lat = db.Column(db.Numeric(scale=13, asdecimal=False), nullable=False)
    lon = db.Column(db.Numeric(scale=13, asdecimal=False), nullable=False)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.Text)

    start = db.relationship("Trip", back_populates="stop")
    end = db.relationship("Trip", back_populates="stop")

    def to_dict(self):
        return {
            "id": self.id,
            "trip_id": self.trip_id,
            "lat": self.lat,
            "lon": self.lon,
            "name": self.name,
            "description": self.description
        }
