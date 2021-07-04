from .db import db


class Vehicle(db.Model):
    __tablename__ = "vehicles"

    id = db.Column(db.Integer, primary_key=True)
    make = db.Column(db.String, nullable=False)
    model = db.Column(db.String, nullable=False)
    body = db.Column(db.String, nullable=False)
    storage = db.Column(db.Float, nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    color = db.Column(db.String, nullable=False)
    capacity = db.Column(db.Integer, nullable=False)
    total_miles = db.Column(db.Float, nullable=False)
    fuel_type = db.Column(db.String, nullable=False)
    fuel_tank = db.Column(db.Float, nullable=False)
    avg_mpg = db.Column(db.Float)

#1
    # photos = db.relationship("Photo", back_populates="vehicle")
    # owner = db.relationship("User", back_populates="vehicles")
#2
    photos = db.relationship("Photo", backref="vehicle")
    owner = db.reltionship("owner")

    def to_dict(self):
        return {
            "id": self.id,
            "make": self.make,
            "model": self.model,
            "body": self.body,
            "storage": self.storage,
            "color": self.color,
            "capacity": self.capacity,
            "total_miles": self.total_miles,
            "fuel_type": self.fuel_type,
            "fuel_tank": self.fuel_tank,
            "avg_mpg": self.avg_mpg,
            "photos": self.photos.to_dict()
        }
