from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy import desc
from app.models import Item
from app.forms import ItemForm


item_routes = Blueprint("items", __name__)

@item_routes.route('/<int:id>', methods=["PUT", "DELETE"])
@login_required
def getItem(id):
    if request.methods == "PUT":
        anItem = Item.query.get(id)
        form = ItemForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            print("####/items/id######### UPDATING Item")
            if anItem:
            # oldItem["name"] = form["name"]
                oldItem["list_id"] = form["list_id"]
            # oldItem["notes"] = form["notes"]

                db.session.commit()
                print("####SUCCESS!! USER HAS BEEN UPDATED#####")
            else:
                print("###ERROR##ERROR## unable to locate Item by primary key")
                return "There was an Error"    
    else:
        deleting = Item.query.get(id)
        print("#####DELETING Item #####", deleting)
        db.session.delete(deleting)
        db.session.commit()
        return status(304)

