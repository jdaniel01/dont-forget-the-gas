from .db import db


class Trip(db.Model):
    __tablename__ = "trips"

    id = db.Column(db.Integer, primary_key=True)
    leader_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    departure = db.Column(db.DateTime, nullable=False)
    arrival = db.Column(db.DateTime, nullable=False)
    days = db.Column(db.Integer, nullable=False)
    distance = db.Column(db.Float, nullable=False)
    description = db.Column(db.Text, nullable=False)

#1
    # photos = db.relationship("Photo", back_populates="trip")
    # comments = db.relationship("Comment", back_populates="trip")
    # leader = db.relationship("User", back_populates="trips")
#2
    # photos = db.relationship("Photo", backref="trip")
    # leader = db.relationship("User", backref="trips")
    # stops = db.relationship("Stop", backref="trip")
#3
    # companions = db.relationship("Companion", secondary=subs, backref=db.backref("trip", lazy="dynamic"))


    @property
    def departure(self):
        return self.departure

    @departure.setter
    def departure(self, newDeparture):
        self.departure = newDeparture

    @property
    def arrival(self):
        return self.arrival

    @arrival.setter
    def arrival(self, newArrival):
        self.arrival = newArrival

    @property
    def days(self):
        return self.days

    @days.setter
    def days(self, newDays):
        self.days = newDays

    @property
    def distance(self):
        return self.distance

    @distance.setter
    def distance(self, newDistance):
        self.distance = newDistance


    @property
    def description(self):
        return self.description


    @description.setter
    def description(self, newDescription):
        self.description = newDescription

    def to_dict(self):
        return {
            "id": self.id,
            "departure": self.departure,
            "arrival": self.arrival,
            "days": self.days,
            "distance": self.distance,
            "description": self.description,
        }

