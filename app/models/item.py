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
            "list_id": self.list_id
            # "name": self.name,
            # "notes": self.notes
        }

    @property
    def name(self):
        return self.name
    
    @name.setter
    def name(self, name):
        self.name = name
    
    @property
    def notes(self):
        return self.notes

    @notes.setter
    def notes(self, notes):
        self.notes = notes