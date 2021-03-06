from .db import db


class Item(db.Model):
    __tablename__ = "items"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=True)
    # name = db.Column(db.String(50), nullable=False)
    list_id = db.Column(db.Integer, db.ForeignKey(
        "lists.id"), nullable=False)
    about = db.Column(db.Text, nullable=True)
    itemNotes = db.Column(db.Text)
    itemName = db.Column(db.String(50), nullable=False)


#1
    list_info = db.relationship("List", back_populates="listItems")
#2
    # list_info = db.relationship("List")

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "list_id": self.list_id,
            "about": self.about,
            "itemName": self.itemName,
            "itemNotes": self.itemNotes
        }

    # @property
    # def itemName(self):
    #     return self.itemName
    
    # @itemName.setter
    # def itemName(self, iName):
    #     self.itemName = iName
    
    # @property
    # def itemNotes(self):
    #     return self.itemNotes

    # @itemNotes.setter
    # def itemNotes(self, iNotes):
    #     self.itemNotes = iNotes