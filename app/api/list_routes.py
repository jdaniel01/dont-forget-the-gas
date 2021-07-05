from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user


list_routes = Blueprint("lists", __name__)

@list_routes.route('/<int:id>')
@login_required
def getOneList(id):
    


@list_routes.route('/<int:id>', methods=["PUT", "DELETE"])
@login_required
def updateAndDeleteList(id):

    form = EditListForm()

    if form.validate_on_submit():
        print("####/lists/id######### UPDATING LIST")
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
    lists = List.query.filter_by(desc(owner_id=current_user.id)).all()
    return lists