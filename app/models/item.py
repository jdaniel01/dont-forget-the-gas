from .db import db


class Item(db.Model):
    __tablename__ = "items"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    list_id = db.Column(db.Integer, db.ForeignKey("lists.id"), nullable=False)
    notes = db.Column(db.Text(500))

    list_info = db.relationship("List", back_populates="items")

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "notes": self.notes
        }

    @property
    def title(self):
        return self.title
    
    @title.setter
    def title(self, title):
        self.title = title
    
    @property
    def notes(self):
        return self.notes

    @notes.setter
    def notes(self, notes):
        self.notes = notes