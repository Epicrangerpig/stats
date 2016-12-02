"""empty message

Revision ID: 3ee40f5fdc1f
Revises: 3f740c453801
Create Date: 2016-12-02 16:56:15.997806

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3ee40f5fdc1f'
down_revision = '3f740c453801'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('pokemon', sa.Column('ndex', sa.Integer(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('pokemon', 'ndex')
    # ### end Alembic commands ###
