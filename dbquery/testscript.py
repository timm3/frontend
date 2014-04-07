'''
Created on Apr 6, 2014

@author: Sam Gegg
'''

from mongoquery import MongoQuery, SectionQuery, CourseQuery, ProfQuery
from coursetablequery import CourseTableQuery

if __name__ == '__main__':

    client_courses = MongoQuery()
    client_courses.connect()
    client_courses.set_database_name('professors')
    client_courses.set_collection('professors')
    print(client_courses.get_cursor({})[1])
    
    section_query = SectionQuery()
    print(section_query.get_cursor({})[0])
    
    table_query = CourseTableQuery({}, 20)
    print(table_query.get_table_page_JSON_list(1))
    
    course_query = CourseQuery()
    print(course_query.client[course_query.db_name][course_query.collection_name])
    print(sorted(course_query.client[course_query.db_name][course_query.collection_name].distinct('code')))
    print(course_query.get_subject_codes())
    print(course_query.get_course_ids_for_subject('CS'))