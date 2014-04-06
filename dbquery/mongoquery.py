'''
Created on Apr 6, 2014

@author: Sam
'''

from pymongo import MongoClient
from pymongo.errors import ConnectionFailure

#==========================================================================  
#
#==========================================================================
class MongoQuery(object):

    #==========================================================================  
    #
    #==========================================================================
    def __init__(self, host, port):
        self.host = host
        self.port = port
        self.client = None
        self.db_name = None
        self.collection_name = None
        
        
    #==========================================================================  
    #
    #==========================================================================
    def connect(self):
        
        try:
            self.client = MongoClient(self.host, self.port)
        except ConnectionFailure:
            print("Connection to [" + self.host + "] at port: " + str(self.port) + "failed.")
        
        print("Connected to [" + self.host + "] at port: " + str(self.port) + ".")    
        


    #==========================================================================  
    #
    #==========================================================================
    def disconnect(self):
        
        if self.client != None:
            self.client.close()
            print("Connection to [" + self.host + "] at port: " + str(self.port) + " closed.")
           

    #==========================================================================  
    #
    #==========================================================================
    def set_database_name(self, db_name):
        
        previous_db_name = self.db_name
        self.db_name = db_name
        
        return previous_db_name
        
        
    #==========================================================================  
    #
    #==========================================================================
    def set_collection(self, collection_name):
        
        previous_collection_name = self.collection_name
        self.collection_name = collection_name
        
        return previous_collection_name
        
        
    #==========================================================================  
    #
    #==========================================================================
    def get_cursor(self, query):
        return self.client[self.db_name][self.collection_name].find(query)
         
        
    #==========================================================================  
    #
    #==========================================================================
    def __str__(self):
        
        self_str = "host: " + str(self.host)
        self_str += " port: " + str(self.port)
        self_str += " databse: " + str(self.db)
        self_str += " collection: " + str(self.collection)
        
        return self_str
    
    
    def get_host(self):
        return self.host
    
    def get_port(self):
        return self.port
    
    def get_db_name(self):
        return self.collection_name
    
    def get_collectionn_name(self):
        return self.collection_name
    
#===============================================================================
# CourseQuery: for querying the course database
#===============================================================================
class CourseQuery(MongoQuery):
    '''
    classdocs
    '''

    #===========================================================================
    # __init__
    #===========================================================================
    def __init__(self, host, port):
        super(CourseQuery, self).__init__(host, port)
        self.connect()
        self.set_database_name('courses')
        self.set_collection('courses_general')
        
    
    #===========================================================================
    # get_course_cursor
    #===========================================================================
    def get_course_cursor(self, subject_code, id_num):
        return super(CourseQuery, self).get_cursor({'code':subject_code, 'course_id':id_num})
    
    
    #===========================================================================
    # get_courses_cursor_subject
    #===========================================================================
    def get_courses_cursor_subject(self, subject_code):
        return super(CourseQuery, self).get_cursor({'code':subject_code})
    
    
#===============================================================================
# SectionQuery
#===============================================================================
class SectionQuery(MongoQuery):
    '''
    classdocs
    '''

    #===========================================================================
    # __init__
    #===========================================================================
    def __init__(self, host, port):
        super(SectionQuery, self).__init__(host, port)
        self.connect()
        self.set_database_name('courses')
        self.set_collection('courses_sections')
    
    #===========================================================================
    # get_section_cursor_crn
    #===========================================================================
    def get_section_cursor_crn(self, crn):
        return super(SectionQuery, self).get_cursor({'crn': crn})
    
    #===========================================================================
    # get_section_cursor_section_number
    #===========================================================================
    def get_section_cursor_section_number(self, section_number):
        return super(SectionQuery, self).get_cursor({'section_number': section_number})
    
    

#===============================================================================
# ProfQuery
#===============================================================================
class ProfQuery(MongoQuery):
    '''
    classdocs
    '''


    #===========================================================================
    # __init__
    #===========================================================================
    def __init__(self, host, port):
        super(ProfQuery, self).__init__(host, port)
        self.connect()
        self.set_database_name('professors')
        self.set_collection('professors')
        
    
    #===========================================================================
    # get_prof_cursor
    #===========================================================================
    def get_prof_cursor(self, first_name, last_name):
        query = {'last_name':last_name, 'first_name':first_name}
        return super(ProfQuery, self).get_cursor(query)
    
    
    #===========================================================================
    # get_prof_cursor_first_initial
    #===========================================================================
    def get_prof_cursor_first_initial(self, first_initial, last_name):
        query = {'last_name': last_name, 'first_name': { '$regex': '^' + first_initial, '$options':'im'}}
        return super(ProfQuery, self).get_cursor(query)