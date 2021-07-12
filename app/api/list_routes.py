from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy import desc
from app.models import List, Item, ListType, db
from app.forms import ItemForm, ListForm


list_routes = Blueprint("lists", __name__)


# ^^^^^^^^^^^^^^^^^^^^^^to do add and delete types.^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
@list_routes.route('/types')
@login_required
def postDelete():
    types = ListType.query.all()
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
    print("############IN List Routes Add Item", id, request.method)
    form = ItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        print("LLLLLLLLLLLLIIIIIISSSSST ITEM Validated")
        newItem = Item(
            itemName=form.data["itemName"],
            list_id=form.data["list_id"],
            itemNotes=form.data["itemNotes"]
        )
        db.session.add(newItem)
        db.session.commit()

        items = Item.query.filter_by(list_id=id).all()
        lists = List.query.filter_by(owner_id=current_user.id).all()
        alist = List.query.get(id)
        return {"items": [item.to_dict() for item in items], "list": alist.to_dict(), "lists": [dlist.to_dict() for dlist in lists]}
    print("ERROR: THIS IS A LONG ERROR NOT TO BE MISSED")


@list_routes.route('/<int:id>', methods=["PUT", "DELETE"])
@login_required
def updateAndDeleteList(id):

    if request.method == "PUT":
        form = ListForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            print("####/lists/id######### UPDATING LIST")
            oldList = List.query.get(id)
            if oldList:
                oldList["name"] = form.data["name"]
                oldList["type_id"] = form.data["type_id"]
                oldList["notes"] = form.data["notes"]
                db.session.commit()
                print("####SUCCESS!! USER HAS BEEN UPDATED#####")
                # blist = List.query.get(id).to_dict()
                # updated = List.query.filter(List.owner_id == blist.owner_id).all()
                # return {"lists": [aList.to_dict() for aList in updated], "list": blist}
            else:
                print("###ERROR##ERROR## unable to locate list by primary key:=====>", id)

        else: 
            print("######ERROR /UNABLE TO VALIDATE FORM LIST/ROUTE########", form, form.data)
    elif request.method == "DELETE":
        deleting = List.query.get(id).first()
        print(f"#####DELETING LIST #####{id}", deleting.to_dict())
        db.session.delete(deleting)
        db.session.commit()
    alist = ListType.query.get(id)
    items = Item.query.filter_by(list_id=id).all()
    lists = List.query.filter_by(owner_id=current_user.id).all()
    return {"lists": [aList.to_dict() for aList in lists], "list": alist.to_dict(), "items":[item.to_dict() for item in items]}


@list_routes.route('/<int:id>')
@login_required
def getList(id):
    alist = ListType.query.get(id)
    lists = List.query.filter_by(owner_id=alist.owner_id).all()
    items = Item.query.filter_by(list_id=id).all()
    print("###############LIST", alist.to_dict())
    return {"lists": [aList.to_dict() for aList in lists], "list": alist.to_dict(), "items": [item.to_dict() for item in items]}
    