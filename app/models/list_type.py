from .db import db


class ListType(db.Model):
    __tablename__ = "list_types"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)
    description = db.Column(db.Text, nullable=False)
    color = db.Column(db.String, nullable=False)

#1
    #lists = db.relationship("List", back_populates="list_type")
#2
    lists = db.relationship("List", backref="list_type")
    
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "color": self.color
        }

    @property
    def name(self):
        return self.name

    @name.setter
    def name(self, name):
        self.name = name
    
    @property
    def description(self):
        return self.description

    @description.setter
    def description(self, description):
        self.description = description
    
    @property
    def color(self):
        return self.color

    @color.setter
    def color(self, color):
        self.color = color
