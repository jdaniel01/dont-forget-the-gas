from .db import db


class Photo(db.Model):
    __tablename__ = "photos"

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.Text, nullable=False)
    trip_id = db.Column(db.Integer, db.ForeignKey("trips.id"))
    stop_id = db.Column(db.Integer, db.ForeignKey("stops.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    location_id = db.Column(db.Integer, db.ForeignKey("locations.id"))
    vehicle_id = db.Column(db.Integer, db.ForeignKey('vehicles.id'))
    alt_txt = db.Column(db.String, nullable=False)

    user = db.relationship("User", back_populates="photos")
    vehicle = db.relationship("Vehicle", back_populates="photos")
    trip = db.relationship("Trip", back_populates="photos")
    stop = db.relationship("Stop", back_populates="photos")
    location = db.relationship("Location", back_populates="photos")

    def to_dict(self):

        return {
            "id": self.id,
            "url": self.url,
            "alt_txt": self.alt_txt
        }
