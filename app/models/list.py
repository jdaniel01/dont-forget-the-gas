from .db import db


class List(db.Model):
    __tablename__ = "lists"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    list_type = db.Column(db.Integer, db.ForeignKey(
        "list_types.id"), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    notes = db.Column(db.Text)

    owner = db.relationship("User", back_populates="list")
    type = db.relationship("ListType", back_populates="list")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "list_type": self.type.to_dict(),
            "owner": self.owner.to_dict(),
            "notes": self.notes
        }
