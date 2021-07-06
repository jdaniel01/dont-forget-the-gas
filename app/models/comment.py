from .db import db


class Comment(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    body = db.Column(db.Text, nullable=False)
    # photo_id = db.Column(db.Integer, db.ForeignKey("photos.id"))
    list_id = db.Column(db.Integer, db.ForeignKey("lists.id"), primary_key=True, nullable=True if not self.trip_id else False)
    trip_id = db.Column(db.Integer, db.ForeignKey("trips.id"), primary_key=True, nullable=True if not self.list_id else False)
    stop_id = db.Column(db.Integer, db.ForeignKey("stops.id"), primary_key=True, nullable=True)
    item_id = db.Column(db.Integer, db.ForeignKey("items.id"), primary_key=True, nullable=True)
    
    author_id = db.Column(
        db.Integer, db.ForeignKey("users.id"), nullable=False)

    author = db.relationship("User", back_populates="comment")
    
    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "body": self.body,
            "author": self.author.to_dict()
        }
