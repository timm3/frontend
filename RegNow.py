from flask import Flask, request, jsonify, render_template
from sys import path
from pymongo import MongoClient
import os, json, ast, flask.views

path.insert(0, 'dbquery')
from coursetablequery import CourseTableQuery
from mongoquery import CourseQuery, SectionQuery, MongoQuery


#initialize flask application
app = Flask(__name__, template_folder="")

# login_manager = LoginManager()
# login_manager.login_view = "/signin"


# @login_manager.user_loader
# def load_user(userid):
#     return Client(userid.decode(), userid, True)


# app = Flask(__name__, static_folder = 'partials', static_url_path='/partials')
class TodoView(flask.views.MethodView):
	def get(self):
		return render_template('/templates/main.html')

class TodoRetrieve(flask.views.MethodView):
	def get(self):
		query = CourseQuery()
		query.connect()
		codes = query.get_subject_codes()
		query.disconnect()
		subjectCodes = ast.literal_eval(json.dumps(codes))
		return jsonify({'success':True, 'subjectCodes': subjectCodes})

class TodoAdd(flask.views.MethodView):
	def post(self):
		subject = json.loads(request.data)
		query = CourseQuery()
		query.connect()
		ids = query.get_course_ids_for_subject(subject['sub'])
		query.disconnect()
		subjectIds = ast.literal_eval(json.dumps(ids))
		return jsonify({'success':True, 'subjectIds': list(set(ids))})

class ViewClass(flask.views.MethodView):
	def post(self):
		myClass = json.loads(request.data)
		print(myClass)
		#initiate object to get details of specific classs
		query = CourseQuery()
		query.connect()
		info = query.get_course_JSON(myClass['sub'], myClass['subId'])
		del info['_id']
		info['class_title'] = info['title']
		del info['title']
		query.disconnect()
		subjectIds = ast.literal_eval(json.dumps(info))
		print(subjectIds)
		#create object to query the times of the specific course
		section = SectionQuery()
		sectionList = []
		section.connect()
		for crn in info['crns']:
			cursor = section.get_section_cursor_crn(crn)
			courseSect = cursor[0]
			del courseSect['_id']
			courseSect['class_start'] = courseSect['start']
			del courseSect['start']
			# courseSection = ast.literal_eval(json.dumps(courseSect))
			sectionList.append(courseSect)
		section.disconnect()
		print(sectionList)
		return jsonify({'success':True, 'classInfo': info, 'times':sectionList})

class FilterCourses(flask.views.MethodView):
	def post(self):
		myFilter = json.loads(request.data)['filter']
		print(myFilter)
		query = CourseQuery()
		query.connect()
		filterQuery = query.search_for_course_cursor(min_gpa = myFilter['gpa'], credit_hours = myFilter['credit_hours'], min_prof_rating = myFilter['prof_rating'])
		query.disconnect()
		filteredClasses = []
		for course in filterQuery:
			del course['_id']
			filteredClasses.append(course)
		return jsonify({'success':True, 'filteredClasses':filteredClasses})

class SignUp(flask.views.MethodView):
	def post(self):
		form = json.loads(request.data)['info']
		print(form)
		unique = True #logic control : credential uniqueness
		wantReg = False #logic control : regNow to be enabled
		emailValid = False #logic control : email is valid address
		confirmPass = False
		confirmAD = False

		#setup DB and Collection connection
		print("in your ass signup. Bitch!")
		client = MongoQuery()
		client.connect()
		client.set_database_name("users")
		client.set_collection("users")
		#===============================================================================
		# check availability and validity of requested username, email, and 
		# netid for account
		# regex sourced from http://www.regular-expressions.info/email.html on 4.8.14
		#===============================================================================
		username = form['userName']
		#cursor = userCollection.find( { "name": username })
		cursor = client.get_cursor({'name':username})
		print(dir(cursor))
		print(cursor.clone)
		if(cursor):
			print("MOTHER FUCKER ISNT EMPTY")
		if(cursor[0]):
			unique = False
		print("line 118\n")
		email = form['email']
		#cursor = userCollection.find( { "email": email })
		cursor = client.get_cursor("{\"email\":email}")
		if(cursor[0]):
			unique = False
		emailRegex = re.compile("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)\b")
		emailValid = emailRegex.match(email)

		wantReg = form['netid']
		if(wantReg == None):
			wantReg = False
		else:
			wantReg = True

		if(wantReg):
			netid = form['netid']
			#cursor = userCollection.find( { "netid": netid })
			cursor = client.get_cursor("{\"netid\":netid}")
			if(cursor[0]):
				unique = False
		print("line 139\n")
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
					# return redirect(url_for("/#/SignUp"))
			else: 
				u = User(hashed, hashedAD, rand, randAD, username, netid, email, wantReg)

			#===============================================================================
			# insert user into db, log them in, and redirect to index
			#===============================================================================
			userCollection.insert(ManageUserDatabase.docFromUser(u))
			#TODO: reformat collection.insert()
			login_manager.login_user(load_user(username.unicode()))
			return redirect(url_for("/#/Profile"))

		#===============================================================================
		# If supplied values were deemed non-satisfactory, inform user
		#=============================================================================== 
		else: 
			if(emailValid != True):
				flash("Sorry, the supplied email address is invalid!")
			else:
				flash("Sorry, part(s) of your credentials is(are) already claimed or in use!")
				return redirect(url_for("/#/SignUp"))
		return app.send_static_file("/partials/signup.html")




@app.route('/signin', methods=['POST'])
#class SignIn(flask.views.MethodView):
def signin(self):
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['inputEmail3']
        password = request.form['inputPassword3']
        hashed = ""
        hashDB = ""
        salt = ""
        auth = False

        cursor = userCollection.find( { "email": email } )

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
                return redirect(url_for("/#/Profile"))
            else:
                flash("Sorry, your username & password combination did not match our records.")
                return redirect(url_for("signin"))
    return app.send_static_file("/partials/signin.html")



app.add_url_rule('/', view_func=TodoView.as_view('todo_view'))
app.add_url_rule('/getSubjects', view_func = TodoRetrieve.as_view("todo_retrieve"), methods=['GET'])
app.add_url_rule('/postCourseIds', view_func = TodoAdd.as_view("todo_add"), methods=['POST'])
app.add_url_rule('/postSpecificClass', view_func = ViewClass.as_view("view_class"), methods=['POST'])
app.add_url_rule('/postFilter', view_func=FilterCourses.as_view("filter_courses"), methods=['POST'])
# app.add_url_rule('/register', view_func=Register.as_view("register"), methods=['POST'])
app.add_url_rule('/signupInfo', view_func=SignUp.as_view("sign_up"), methods=['POST'])
#app.add_url_rule('/SignIn', view_func=SignIn.as_view("signin"), methods=['POST'])

if __name__ == "__main__":
 app.run(debug=True) #<-- use this for localhost
 # app.run(host="0.0.0.0", debug=False, port=80) #<-- use this on the deployment server.
