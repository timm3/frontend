import flask, pymongo, Professor, User, hashlib
from flask import Flask, request, session, LoginManager
from pymongo import MongoClient

app = Flask(__name__, static_url_path='')

login_manager = LoginManager()

login_manager.init_app(app)


client = MongoClient()
db = client.database
profCollection = db.profCollection
userCollection = db.userCollection


@login_manager.user_loader
def load_user(userid):
    return User.get(userid)

@app.route('/')
def root():
    return app.send_static_file('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        hashed = ""
        hashDB = ""
        salt = ""
        auth = False
        
        #check if username exists in user database
        cursor = userCollection.find( { name: username } )
            
        #if it does, check that the hash of the supplied pw matches the hash on storage
        if(cursor[0]):
            hashDB = cursor[0][1]
            salt = cursor[0][5]
            hashed = hashlib.sha256(salt + password)
            
            #if the hashes match then the user is authenticated and logged in before being redirected to the homepage
            if(hashDB == hashed):
                login_user(user)
                flash("Logged in Successfully.")
                return app.send_static_file("index.html")
        #if it doesn't, fall through to the signin.html page render    
    return app.send_static_file("/partials/signin.html")

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return app.send_static_file("index.html");