from flask import Blueprint, jsonify, request
from flask_login import login_required
from sqlalchemy import desc
from app.models import User, List
from app.forms import list_form, edit_list_form

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>/lists', methods=["GET", "POST"])
@login_required
def addAndAllList(id):

    form = list_form()

    if form.validate_on_submit():
        newList = List()
        form.populate_obj(newList)
        print("######/users/id/lists########### populated new object preparing to commit.")
        db.session.add(newList)
        db.session.commit()  
        print("#########users/id/lists########## SUCCESS! ADDED NEW LIST")
    else:
        print("#####ERROR FORM DID NOT VALIDATE####")
        return "Error: Form did not validate or no form was submitted"
    lists = List.query.filter_by(desc(owner_id=id)).all()
    return lists



@user_routes.route('/<int:id/lists/<int:listId>', methods=["PUT", "DELETE"])
@login_required
def updateAndDeleteList(id, listId):

    form = edit_list_form()

    if form.validate_on_submit():
        print("####/users/id/lists######### UPDATING LIST")
        oldList = List.query.get(id)
        if oldList:
            oldList["name"] = form["name"]
            oldList["list_type"] = form["list_type"]
            oldList["notes"] = form["notes"]

            db.session.commit()
            print("####SUCCESS!! USER HAS BEEN UPDATED#####")

        else:
            print("###ERROR##ERROR## unable to locate list by primary key")
            return "There was an Error"
    else:
        deleting = List.query.get(id)
        print("#####DELETING LIST #####", deleting)
        db.session.delete(deleting)
        db.session.commit()
    lists = List.query.filter_by(desc(owner_id=id)).all()
    return lists