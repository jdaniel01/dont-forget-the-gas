from .db import db


class Location(db.Model):
    __tablename__ = "locations"

    id = db.Column(db.Integer, primary_key=True)
    lat = db.Column(db.Numeric(scale=13, asdecimal=False), nullable=False)
    lon = db.Column(db.Numeric(scale=13, asdecimal=False), nullable=False)
    name = db.Column(db.String, unique=True, nullable=False)
    description = db.Column(db.Text, nullable=False)

    def to_dict(self):

        Table users{
            id int[pk, increment] // auto-increment
            username varchar
            email varchar
            on_trip boolean
            about text
        }


Table vehicles{
    id int[pk, increment]
    make string
    model string
    storage float
    owner_id int
    color string
    capacity integer
    total_miles float
    fuel_type string
    fuel_tank float
    avg_mpg float
}


Table list_types {
    id int[pk, increment]
    name varchar
    description text
    color string
}

Table lists {
    id int[pk, increment]
    name varchar
    list_type int
    owner_id int
    notes text
}

Table items {
    id int[pk, increment]
    name varchar
    list_id int
    notes text
    due_date timestamp
    is_completed boolean
}

Table shares {
    id int[pk, increment]
    list_id int
    user_id int
}

Table trips {
    id int[pk, increment]
    lead int
    start int
    ETD timestamp
    end int
    ETA timestamp
    days int
    distance float
    description text
}

Table stops {
    id int[pk, increment]
    name varchar
    trip_id int
    lat float
    lon float
    next_stop int
}

Table photos {
    id int[pk, increment]
    url text
    trip_id int
    stop_id int[not null]
    user_id int
}

Table companions {
    id int[pk, increment]
    trip_id int
    user_id int
}

Table comments {
    id int[pk, increment]
    title varchar
    body varchar
    image text
    photo_id int
    trip_id int
    author int
    stop_id int
}
// Creating references
// You can also define relaionship separately
// > many-to-one
< one-to-many
- one-to-one
Ref: vehicles.owner_id > users.id
Ref: lists.list_type > list_types.id
Ref: lists.owner_id > users.id
Ref: items.list_id > lists.id
Ref: shares.list_id > lists.id
Ref: shares.user_id > users.id
Ref: trips.lead > users.id
Ref: stops.trip_id > trips.id
Ref: photos.trip_id > trips.id
Ref: photos.stop_id > stops.id
Ref: companions.trip_id > trips.id
Ref: companions.user_id > users.id
Ref: comments.trip_id > trips.id
Ref: comments.stop_id > stops.id
Ref: comments.photo_id > photos.id
Ref: comments.author > users.id
