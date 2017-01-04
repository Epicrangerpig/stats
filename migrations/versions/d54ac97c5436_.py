"""empty message

Revision ID: d54ac97c5436
Revises: None
Create Date: 2017-01-04 15:44:09.614765

"""

# revision identifiers, used by Alembic.
revision = 'd54ac97c5436'
down_revision = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.create_table('ability',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=True),
    sa.Column('description', sa.String(length=510), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('ability')
    ### end Alembic commands ###