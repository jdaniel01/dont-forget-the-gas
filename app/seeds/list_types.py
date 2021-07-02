from app.models import db, ListType


def seed_list_types():

    demo = ListType(name="To-Do", description="Add a 'To-Do' list so you can stay on track.", color="green")
    demo2 = ListType(name="Grocery", description="Don't miss a single ingredient. Nobody likes bland food.", color="blue")
    demo3 = ListType(name="Packing", description="A list of the essentials for an amazing adventure!", color="purple")
    demo4 = ListType(name="Itinerary", description="There's a lot to remember when traveling. Seat numbers, phone numbers, room numbers, and names of a myriad of locations, people, and events. Let's take it easy on ourselves and keep it all in one place.", color="magenta")
    demo5 = ListType(name="Favorites", description="You can remember the tune and the song is at the tip of your tongue, what was it again? Just make a list of your all time favs and never get stuck searching for your go-tos again.", color="salmon")
    demo6 = ListType(name="Inventory", description="Hey, we know there are much better ways to keep track of a business inventory, this isn't for you (sorry).", color="yellow")
    demo7 = ListType(name="People", description="Yes, cause sometimes you have to keep track of humans too.", color="lightbrown")
    demo8 = ListType(name="General", description="Your list doesn't fit in a category? That's cool, here's a free choice list just for you.", color="lightblue")
    

    db.session.add(demo)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.add(demo5)
    db.session.add(demo6)
    db.session.add(demo7)
    db.session.add(demo8)

    db.session.commit()


def undo_list_types():

    db.session.execute('TRUNCATE TABLE list_types RESTART IDENTITY CASCADE;')
