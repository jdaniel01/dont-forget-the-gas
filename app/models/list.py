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
    listItems = db.relationship("Item", back_populates="list_info")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "type_id": self.type_id,
            "owner_id": self.owner_id,
            "notes": self.notes,
            "type_of": self.type_of.to_dict(),
            "items": [bList.to_dict() for bList in self.listItems]
        }
