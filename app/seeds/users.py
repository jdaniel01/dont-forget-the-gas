from werkzeug.security import generate_password_hash
from app.models import db, User

# Adds a demo user, you can add other users here if you want
def seed_users():

    demo = User(username='test', email='test@email.com',
                hashed_password=generate_password_hash('password'),
                on_trip=False,
                about="1 This is a story all about how ...")
    demo2 = User(username='test2', email='test2@email.com',
                hashed_password=generate_password_hash('password'),
                on_trip=False,
                about="2 This is a story all about how ...")
    demo3 = User(username='test3', email='test3@email.com',
                hashed_password=generate_password_hash('password'),
                on_trip=False,
                about="3 This is a story all about how ...")
    
    
    db.session.add(demo)
    db.session.add(demo2)
    db.session.add(demo3)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key

def undo_users():
    db.session.execute('TRUNCATE TABLE users RESTART IDENTITY CASCADE;')
    db.session.commit()
