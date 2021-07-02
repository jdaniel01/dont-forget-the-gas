from .db import db


class Comment(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    body = db.Column(db.Text, nullable=False)
    photo_id = db.Column(db.Integer, db.ForeignKey("photos.id"))
    trip_id = db.Column(db.Integer, db.ForeignKey("trips.id"))
    stop_id = db.Column(db.Integer, db.ForeignKey("stops.id"))
    author_id = db.Column(
        db.Integer, db.ForeignKey("users.id"), nullable=False)

    author = db.relationship("User", back_populates="comments")
    
    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "body": self.body,
            "author": self.author.to_dict()
        }
