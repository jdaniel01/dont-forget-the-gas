from app.models import db, List

# Adds a demo user, you can add other users here if you want
def seed_lists():

    demo = List(name="Stuff for the trip", notes="", type_id=7, owner_id=3)
    demo2 = List(name="Things for taconight", notes="Don't forget to get a desert", type_id=8, owner_id=2)
    demo3 = List(name="Only the cheap stuff", notes="That wine was hard to find.", type_id=4, owner_id=1)
    demo4 = List(name="Reasearch Topics", notes="I'm never going to Lowes again! ", type_id=1, owner_id=3)
    demo5 = List(name="Favorite Chips", notes="So glad I packed my nose hair clippers.", type_id=6, owner_id=1)
    demo6 = List(name="My dog's muddiest moments", notes="I knew we should've packed dramamine", type_id=4, owner_id=2)
    demo7 = List(name="Best barbers in town", notes="", type_id=1, owner_id=1)
    demo8 = List(name="Wedding Venues", notes="", type_id=3, owner_id=3)
    
    
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
def undo_lists():
    db.session.execute('TRUNCATE TABLE lists RESTART IDENTITY CASCADE;')
    db.session.commit()