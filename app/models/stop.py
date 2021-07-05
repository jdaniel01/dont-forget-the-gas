from .db import db


class Stop(db.Model):
    __tablename__ = "stops"

    id = db.Column(db.Integer, primary_key=True)
    trip_id = db.Column(db.Integer, db.ForeignKey("trips.id"), nullable=False)
    location_id = db.Column(db.Integer, db.ForeignKey(
        "locations.id"), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
#1
    # photos = db.relationship("Photo", back_populates="stop")
    # location = db.relationship("Location", back_populates="stops")
#2
    # photos = db.relationship("Photo", backref="stop")
    # location = db.relationship("Location")
    # trip = db.relationship("Trip")


    def to_dict(self):
        return {
            "id": self.id,
            "location": self.location.to_dict(),
            "name": self.name,
            "description": self.description
        }
