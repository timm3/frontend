'''
Created on Apr 6, 2014

@author: Sam Gegg
'''

from mongoquery import MongoQuery, SectionQuery, CourseQuery, ProfQuery
from coursetablequery import CourseTableQuery
from pprint import PrettyPrinter

if __name__ == '__main__':

    pp = PrettyPrinter()

    test = CourseQuery()
    test.connect()
    
    pp.pprint(test.get_course_ids_and_names_all_subjects())
    #print(test.get_course_JSON('CS', '125'))
    
    #aas = test.get_course_cursor('AAS', '246')
    #print(aas.count())
    #for json in aas:
        #print(json)
    
    test.disconnect()
    

    #client_courses = MongoQuery()
    #client_courses.connect()
    #client_courses.set_database_name('professors')
    #client_courses.set_collection('professors')
    #print(client_courses.get_cursor({})[1])
    
    #section_query = SectionQuery()
    #section_query.connect()
    #section = section_query.get_cursor({})[0]
    #print(section)
    #print('HERE')
    #section_crn = section_query.get_section_cursor_crn(section['crn'])
    #print(section_crn.count())
    #print(section_crn[0])
    #print(section_crn[1])
    #print(section_crn[2])
    #print(section_crn[3])
    #test1 = section_crn[1]
    #test2 = section_crn[2]
    #test3 = section_crn[3]
    #del test1['_id']
    #del test2['_id']
    #del test3['_id']
    #print(test1==test3) 
    
    #section_query.disconnect()
    
    #prof_query = ProfQuery()
    #prof_query.connect()
    #print(prof_query.get_cursor({})[0])
    #prof_query.disconnect()
    
    #table_query = CourseTableQuery({}, 20)
    #table_query.connect()
    #print(table_query.get_table_page_JSON_list(1))
    #table_query.disconnect()
    
    #course_query = CourseQuery()
    #course_query.connect()
    #print(course_query.client[course_query.db_name][course_query.collection_name])
    #print(sorted(course_query.client[course_query.db_name][course_query.collection_name].distinct('code')))

    #print(course_query.get_course_ids_for_subject('CS'))
    #print(course_query.get_course_cursor('CS', '473')[0])
    #print(course_query.get_subject_codes())
    #print(course_query.get_course_ids_for_subject('YDSH'))
    #print(course_query.get_course_ids_all_subjects())
    #course_query.disconnect()
    
    #course_query.connect()
    #print(course_query.search_for_course_cursor(min_gpa = 3)[0])
    #print(course_query.get_credit_hour_list())
    
    #course_query.disconnect()
    
    #query = CourseTableQuery()
    #query.connect()
    #retVal = query.get_table_page_JSON_list(1)
    #print(retVal)
    #retVal = query.get_table_page_JSON_list(1000)
    #query.disconnect()
    #print(retVal)
    
    #cq = CourseQuery()
    #cq.connect()
    
    #print(cq.get_cursor({'credit_hours':{'$in': [3]}}).count())
    #print(cq.get_cursor({'credit_hours':{'$in': ['3']}}).count())
    #print(cq.get_cursor({'credit_hours':{'$in': [3, '3']}}).count())
    #print(cq.get_cursor({'credit_hours':{'$in': ['3']}}).count()+cq.get_cursor({'credit_hours':{'$in': [3]}}).count())
    
    #print(course_query.get_course_ids_for_subject('YDSH'))
    #print(cq.get_course_cursor('YDSH', '320').count())
    
    #print(cq.get_cursor({'credit_hours':{'$in': [None]}}).count())
    #cq.disconnect()