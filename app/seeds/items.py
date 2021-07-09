from app.models import db, Item

# Adds a demo user, you can add other users here if you want
def seed_items():

    demo = Item(itemName="Stuff for the trip", itemNotes="", Item_id=8, )
    demo2 = Item(itemName="Things for taconight", itemNotes="Don't forget to get a desert", Item_id=7, )
    demo3 = Item(itemName="Only the cheap stuff", itemNotes="That wine was hard to find.", Item_id=6, )
    demo4 = Item(itemName="Reasearch Topics", itemNotes="I'm never going to Lowes again! ", Item_id=5, )
    demo5 = Item(itemName="Favorite Chips", itemNotes="So glad I packed my nose hair clippers.", Item_id=4, )
    demo6 = Item(itemName="My dog's muddiest moments", itemNotes="I knew we should've packed dramamine", Item_id=3, )
    demo7 = Item(itemName="Best barbers in town", itemNotes="", Item_id=2, )
    demo8 = Item(itemName="Wedding Venues", itemNotes="", Item_id=1, )
    
    
    db.session.add(demo)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.add(demo5)
    db.session.add(demo6)
    db.session.add(demo7)
    db.session.add(demo8)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_items():
    db.session.execute('TRUNCATE TABLE items RESTART IDENTITY CASCADE;')
    db.session.commit()