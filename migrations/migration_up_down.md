def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('list_types',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('description', sa.Text(), nullable=False),
    sa.Column('color', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('locations',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('lat', sa.Numeric(scale=13, asdecimal=False), nullable=False),
    sa.Column('lon', sa.Numeric(scale=13, asdecimal=False), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('description', sa.Text(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('on_trip', sa.Boolean(), nullable=False),
    sa.Column('about', sa.Text(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('lists',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('type_id', sa.Integer(), nullable=False),
    sa.Column('owner_id', sa.Integer(), nullable=False),
    sa.Column('notes', sa.Text(), nullable=True),
    sa.ForeignKeyConstraint(['type_id'], ['list_types.id'], ),
    sa.ForeignKeyConstraint(['owner_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('trips',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('lead_id', sa.Integer(), nullable=False),
    sa.Column('departure', sa.DateTime(), nullable=False),
    sa.Column('arrival', sa.DateTime(), nullable=False),
    sa.Column('days', sa.Integer(), nullable=False),
    sa.Column('distance', sa.Float(), nullable=False),
    sa.Column('description', sa.Text(), nullable=False),
    sa.ForeignKeyConstraint(['lead_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('vehicles',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('make', sa.String(), nullable=False),
    sa.Column('model', sa.String(), nullable=False),
    sa.Column('body', sa.String(), nullable=False),
    sa.Column('storage', sa.Float(), nullable=False),
    sa.Column('owner_id', sa.Integer(), nullable=False),
    sa.Column('color', sa.String(), nullable=False),
    sa.Column('capacity', sa.Integer(), nullable=False),
    sa.Column('total_miles', sa.Float(), nullable=False),
    sa.Column('fuel_type', sa.String(), nullable=False),
    sa.Column('fuel_tank', sa.Float(), nullable=False),
    sa.Column('avg_mpg', sa.Float(), nullable=True),
    sa.ForeignKeyConstraint(['owner_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('companions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('trip_id', sa.Integer(), nullable=False),
    sa.Column('role', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['trip_id'], ['trips.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id', 'user_id', 'trip_id')
    )
    op.create_table('editors',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('list_id', sa.Integer(), nullable=False),
    sa.Column('needs_approval', sa.Boolean(), nullable=False),
    sa.ForeignKeyConstraint(['list_id'], ['lists.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id', 'user_id', 'list_id')
    )
    op.create_table('items',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('list_id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column("notes", sa.Text()),
    sa.ForeignKeyConstraint(['list_id'], ['lists.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('stops',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('trip_id', sa.Integer(), nullable=False),
    sa.Column('location_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('is_start', sa.Boolean(), nullable=True),
    sa.Column('is_end', sa.Boolean(), nullable=True),
    sa.Column('description', sa.Text(), nullable=True),
    sa.ForeignKeyConstraint(['location_id'], ['locations.id'], ),
    sa.ForeignKeyConstraint(['trip_id'], ['trips.id'], ),
    sa.PrimaryKeyConstraint('id', 'trip_id', 'location_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('stops')
    op.drop_table('items')
    op.drop_table('editors')
    op.drop_table('companions')
    op.drop_table('vehicles')
    op.drop_table('trips')
    op.drop_table('lists')
    op.drop_table('users')
    op.drop_table('locations')
    op.drop_table('list_types')
    # ### end Alembic commands ###