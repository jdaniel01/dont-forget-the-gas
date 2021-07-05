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
    # photos = db.relationship("Photo", backref="vehicle")
    
    # owner = db.relationship("owner")
    
    @property
    def make(self):
        return self.make

    @make.setter
    def make(self, newMake):
        self.make = newMake

    @property
    def model(self):
        return self.model

    @model.setter
    def model(self, newModel):
        self.model = newModel

    @property
    def body(self):
        return self.body

    @body.setter
    def body(self, newBody):
        self.body = newBody

    @property
    def storage(self):
        return self.storage

    @storage.setter
    def storage(self, newStorage):
        self.storage = newStorage

    @property
    def color(self):
        return self.color

    @color.setter
    def color(self, newColor):
        self.color = newColor

    @property
    def capacity(self):
        return self.capacity
    
    @capacity.setter
    def capacity(self, newCapacity):
        self.capacity = newCapacity

    @property
    def total_miles(self):
        return self.total_miles

    @total_miles.setter
    def total_miles(self, newMiles):
        self.total_miles = newMiles

    @property
    def fuel_tank(self):
        return self.fuel_tank

    @fuel_tank.setter
    def fuel_tank(self, newTank):
        self.fuel_tank = newTank

    @property
    def fuel_type(self):
        return self.fuel_type

    @fuel_type.setter
    def fuel_type(self, newType):
        self.fuel_type = newType


    @property
    def avg_mpg(self):
        return self.avg_mpg

    @avg_mpg.setter
    def avg_mpg(self, newMpg):
        self.avg_mpg = newMpg

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

    