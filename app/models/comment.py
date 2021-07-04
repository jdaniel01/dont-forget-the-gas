from .db import db


class Comment(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    body = db.Column(db.Text, nullable=False)
    location_id = db.Column(db.Integer, db.ForeignKey("locations.id"))
    list_id = db.Column(db.Integer, db.ForeignKey("lists.id"))
    trip_id = db.Column(db.Integer, db.ForeignKey("trips.id"))
    stop_id = db.Column(db.Integer, db.ForeignKey("stops.id"))
    author_id = db.Column(
        db.Integer, db.ForeignKey("users.id"), nullable=False)

    location = db.relationship("Location", back_populates="comments")
    list_info = db.relationship("List", back_populates="comments")
    trip = db.relationship("Trip", back_populates="comments")
    stop = db.relationship("Stop", back_populates="comments")
    author = db.relationship("User", back_populates="comments")

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "body": self.body,
            "author": self.author.to_dict()
        }

    @property
    def title(self):
        return self.title

    @title.setter
    def title(self, title):
        self.title = title
    

    @property
    def body(self):
        return self.body
    
    @body.setter
    def body(self, body):
        self.body = body


    @property
    def photo_id(self):
        return self.photo_id
    
    @photo_id.setter
    def photo_id(self, photo_id):
        self.photo_id = photo_id


    @property
    def trip_id(self):
        return self.trip_id
    
    @trip_id.setter
    def trip_id(self, trip_id):
        self.trip_id = trip_id

    
    @property
    def stop_id(self):
        return self.stop_id
    
    @stop_id.setter
    def stop_id(self, stop_id):
        self.stop_id = stop_id
