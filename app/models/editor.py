from .db import db


class Editor(db.Model):
    __tablename__ = "editors"


    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), primary_key=True)
    list_id = db.Column(db.Integer, db.ForeignKey("lists.id"), primary_key=True)
    needs_approval = db.Column(db.Boolean, nullable=False)

    @property
    def needs_approval(self):
        return self.needs_approval

    @needs_approval.setter
    def needs_approval(self, newApproval):
        self.needs_approval = newApproval

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "list_id": self.list_id,
            "needs_approval": self.needs_approval
        }