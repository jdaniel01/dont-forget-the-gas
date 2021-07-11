from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy import desc
from app.models import User, List, Vehicle, db, Trip
from app.forms import ListForm, VehicleForm, TripForm


user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id).to_dict()
    vehicles = Vehicle.query.filter_by(owner_id=user.id).to_dict()
    return {"user": user, "vehicles": [vehicle.to_dict() for vehicle in vehicles]}


@user_routes.route('/<int:id>/lists', methods=["GET", "POST"])
@login_required
def addAndAllLists(id):
    if request.method == "POST":
        form = ListForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            newList = List()
            form.populate_obj(newList)
            print("######/users/id/lists########### populated new object preparing to commit.")
            db.session.add(newList)
            db.session.commit()  
            print("#########users/id/lists########## SUCCESS! ADDED NEW LIST")
        else:
            print("#####ERROR FORM DID NOT VALIDATE####")
            #NOTE Need to come back and add query below to show all lists for user id in 'params' so friends can see their friends profiles.

    lists = List.query.filter_by(owner_id=current_user.id).all()
    return {"lists": [aList.to_dict() for aList in lists]}



@user_routes.route('/<int:id>/trips', methods=["GET", "POST"])
@login_required
def addAndAllTrips(id):
    if request.method == "POST":
        form = TripForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            newTrip = Trip()
            form.populate_obj(newTrip)
            print("######/users/id/trips########### populated new object preparing to commit.")
            db.session.add(newTrip)
            db.session.commit()  
            print("#########users/id/trips########## SUCCESS! ADDED NEW TRIP")
        else:
            print("#####ERROR FORM DID NOT VALIDATE####")
            #NOTE Need to come back and add query below to show all trips for user id in 'params' so friends can see their friends profiles.
    trips = Trip.query.filter_by(lead_id=current_user.id).all()
    return {"trips": [trip.to_dict() for trip in trips]}



@user_routes.route('/<int:id>/vehicles', methods=["GET", "POST"])
@login_required
def addAndAllVehicles(id):
    if request.method == "POST":
        form = VehicleForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            # print("^^^^^^^^^^^^^^IN VEHICLE ROUTE", request.body)
            newVehicle = Vehicle()
            form.populate_obj(newVehicle)
            # print("######/users/id/vehicles########### populated new object preparing to commit.", newVehicle)
            db.session.add(newVehicle)
            db.session.commit()  
            # print("#########users/id/vehicles########## SUCCESS! ADDED NEW Vehicle")
    vehicles = Vehicle.query.filter_by(owner_id=current_user.id).all()
    return {"vehicles": [vehicle.to_dict() for vehicle in vehicles]}
