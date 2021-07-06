from .db import db


class List(db.Model):
    __tablename__ = "lists"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    type_id = db.Column(db.Integer, db.ForeignKey(
        "list_types.id"), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    notes = db.Column(db.Text)

    owner = db.relationship("User", back_populates="lists")
    type_of = db.relationship("ListType", back_populates="lists")
    items = db.relationship("Item", backref="list")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "type_id": self.type_id,
            "owner": self.owner.to_dict(),
            "notes": self.notes,
            "list_type": self.list_type.to_dict(),
            "items": self.items.to_dict()
        }

    @property
    def name(self):
        return self.name
    
    @name.setter
    def name(self, name):
        self.name = name

    @property
    def list_type(self):
        return self.list_type

    @list_type.setter
    def list_type(self, list_type):
        self.list_type = list_type
        return self.list_type
        
    @property
    def notes(self):
        return self.notes
    
    @notes.setter
    def notes(self, notes):
        self.notes = notes
        return self.notes