'''
Created on Apr 6, 2014

@author: Sam
'''

from mongoquery import CourseQuery

#===============================================================================
# CourseTableQuery
#===============================================================================
class CourseTableQuery(object):
    '''
    classdocs
    '''

    #===========================================================================
    # __init__
    #===========================================================================
    def __init__(self, query, table_size):
        '''
        Constructor
        '''
        self.course_query = CourseQuery()
        self.set_query(query)
        self.set_table_size(table_size)
        
        
    #===========================================================================
    # set_cursor
    #===========================================================================
    def set_cursor(self, cursor):
        self.cursor = cursor
        
        
    #===========================================================================
    # set_query
    #===========================================================================
    def set_query(self, query):
        self.cursor = self.course_query.get_cursor(query)
        
        
    #===========================================================================
    # set_table_size
    #===========================================================================
    def set_table_size(self, table_size):
        self.table_size = table_size
        
        
    #===========================================================================
    # get_table_page_cursor
    #===========================================================================
    def get_table_page_cursor(self, page_num):
        temp_cursor = self.cursor.clone()
        start = self.table_size * (page_num - 1)
        end = self.table_size * page_num
        return temp_cursor[start:end]
    
    
    #===========================================================================
    # get_table_page_JSON_list
    #===========================================================================
    def get_table_page_JSON_list(self, page_num):
        cursor = self.get_table_page_cursor(page_num)
        JSON_list = []
        for json in cursor:
            JSON_list.append(json)
        return JSON_list