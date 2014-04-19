from flask import Flask, request, jsonify, render_template
from sys import path
from pymongo import MongoClient
import os, json, ast, flask.views

path.insert(0, '/Library/WebServer/Documents/frontend/dbquery')
from coursetablequery import CourseTableQuery
from mongoquery import CourseQuery, SectionQuery

#initialize flask application
app = Flask(__name__, template_folder="")

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
		query.disconnect()
		subjectIds = ast.literal_eval(json.dumps(info))
		#create object to query the times of the specific course
		section = SectionQuery()
		sectionList = []
		section.connect()
		count = 0
		for crn in info['crns']:
			cursor = section.get_section_cursor_crn(crn)
			courseSect = cursor[0]
			del courseSect['_id']
			# courseSection = ast.literal_eval(json.dumps(courseSect))
			print(courseSect)
			sectionList.append(courseSect);
			count+=1
		section.disconnect()
		print(sectionList)
		return jsonify({'success':True, 'classInfo': info, 'times':sectionList})



app.add_url_rule('/', view_func=TodoView.as_view('todo_view'))
app.add_url_rule('/getSubjects', view_func = TodoRetrieve.as_view("todo_retrieve"), methods=['GET'])
app.add_url_rule('/postCourseIds', view_func = TodoAdd.as_view("todo_add"), methods=['POST'])
app.add_url_rule('/postSpecificClass', view_func = ViewClass.as_view("view_class"), methods=['POST'])



if __name__ == "__main__":
	app.run(debug=True)