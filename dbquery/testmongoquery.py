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
        
    def testSearchGPA(self):
        self.cq = CourseQuery()
        self.cq.connect()
        min_gpa = 3
        cursor = self.cq.search_for_course_cursor(min_gpa = min_gpa)
        for json in cursor:
            self.assertGreaterEqual(json['gpa'], min_gpa)
        self.cq.disconnect()
            
    def testSearchProfRating(self):
        self.cq = CourseQuery()
        self.cq.connect()
        prof_rating = 4.5
        cursor = self.cq.search_for_course_cursor(min_prof_rating = prof_rating)
        for json in cursor:
            self.assertGreaterEqual(json['prof_rating'], min_prof_rating)
        self.cq.disconnect()
            
    def testSearchCreditHour(self):
        self.cq = CourseQuery()
        self.cq.connect()
        credit_hour = 4
        cursor = self.cq.search_for_course_cursor(credit_hours = credit_hour)
        for json in cursor:
            self.assertIsNotNone(set([credit_hour, str(credit_hour)]).intersection(set(json['credit_hours'])))
        self.cq.disconnect()
            
    def testSearchCreditHours(self):
        self.cq = CourseQuery()
        self.cq.connect()
        credit_hours = [4, 6, '4', '6']
        credit_hours_set = set(credit_hours)
        cursor = self.cq.search_for_course_cursor(credit_hours = credit_hours)
        for json in cursor:
            self.assertIsNotNone(credit_hours_set.intersection(set(json['credit_hours'])))
        self.cq.disconnect()
        
    def testSearchTime(self):
        self.cq = CourseQuery()
        self.sq = SectionQuery()
        self.cq.connect()
        self.sq.connect()
        start_num = 1000
        end_num = 1400
        list = self.cq.search_for_course_cursor(subject_code = 'CS', start_time = start_num, end_time = end_num)
        for json in list:
            boolean = False
            start_end_list
            for crn in json['crns']:
                section_cursor = self.sq.get_section_cursor_crn(crn)
                if section_cursor.count() > 0:
                    section_json = section_cursor[0]
                    if 'start_num' in section_json and 'end_num' in section_json:
                        start_end_list.append((section_json['start_num'], section_json['end_num']))
            for pair in start_end_list:
                if start_num < pair[0] and pair[1] < end_num:
                    boolean = True
                    break
            self.assertTrue(boolean)
        self.cq.disconnect()
        self.sq.disconnect()

if __name__ == "__main__":
    #import sys;sys.argv = ['', 'Test.testName']
    unittest.main()