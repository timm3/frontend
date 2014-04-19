'''
Created on Apr 6, 2014

@author: Sam
'''

from pymongo import MongoClient
from pymongo.errors import ConnectionFailure

HOST = 'digitalocean-4.perryhuang.com'
PORT = 27017

#==========================================================================  
#
#==========================================================================
class MongoQuery(object):

    #==========================================================================  
    #
    #==========================================================================
    def __init__(self):
        self.host = HOST
        self.port = PORT
        self.client = None
        self.db_name = None
        self.collection_name = None
        
        
    #==========================================================================  
    #
    #==========================================================================
    def connect(self):
        while not self.client:
            try:
                self.client = MongoClient(self.host, self.port)
            except ConnectionFailure:
                print("Connection to [" + self.host + "] at port: " + str(self.port) + " failed.")
            
        
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
        self_str += " database: " + str(self.db_name)
        self_str += " collection: " + str(self.collection_name)
        
        return self_str
    
    
    def get_host(self):
        return self.host
    
    def get_port(self):
        return self.port
    
    def get_db_name(self):
        return self.collection_name
    
    def get_collection_name(self):
        return self.collection_name
    
#===============================================================================
# CourseQuery: for querying the course database
#===============================================================================
class CourseQuery(MongoQuery):


    #===========================================================================
    # __init__
    #===========================================================================
    def __init__(self):
        super(CourseQuery, self).__init__()
        self.set_database_name('courses')
        self.set_collection('courses_general')
        
    
    #===========================================================================
    # __del__
    #===========================================================================
    def __del__(self):
        pass
    
    #===========================================================================
    # get_subject_codes
    #===========================================================================
    def get_subject_codes(self):
        list = self.client[self.db_name][self.collection_name].distinct('code')
        if 'TST' in list:
            list.remove('TST')
        return sorted(list)
    
    
    def get_course_ids_for_subject(self, subject_code):
        list = []
        cursor = self.get_courses_cursor_subject(subject_code)
        for json in cursor:
            list.append(json['course_id'])
        return sorted(list)
    
    def get_course_ids_all_subjects(self):
        dict = {}
        for subject_code in self.get_subject_codes():
            dict[subject_code] = self.get_course_ids_for_subject(subject_code)
        return dict
        
            
    #===========================================================================
    # get_course_cursor
    #===========================================================================
    def get_course_cursor(self, subject_code, id_num):
        return super(CourseQuery, self).get_cursor({'code':subject_code, 'course_id':id_num})
    
    
    def get_course_JSON(self, subject_code, id_num):
        return self.get_course_cursor(subject_code, id_num)[0]
    
    
    #===========================================================================
    # get_courses_cursor_subject
    #===========================================================================
    def get_courses_cursor_subject(self, subject_code):
        return super(CourseQuery, self).get_cursor({'code':subject_code.upper()})
    
    
    #===========================================================================
    # search_for_course_cursor
    #    credit hours
    #    gpa
    #    prof_rating
    #===========================================================================
    def search_for_course_cursor(self, subject_code = None, id_num = None, min_gpa = None, credit_hours = None, min_prof_rating = None):
        query = {}
        if subject_code:
            query['code'] = subject_code
        if id_num:
            query['course_id'] = id_num
        if min_gpa:
            query['gpa'] = {'$gte': min_gpa}
        if credit_hours:
            query['credit_hours'] = self.process_credit_hours_query(credit_hours)
        if min_prof_rating:
            query['gpa'] = {'$gte': min_prof_rating}
        return self.get_cursor(query)
    
    
    #===========================================================================
    # process_credit_hours_query
    #    Note: Currently assumes credit_hours list stored in database may be 
    #          int or string. Should be changed once database is correctly
    #          formatted.
    #===========================================================================
    def process_credit_hours_query(self, credit_hours):
        if isinstance(credit_hours, list):
            if isinstance(credit_hours[0], str):
                credit_hours_query = []
                for string in credit_hours:
                    credit_hours_query.extend([string, int(string)])
                return {'$in':credit_hours_query}
            else:
                credit_hours_query = []
                for num in credit_hours:
                    credit_hours_query.extend([num, str(num)])
                return {'$in':credit_hours_query}
        elif isinstance(credit_hours, str):
            return {'$in':[credit_hours, int(credit_hours)]}
        else:
            return {'$in':[credit_hours, str(credit_hours)]}
    
    
    def search_for_course_JSON_list(self, subject_code = None, id_num = None, min_gpa = None, credit_hours = None, min_prof_rating = None):
        cursor = self.search_for_course_cursor(subject_code, id_num, min_gpa, credit_hours, min_prof_rating)
        JSON_list = []
        for json in cursor:
            JSON_list.append(json)
        return JSON_list
    
    
    def get_credit_hour_list(self):
        list = self.search_for_course_JSON_list()
        credit_hour_set = set()
        for json in list:
            if json:
                credit_hour_set.update(json['credit_hours'])
        if None in credit_hour_set:
            credit_hour_set.remove(None)
        if '0' in credit_hour_set:
            credit_hour_set.remove('0')
        return sorted(credit_hour_set)
        
    
#===============================================================================
# SectionQuery
#===============================================================================
class SectionQuery(MongoQuery):


    #===========================================================================
    # __init__
    #===========================================================================
    def __init__(self):
        super(SectionQuery, self).__init__()
        self.set_database_name('courses')
        self.set_collection('courses_section')
    
        
    #===========================================================================
    # __del__
    #===========================================================================
    def __del__(self):
        pass
    
    #===========================================================================
    # get_section_cursor_crn
    #===========================================================================
    def get_section_cursor_crn(self, crn):
        return super(SectionQuery, self).get_cursor({'crn': crn})
    
    
#===============================================================================
# ProfQuery
#===============================================================================
class ProfQuery(MongoQuery):


    #===========================================================================
    # __init__
    #===========================================================================
    def __init__(self):
        super(ProfQuery, self).__init__()
        self.set_database_name('professors')
        self.set_collection('professors')
        
        
    #===========================================================================
    # __del__
    #===========================================================================
    def __del__(self):
        pass
    
    
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