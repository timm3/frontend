'''
Created on Apr 6, 2014

@author: Sam Gegg
'''

from mongoquery import MongoQuery, SectionQuery, CourseQuery, ProfQuery
from coursetablequery import CourseTableQuery
from pprint import PrettyPrinter

if __name__ == '__main__':

    pp = PrettyPrinter()

    client_courses = CourseQuery()
    client_courses.connect()
    pp.pprint(client_courses.get_course_JSON('CS', '125'))
    #client_courses.set_database_name('professors')
    #client_courses.set_collection('professors')
    #print(client_courses.get_cursor({})[1])
    client_courses.disconnect()
    
    
    section_query = SectionQuery()
    section_query.connect()
    print(section_query.get_cursor({})[0])
    section_query.disconnect()
    
    prof_query = ProfQuery()
    prof_query.connect()
    print(prof_query.get_cursor({})[0])
    print('HERE')
    prof_query.disconnect()
    
    table_query = CourseTableQuery({}, 20)
    table_query.connect()
    print(table_query.get_table_page_JSON_list(1))
    table_query.disconnect()
    
    course_query = CourseQuery()
    course_query.connect()
    print(course_query.client[course_query.db_name][course_query.collection_name])
    print(sorted(course_query.client[course_query.db_name][course_query.collection_name].distinct('code')))
    print(course_query.get_course_JSON('CS', '125'))
    print(course_query.get_subject_codes())
    print(course_query.get_course_ids_for_subject('CS'))
    #print(course_query.get_course_ids_all_subjects())
    course_query.disconnect()
    
    course_query.connect()
    print(course_query.search_for_course_cursor(min_gpa = 3)[0])
    print(course_query.get_credit_hour_list())
        
    course_query.disconnect()
    
    query = CourseTableQuery()
    query.connect()
    retVal = query.get_table_page_JSON_list(1)
    retVal = query.get_table_page_JSON_list(1000)
    query.disconnect()
    print(retVal)
    
    cq = CourseQuery()
    cq.connect()
    
    print(cq.get_cursor({'credit_hours':{'$in': [3]}}).count())
    print(cq.get_cursor({'credit_hours':{'$in': ['3']}}).count())
    print(cq.get_cursor({'credit_hours':{'$in': [3, '3']}}).count())
    print(cq.get_cursor({'credit_hours':{'$in': ['3']}}).count()+cq.get_cursor({'credit_hours':{'$in': [3]}}).count())
    
    print(cq.get_course_cursor('CS', '125')[0])
    print(cq.get_course_cursor('CS', '125')[1])
    print(cq.get_course_cursor('CS', '125')[2])
    cq.disconnect()