from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy import desc
from app.models import Item
from app.forms import ItemForm


item_routes = Blueprint("items", __name__)

@item_routes.route('/<int:id>', methods=["PUT", "DELETE"])
@login_required
def getItem(id):
    anItem = Item.query.get(id)
    listId = anItem.list_id
    if request.method == "PUT":
        form = ItemForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            print("####/items/id######### UPDATING Item")
            if anItem:
                oldItem["itemName"] = form["itemName"]
                oldItem["list_id"] = form["list_id"]
                oldItem["itemNotes"] = form["itemNotes"]

                db.session.commit()
                print("####SUCCESS!! USER HAS BEEN UPDATED#####")
            else:
                print("###ERROR##ERROR## unable to locate Item by primary key")   
    else:
        deleting = Item.query.get(id)
        print("#####DELETING Item #####", deleting)
        db.session.delete(deleting)
        db.session.commit()
    items = Item.query.filter_by(list_id=listId).all()
    return {"items": [anItem.to_dict() for anItem in items]}

