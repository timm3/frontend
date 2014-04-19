import flask, Professor, flask_login, ManageUserDatabase, ManageProfDatabase, Client
import hashlib, os, User, re
from flask import Flask, request, session, flash, redirect, url_for
from flask_login import LoginManager, login_required
from pymongo import MongoClient

app = Flask(__name__, static_url_path='')

login_manager = LoginManager()

login_manager.init_app(app)


client = MongoClient()
db = client.database
profCollection = db.profCollection
userCollection = db.userCollection

login_manager.login_view = "/signin"

#===============================================================================
#takes unicode ID of user and returns a user object
#===============================================================================
@login_manager.user_loader
def load_user(userid):
    return Client(userid.decode(), userid, True)

@app.route('/')
def index():
    return app.send_static_file('index.html')

#===============================================================================
# Either show signin page or authenticate submitted credentials
#===============================================================================
@app.route('/signin', methods=['POST'])
def signin():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        hashed = ""
        hashDB = ""
        salt = ""
        auth = False
        
        cursor = userCollection.find( { "name": username } )

        #===============================================================================
        # if the user exists, check that the submitted password matches the hash on file
        #===============================================================================
        if(cursor[0]):
            hashDB = cursor[0][1]
            salt = cursor[0][5]
            hashed = hashlib.sha256(salt + password)

            if(hashDB == hashed):
                login_manager.login_user(load_user(username.unicode()))
                flash("Logged in Successfully.")
                return redirect(url_for("index"))
            else:
                flash("Sorry, your username & password combination did not match our records.")
                return redirect(url_for("signin"))
    return app.send_static_file("/partials/signin.html")


#===============================================================================
# Verify user's requested credentials and create account or simply serve 
# account creation form
#===============================================================================
@app.route('/signup')
def signup():
    if request.method == 'POST':
        unique = True #logic control : credential uniqueness
        wantReg = False #logic control : regNow to be enabled
        emailValid = False #logic control : email is valid address
        confirmPass = False
        confirmAD = False
        
        #===============================================================================
        # check availability and validity of requested username, email, and 
        # netid for account
        # regex sourced from http://www.regular-expressions.info/email.html on 4.8.14
        #===============================================================================
        username = request.form['name']
        cursor = userCollection.find( { "name": username })
        if(cursor[0]):
            unique = False
        
        email = request.form['inputEmail3']
        cursor = userCollection.find( { "email": email })
        if(cursor[0]):
            unique = False
        emailRegex = re.compile("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)\b")
        emailValid = emailRegex.match(email)
        
        wantReg = request.form.get('netid')
        if(wantReg == None):
            wantReg = False
        else:
            wantReg = True
            
        if(wantReg):
            netid = request.form['netid']
            cursor = userCollection.find( { "netid": netid })
            if(cursor[0]):
                unique = False
                
        #===============================================================================
        # if the user's requested credentials are unique enough, make them an account
        #===============================================================================
        if(unique & emailValid):        
            password = request.form['inputPassword3']
            conf_pass = request.form['confirmPassword3']
            if(password == conf_pass):
                confirmPass = True
            
            if(wantReg):
                adpassword = request.form['inputADPassword3']
                conf_ad = request.form['confirmADPassword3']
                if(adpassword == conf_ad):
                    confirmAD = True
            
            #===============================================================================
            # convert password and adpassword to hashed values and then continue
            #===============================================================================
            if(confirmPass):
                hashed, rand = ManageUserDatabase.hashPass(password)
                hashedAD, randAD = "",""
                if(wantReg):
                    hashedAD, randAD = ManageUserDatabase.hashPass(adpassword)
                    
                if(wantReg):
                    if(confirmAD): 
                        u = User(hashed, hashedAD, rand, randAD, username, netid, email, wantReg)
                    else:
                        flash("Sorry, your AD password and confirmation did not match.")
                        return redirect(url_for("signup"))
                else: 
                    u = User(hashed, hashedAD, rand, randAD, username, netid, email, wantReg)
                
                #===============================================================================
                # insert user into db, log them in, and redirect to index
                #===============================================================================
                userCollection.insert(ManageUserDatabase.docFromUser(u))
                login_manager.login_user(load_user(username.unicode()))
                return redirect(url_for("index"))
        
        #===============================================================================
        # If supplied values were deemed non-satisfactory, inform user
        #=============================================================================== 
        else: 
            if(emailValid != True):
                flash("Sorry, the supplied email address is invalid!")
            else:
                flash("Sorry, part(s) of your credentials is(are) already claimed or in use!")
            return redirect(url_for("signup"))
        
    return app.send_static_file("/partials/signup.html")


@app.route('/logout')
@login_required
def logout():
    login_manager.logout_user()
    flash("Logged out.")
    return redirect(url_for("index"))

SECRET_KEY = 'um9vuq235v90u90235u0902350v023rv00n9g'

if __name__ == '__main__':
    app.run()