from flask import Blueprint, jsonify, session, request
from app.models import User, db
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
        return current_user.to_dict()
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
        dict_user = user.to_dict()
        lists = List.query.filter(List.owner_id == dict_user.id).all()
        print("$$$$$$$$$$$$$LISTS$$$$$$$$$$$$$", lists)
        vehicles = Vehicle.query.filter(Vehicle.owner_id == dict_user.id).all()
        print("$$$$$$$$$$$$$vehicles$$$$$$$$$$$$$", vehicles)
        trips = Trip.query.filter(Trip.lead_id == dict_user.id).all()
        print("$$$$$$$$$$$$$trips$$$$$$$$$$$$$", trips)
        newUser = {
            "id": dict_user.id,
            "username": dict_user.username,
            "email": dict_user.email,
            "on_trip": dict_user.on_trip,
            "about": dict_user.about,
            "lists": lists,
            "trips": trips,
            "vehicles": vehicles
        }
        return newUser
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
        print("^^^^^^^^^^PASSWORD^^^^^^^^^^", newPassword)
        user = User(
            username=form.data['username'],
            email=form.data['email'],
            hashed_password=newPassword,
            about=form.data['about'],
            on_trip=False
        )
        print("#########################", user.hashed_password, user.to_dict())
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
