from app import manager
from flask_migrate import MigrateCommand
from scripts.load_database import LoadDatabase


manager.add_command('loaddatabase', LoadDatabase)
manager.add_command('db', MigrateCommand)
manager.run()
