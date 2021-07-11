from flask.cli import AppGroup
from .users import seed_users, undo_users
from .types import seed_list_types, undo_list_types
# from .trips import seed_trips, undo_trips
from .items import seed_items, undo_items
from .lists import seed_lists, undo_lists

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_list_types()
    # seed_trips()
    seed_lists()
    seed_items()
    # Add other seed functions here

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_items()
    undo_lists()
    # undo_trips()
    undo_users()
    undo_list_types()
    # Add other undo functions here
