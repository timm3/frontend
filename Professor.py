'''
Created on Feb 19, 2014

@author: Ethan Timm

@summary: Object to hold data representing a professor and functions to manipulate said object
'''

#===============================================================================
# This class represents a professor 
#===============================================================================
class Professor:
    def __init__(self,      n="No Name", url="http://www.koalastothemax.com/", 
                 hot=3,     good=3.0,    aid=3.0,
                 clear=3.0, easy=3.0,    grade=3.0,
                 comm=["no comments"]):
        self.name = n
        self.uri = url
        
        self.hotness = hot
        self.quality = good
        self.helpfulness = aid
        self.clarity = clear
        self.ease = easy
        self.averageGrade = grade
        self.comments = comm
            
    #===============================================================================
    # Adds more comments to a Professor: accepts tuples, lists, and str's
    #===============================================================================
    
    def AddComments(self, comments):
        com = comments
        if type(com) is tuple:
            com = list(comments)
        
        if type(com) is list:
            self.comments.extend(com)
        else:
            self.comments.extend([com])
            
            
    #===============================================================================
    # Additional methods for modifying attributes of a Professor (getters/setters)
    # are not common practice with python, for it is not java
    #===============================================================================