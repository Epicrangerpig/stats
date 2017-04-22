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
First, in `config.py`, set the development `SQLALCHEMY_DATABASE_URI` variable. Then, to automatically create the relations, run the following Flask-Migrate command
```
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
### ECMAScript 6 (ES6) JavaScript
Files written in ES6 are stored in `app/static/es6/`. Using `npm` and `babel`, they are transpiled into ordinary JavaScript code and stored in `app/static/js/`.
```
npm init
npm install
npm run js
```

`npm run js` is defined in `package.json`.

