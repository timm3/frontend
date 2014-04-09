'''
Created on Apr 6, 2014

@author: Sam
'''
import unittest
from mongoquery import CourseQuery
from coursetablequery import CourseTableQuery

subject_code = 'CS'

class Test(unittest.TestCase):

    def setUp(self):
        self.ctq = CourseTableQuery({}, 20)
        self.ctq.connect()
        self.ctq.set_cursor(self.ctq.course_query.get_courses_cursor_subject(subject_code))
        
    def tearDown(self):
        self.ctq.disconnect()

    def test1(self):
        jsonlist = self.ctq.get_table_page_JSON_list(1)
        self.assertEqual(len(jsonlist), 20)
        for json in jsonlist:
            self.assertEqual(json['code'], 'CS')
        
    def test2(self):
        cursor1 = self.ctq.get_table_page_cursor(1)
        cq = CourseQuery()
        cq.connect()
        cursor2 = cq.get_courses_cursor_subject(subject_code)
        cq.disconnect()
        list1 = []
        for x in cursor1:
            list1.append(x)
        self.assertEqual(len(list1), 20)
        list2 = []
        for x in cursor2:
            list2.append(x)
        for a,b in zip(list1,list2):
            self.assertEqual(a,b)
        


if __name__ == "__main__":
    #import sys;sys.argv = ['', 'Test.testName']
    unittest.main()