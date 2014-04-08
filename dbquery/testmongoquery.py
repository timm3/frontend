'''
Created on Apr 6, 2014

@author: Sam
'''
import unittest
from mongoquery import ProfQuery, CourseQuery, SectionQuery

class Test(unittest.TestCase):

    def testProf(self):
        self.pq = ProfQuery()
        self.pq.connect()
        self.assertEqual(self.pq.get_prof_cursor_first_initial('L', 'Angrave').count(), 1)
        self.assertEqual(self.pq.get_prof_cursor('Lawrence', 'Angrave')[0], self.pq.get_prof_cursor_first_initial('L', 'Angrave')[0])
        self.assertEqual(self.pq.get_prof_cursor('Lawrence', 'Angrave').count(), self.pq.get_prof_cursor_first_initial('L', 'Angrave').count())
        self.pq.disconnect()
        
    def testCourse(self):
        self.cq = CourseQuery()
        self.cq.connect()
        subject_code = "CS"
        id_num = "125"
        cursor1 = self.cq.get_cursor({'code':subject_code, 'course_id':id_num})
        cursor2 = self.cq.get_course_cursor(subject_code, id_num)
        self.assertEqual(cursor1.count(), 1)
        self.assertEqual(cursor1.count(), cursor2.count())
        self.assertEqual(cursor1[0], cursor2[0])
        cursor1 = self.cq.get_cursor({'code':subject_code})
        cursor2 = self.cq.get_courses_cursor_subject(subject_code)
        self.assertEqual(cursor1.count(), cursor2.count())
        self.assertEqual(cursor1[0], cursor2[0])
        self.assertEqual(cursor1[cursor1.count()-1], cursor2[cursor2.count()-1])
        self.cq.disconnect()
        
    def testSection(self):
        self.sq = SectionQuery()
        self.sq.connect()
        crn = '31359'
        cursor1 = self.sq.get_section_cursor_crn(crn)
        cursor2 = self.sq.get_cursor({'crn': crn})
        self.assertEqual(cursor1.count(), 1)
        self.assertEqual(cursor1.count(), cursor2.count())
        self.assertEqual(cursor1[0], cursor2[0])
        self.sq.disconnect()
        


if __name__ == "__main__":
    #import sys;sys.argv = ['', 'Test.testName']
    unittest.main()