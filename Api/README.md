# Groupe de alzate_h 1035337

Installation GJANGO

- check your python version
		python3 --version
		py --version

-creer environement virtuel
		python3 -m venv env

- Activate virtual environment
		source env/bin/activate

- install django
		pip install django

-install file requirements.txt
		pip freeze > requirements.txt

(env) ~/projects/django-web-app
		django-admin startproject + nom du  dossier  .-> ceci créera un répertoire de projet

- setup the database
		python3 manage.py makemigrations
		python3 manage.py migrate

dans le nom du dossier -> 
		python3 manage.py runserver

installer des couleurs dans le terminal
		pip install "colorama >= 0.4.6" -> installer colorama

creer un répertoire d'application nommé application
		python3 manage.py startapp application

Les deux répertoires sont frères.


Aller sur settings.py et rajouter 'application' dans INSTALLED_APPS = []

- install database
		pip install mysqlclient


- migrations 
	python3 manage.py makemigrations
	python3 manage.py migrate




base64 pour stocker des photos..
et decoder.
stocker le lien url sur mysql



pip freeze > requirements.txt : installe les dépendances dans le fichier requirements.txt