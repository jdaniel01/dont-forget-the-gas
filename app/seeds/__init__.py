from flask.cli import AppGroup
from .users import seed_users, undo_users
from .list_types import seed_list_types, undo_list_types

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_list_types()
    # Add other seed functions here

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    #need to place depenents before dependecy
    undo_users()
    undo_list_types()
    # Add other undo functions here
