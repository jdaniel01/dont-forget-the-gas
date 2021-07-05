from .db import db


class Companion(db.Model):
    __tablename__ = "companions"


    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), primary_key=True)
    trip_id = db.Column(db.Integer, db.ForeignKey("trips.id"), primary_key=True)
    role = db.Column(db.String(50))
    

    @property
    def role(self):
        return self.role

    @role.setter
    def role(self, role):
        self.role = role

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "trip_id": self.trip_id,
            "role": self.role
        }