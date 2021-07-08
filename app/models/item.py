from .db import db


class Item(db.Model):
    __tablename__ = "items"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    list_id = db.Column(db.Integer, db.ForeignKey("lists.id"), nullable=False)
    notes = db.Column(db.Text, nullable=True)

#1
    lists = db.relationship("List", back_populates="items")
#2
    # list_info = db.relationship("List")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
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