from .db import db


class Photo(db.Model):
    __tablename__ = "photos"

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.Text, nullable=False)
    trip_id = db.Column(db.Integer, db.ForeignKey("trips.id"))
    stop_id = db.Column(db.Integer, db.ForeignKey("stops.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    alt_txt = db.Column(db.String, nullable=False)

    def to_dict(self):

        return {
            "id": self.id,
            "url": self.url,
            "alt_txt": self.alt_txt
        }
