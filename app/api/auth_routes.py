from flask import Blueprint, jsonify, session, request
from app.models import User, db, List, Trip, Vehicle, ListType
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
from werkzeug.security import generate_password_hash

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        # print("$$$$$$$444444444444 USER AUTHENTICATED, AUTH ROUTES /", current_user, type(current_user), current_user)
        
        trips = Trip.query.filter_by(lead_id=current_user.id).all()
        lists = List.query.filter_by(owner_id=current_user.id).all()
        vehicles = Vehicle.query.filter_by(owner_id=current_user.id).all()
        types = ListType.query.all()
        user = current_user.to_dict()

        test = {
            "user": user, 
            "trips": [trip.to_dict() for trip in trips], 
            "lists": [aList.to_dict() for aList in lists], 
            "vehicles": [vehicle.to_dict() for vehicle in vehicles],
            "types": [typer.to_dict() for typer in types]
            }
        print("###########TEST$$$$$$$$$$$$", test)
        return test
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # print(request.get_json())
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        print('UUUUSSSSSEEEEEERRRRRR', type(user), user.to_dict())
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        newPassword = generate_password_hash(form.data["password"])
        user = User(
            username=form.data['username'],
            email=form.data['email'],
            hashed_password=newPassword,
            about=form.data['about'],
            on_trip=False
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
