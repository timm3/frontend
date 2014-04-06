'''
Created on Apr 6, 2014

@author: Sam Gegg
'''

from mongoquery import MongoQuery, ProfQuery
from coursetablequery import CourseTableQuery

if __name__ == '__main__':
    HOST = 'digitalocean-4.perryhuang.com'
    PORT = 27017

    client_courses = MongoQuery(HOST, PORT)
    client_courses.connect()
    client_courses.set_database_name('professors')
    client_courses.set_collection('professors')
    print(client_courses.get_cursor({})[1])
    
    prof_query = ProfQuery(HOST, PORT)
    print(prof_query.get_prof_cursor('Lawrence', 'Angrave')[0])
    
    table_query = CourseTableQuery(HOST, PORT, {}, 20)
    print(table_query.get_table_page_JSON_list(1))