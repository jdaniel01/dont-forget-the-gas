from app.models import db, ListType

# Adds a demo user, you can add other users here if you want
def seed_list_types():

    demo = ListType(name="Shopping", description="Everyone needs a shopping list.", color="red")
    demo2 = ListType(name="To-Do", description="The average go-to to-do list.", color="orange")
    demo3 = ListType(name="People", description="Because sometimes we keep track of people.", color="yellow")
    demo4 = ListType(name="Favorites", description="Songs, movies, books, food dishes, you name it, literally.", color="green")
    demo5 = ListType(name="Reminders", description="Trash is on Wednesdays", color="blue")
    demo6 = ListType(name="Events", description="Don't be late to grandma's birthday!", color="purple")
    demo7 = ListType(name="Packing", description="Underwear, socks, extra towels, climbing gear, laptop...", color="brown")
    demo8 = ListType(name="Other", description="Because you think outside the box.", color="magenta")
    
    
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
def undo_list_types():
    db.session.execute('TRUNCATE TABLE list_types RESTART IDENTITY CASCADE;')    
    db.session.commit()
