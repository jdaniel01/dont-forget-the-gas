from app.models import db, Trip


# Adds a demo user, you can add other users here if you want
def seed_trips():

    demo = Trip(trip_name="To the Zoo!", description="This is going to be a one zoo trip for the record books.", lead_id=1, departure=DateTime.now(), days=7, arrival=DateTime.now()+timedelta(days=7), distance=777)
    demo2 = Trip(trip_name="Grand Canyon Baby!", description="Let's take a drive to the places we're excited to go.", lead_id=3, departure=DateTime.now()+7, days=7, arrival=DateTime.now()+timedelta(days=14), distance=1400)
    demo3 = Trip(trip_name="Just a Drive", description="Because sometimes we just want to hit the road.", lead_id=2, departure=DateTime.now(), days=4, arrival=DateTime.now()+timedelta(days=4), distance=743)
    demo4 = Trip(trip_name="East Coast Favorites", description="Bring your favorites treats, this one will take a while.", lead_id=2, departure=DateTime.now(), days=42, arrival=DateTime.now()+timedelta(days=42), distance=2300)
    demo5 = Trip(trip_name="Staying Away From Mountains", description="Hope you like trailerparks...", lead_id=1, departure=DateTime.now(), days=8, arrival=DateTime.now()+timedelta(days=8), distance=1200)
    demo6 = Trip(trip_name="Just Roll With It Tour", description="Grandma will be so surprized when we show up! Shhh, don't tell anyone.", lead_id=3, departure=DateTime.now(), days=5, arrival=DateTime.now()+timedelta(days=5), distance=800)
    demo7 = Trip(trip_name="Traveling Light", description="Underwear, socks, extra towels, climbing gear, laptop... That's light right?", lead_id=2, departure=DateTime.now(), days=3, arrival=DateTime.now()+timedelta(days=3), distance=400)
    demo8 = Trip(trip_name="Out N' Back", description="Going to a hidden location for an overnighter, not much of a roadtrip but come along.", lead_id=1, departure=DateTime.now(), days=2, arrival=DateTime.now()+timedelta(days=2), distance=120)
    
    
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
def undo_trips():
    db.session.execute('TRUNCATE TABLE trips RESTART IDENTITY CASCADE;')    
    db.session.commit()