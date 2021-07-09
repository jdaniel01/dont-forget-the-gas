from .db import db


class Item(db.Model):
    __tablename__ = "items"

    id = db.Column(db.Integer, primary_key=True)
    # name = db.Column(db.String(50), nullable=False)
    list_id = db.Column(db.Integer, db.ForeignKey(
        "lists.id"), nullable=False)
    itemNotes = db.Column(db.Text)
    itemName = db.Column(db.String(50), nullable=False)


#1
    list = db.relationship("List", back_populates="listItems")
#2
    # list_info = db.relationship("List")

    def to_dict(self):
        return {
            "id": self.id,
            "list_id": self.list_id,
            "itemName": self.itemName,
            "itemNotes": self.itemNotes,
        }

    @property
    def itemName(self):
        return self.itemName
    
    @itemName.setter
    def itemName(self, name):
        self.itemName = name
    
    @property
    def itemNotes(self):
        return self.itemNotes

    @itemNotes.setter
    def itemNotes(self, notes):
        self.itemNotes = notes