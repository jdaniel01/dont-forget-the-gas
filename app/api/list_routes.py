from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy import desc
from app.models import List, Item, ListType
from app.forms import ItemForm, ListForm


list_routes = Blueprint("lists", __name__)

@list_routes.route('/<int:id>')
@login_required
def getList(id):
    alist = ListType.query.get(id)
    return alist.to_dict()

# ^^^^^^^^^^^^^^^^^^^^^^to do add and delete types.^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
@list_routes.route('/types')
@login_required
def postDelete():
    types = ListType.query.all()
    print("EEEEEEEEEEEEEEEEEE", types)
    return {"types": [typer.to_dict() for typer in types]}

# @list_routes.route('/<int:id>/items')
# @login_required
# def getListItems(id):
#     print("######LIST##id######", id)
#     items = Item.query.filter_by(list_id=id).all()
#     return {"items": [item.to_dict() for item in items]}


@list_routes.route('/<int:id>/items', methods=["POST"])
@login_required
def addItem(id):
    print("############IN List Routes Add Item",  id, type(id))
    form = ItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        newItem = Item(
            list_id=form.data["list_id"]
        )
        db.session.add(newItem)
        db.session.commit()

        items = Item.query.filter_by(list_id=id).all()
        return {"items": [item.to_dict() for item in items]}
    print("ERROR: THIS IS A LONG ERROR NOT TO BE MISSED")


@list_routes.route('/<int:id>', methods=["PUT", "DELETE"])
@login_required
def updateAndDeleteList(id):

    form = ListForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if request.method == "PUT":
        if form.validate_on_submit():
            print("####/lists/id######### UPDATING LIST")
            oldList = List.query.get(id)
            if oldList:
                oldList["name"] = form["name"]
                oldList["type_id"] = form["type_id"]
                oldList["notes"] = form["notes"]
                db.session.commit()
                print("####SUCCESS!! USER HAS BEEN UPDATED#####")

        else:
            print("###ERROR##ERROR## unable to locate list by primary key")
    elif request.method == "DELETE":
        deleting = List.query.get(id)
        print("#####DELETING LIST #####", deleting)
        db.session.delete(deleting)
        db.session.commit()
    lists = List.query.filter_by(desc(owner_id=current_user.id)).all()
    return lists