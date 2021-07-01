from .db import db


class Stop(db.Model):
    __tablename__ = "stops"

    id = db.Column(db.Integer, primary_key=True)
    trip_id = db.Column(db.Integer, db.ForeignKey("trips.id"), nullable=False)
    location_id = db.Column(db.Integer, db.ForeignKey(
        "locations.id"), nullable=False)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.Text)

    location = db.relationship("Location", back_populates="stop")

    def to_dict(self):
        return {
            "id": self.id,
            "location": self.location.to_dict(),
            "name": self.name,
            "description": self.description
        }
