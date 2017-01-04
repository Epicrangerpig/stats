# stats
### Virtual Environment
With virtualenvwrapper installed, run
```
mkvirtualenv <name>
```
### Requirements
```
pip install -r requirements.txt
```
### Test
```
python manage.py test
```
or simply
```
nosetests
```
### Load data into database from csv files
To automatically create the relations, run the following Flask-Migrate commands
```
python manage.py db init
python manage.py db migrate
python manage.py db upgrade
```
Then, run
```
python manage.py loaddata
```
### Run the application
```
python manage.py runserver
```
