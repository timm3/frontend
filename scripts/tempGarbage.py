from flask import Flask, request, jsonify, render_template
from sys import path
from pymongo import MongoClient
import os
import json, ast
import flask.views
path.insert(0, '/Library/WebServer/Documents/frontend/dbquery')
from coursetablequery import CourseTableQuery
from mongoquery import CourseQuery
app = Flask(__name__, template_folder='/Library/WebServer/Documents/frontend/', static_url_path='', static_folder="static")

# app = Flask(__name__, static_folder = 'partials', static_url_path='/partials')
class TodoView(flask.views.MethodView):
	def get(self):
		return render_template('main.html')

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
# class courseIds(flask.views.MethodView):
# 	def getCourseIds(self, subject):
# 		query = CourseQuery()
# 		query.connect()
# 		ids = query.get_course_ids_for_subject(subject)
# 		subjectIds = ast.literal_eval(json.dumps(ids))
# 		return jsonify({'success':True, 'subjectIds': subjectIds})


app.add_url_rule('/', view_func=TodoView.as_view('todo_view'))
app.add_url_rule('/getSubjects', view_func = TodoRetrieve.as_view("todo_retrieve"), methods=['GET'])
app.add_url_rule('/postCourseIds', view_func = TodoAdd.as_view("todo_add"), methods=['POST'])

@app.route('/static/<path:filename>')
def base_static(filename):
	filename_str = str(filename)
	print(filename_str +'\n')
	myPath = "/Library/WebServer/Documents/frontend/static/"
	if filename_str.find('.js') != -1: 
		myPath = "/Library/WebServer/Documents/frontend/static/js/"

	return flask.send_from_directory(myPath,filename)



if __name__ == "__main__":
	app.run(debug=True)