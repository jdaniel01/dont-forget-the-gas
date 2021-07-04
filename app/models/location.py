from .db import db


class Location(db.Model):
    __tablename__ = "locations"

    id = db.Column(db.Integer, primary_key=True)
    lat = db.Column(db.Numeric(scale=13, asdecimal=False), nullable=False)
    lng = db.Column(db.Numeric(scale=13, asdecimal=False), nullable=False)
    name = db.Column(db.String(100), unique=True, nullable=False)
    description = db.Column(db.Text, nullable=False)

    stops = db.relationship("Stop", back_populates="location")
    photos = db. relationship("Photo", back_populates="location")
    comments = db.relationship("Comment", back_populates="location")

    def to_dict(self):
        return {
            "id": self.id,
            "lat": self.lat,
            "lon": self.lon,
            "name": self.name,
            "description": self.description
        }
