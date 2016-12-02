from app import manager
from scripts.load_types import LoadTypes

manager.add_command('loadtypes', LoadTypes)
manager.run()
