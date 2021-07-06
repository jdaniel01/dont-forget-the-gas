from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy import desc
from app.models.trip import Trip
from app.forms import TripFrom


trip_routes = Blueprint("trips", __name__)


@trip_routes.route('/<int:id>')
@login_required
def getOneTrip(id):
    print("$$$$$$$$$$$TEST$$$$$$$$$", type(id))
    aTrip = Trip.query.get(id)
    # print("######trip##id######", aTrip, id)
    return aTrip

@trip_routes.route('/<int:id>', methods=["PUT", "DELETE"])
@login_required
def updateAndDeletetrip(id):

    form = TripForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        print("####/trips/id######### UPDATING trip")
        oldTrip = Trip.query.get(id)
        if oldTrip:
            # oldTrip["name"] = form["name"]
            # oldTrip["trip_type"] = form["trip_type"]
            # oldTrip["notes"] = form["notes"]

            db.session.commit()
            print("####SUCCESS!! USER HAS BEEN UPDATED#####")

        else:
            print("###ERROR##ERROR## unable to locate trip by primary key")
            return "There was an Error"
    else:
        deleting = Trip.query.get(id)
        print("#####DELETING trip #####", deleting)
        db.session.delete(deleting)
        db.session.commit()
    trips = Trip.query.filter_by(desc(lead_id=current_user.id)).all()
    return trips