import flask, Professor, flask_login, ManageUserDatabase, ManageProfDatabase, Client
import hashlib, os, User
from flask import Flask, request, session, flash, redirect, url_for
from flask_login import LoginManager
from pymongo import MongoClient

app = Flask(__name__, static_url_path='')

login_manager = LoginManager()

login_manager.init_app(app)


client = MongoClient()
db = client.database
profCollection = db.profCollection
userCollection = db.userCollection

login_manager.login_view = "/signin"

@login_manager.user_loader
def load_user(userid):
    #takes unicode ID of user and returns a user object
    return Client(userid.decode(), userid, True)

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/signin', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        hashed = ""
        hashDB = ""
        salt = ""
        auth = False
        
        #check if username exists in user database
        cursor = userCollection.find( { "name": username } )
            
        #if it does, check that the hash of the supplied pw matches the hash on storage
        if(cursor[0]):
            hashDB = cursor[0][1]
            salt = cursor[0][5]
            hashed = hashlib.sha256(salt + password)
            
            #if the hashes match then the user is authenticated and logged in before being redirected to the homepage
            if(hashDB == hashed):
                login_manager.login_user(load_user(username.unicode()))
                flash("Logged in Successfully.")
                return redirect(url_for("index"))
        #if it doesn't, fall through to the signin.html page render    
    return app.send_static_file("/partials/signin.html")

@app.route('/signup')
def signup():
    if request.method == 'POST':
        unique = True #logic control : uniqueness of new user credentials
        wantReg = False #logic control : indicates netid/adpassword requirement
        confirmPass = False
        confirmAD = False
        
        username = request.form['name']
        #check username uniqueness
        cursor = userCollection.find( { "name": username })
        if(cursor[0]):
            #dang, it exists! let the user know they need to retry
            unique = False
        
        email = request.form['inputEmail3']
        #check email for uniqueness
        cursor = userCollection.find( { "email": email })
        if(cursor[0]):
            #dang, it exists! let the user know they need to retry
            unique = False
        
        
        wantReg = request.form.get('netid')
        if(wantReg == None):
            wantReg = False
        else:
            wantReg = True
            
        if(wantReg):
            netid = request.form['netid']
            #check netid uniqueness
            cursor = userCollection.find( { "netid": netid })
            if(cursor[0]):
                #dang, it exists! let the user know they need to retry
                unique = False
        
        #if the user's requested credentials are unique enough, make them an account
        if(unique):        
            password = request.form['inputPassword3']
            conf_pass = request.form['confirmPassword3']
            if(password == conf_pass):
                confirmPass = True
            
            if(wantReg):
                adpassword = request.form['inputADPassword3']
                conf_ad = request.form['confirmADPassword3']
                if(adpassword == conf_ad):
                    confirmAD = True
            
            if(confirmPass):        
                #convert password and adpassword to hashed values and then continue
                hashed, rand = ManageUserDatabase.hashPass(password)
                hashedAD, randAD = "",""
                if(wantReg):
                    hashedAD, randAD = ManageUserDatabase.hashPass(adpassword)
                    
                if(wantReg):
                    if(confirmAD):
                        u = User(username, netid, hashed, email, wantReg, hashedAD, rand, randAD)
                    else:
                        flash("Sorry, your AD password and confirmation did not match.")
                        return app.send_static_file("/partials/signup.html")
                else:
                    u = User(username, netid, hashed, email, wantReg, hashedAD, rand, randAD)
                
                #insert user into db, log them in, and redirect to index
                userCollection.insert(ManageUserDatabase.docFromUser(u))
                
                login_manager.login_user(load_user(username.unicode()))
                
                return redirect(url_for("index"))
                
        else:
            flash("Sorry, part(s) of your credentials is(are) already claimed or in use!")
            return app.send_static_file("/partials/signup.html")
    return app.send_static_file("/partials/signup.html")


@app.route('/logout')
@login_manager.login_required
def logout():
    login_manager.logout_user()
    flash("Logged out.")
    return redirect(url_for("index"))