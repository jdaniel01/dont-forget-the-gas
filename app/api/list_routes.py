from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy import desc
from app.models import List, Item


list_routes = Blueprint("lists", __name__)

@list_routes.route('/<int:id>')
@login_required
def getList(id):
    alist = ListType.query.get(id)
    return alist.to_dict()

@list_routes.route('/types')
@login_required
def getAllTypes():
    types = ListType.query.all()
    print ("#############TYPES############", types, type(types))

@list_routes.route('/<int:id>/items')
@login_required
def getListItems(id):
    print("######LIST##id######", alist, id)
    items = Item.query.filter_by(list_id=id).all()
    return {"items": [item.to_dict() for item in items]}

@list_routes.route('/<int:id>', methods=["PUT", "DELETE"])
@login_required
def updateAndDeleteList(id):

    form = ListForm()
    form['csrf_token'].data = request.cookies['csrf_token']
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