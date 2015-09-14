# Quiz-Project: Nodejs,Express,ORM,MVC,cookies
# Esteban Ligero Gómez
https://plus.google.com/+EstebanLigeroGómez
# Released under GNU GENERAL PUBLIC LICENSE Version 3

#QUIZ-PROJECT
```
This is an introductory project to Nodejs, expressjs:
MVC model
REST interface.
ejs render
express 4.9.0
Databases: PostgreSQL on heroku and with SQLite on local mode managed with ORM model.
Security: OpenSSL, session-cookies, public key and private key.
```

#Read files inside the folder README-NOTES
#Installation (ubuntu)
```
apt-get install heroku heroku-toolbelt
apt-get install npm
//Deploy project
mkdir MYPROJECT
cd MYPROJECT
npm install express-generator@4.9.0
node_modules/express-generator/bin/express --ejs QUIZ-PROJECT
cd QUIZ-PROJECT
//Inside this folder, is where all the github project-files have to be
//Read files inside the folder README-NOTES
npm install //this will install all the required packages specified on package.json
//setup .env file
nf start // App running on port 5000
//Open your browser, on the address bar type: "localhost:5000"
//App working
```
