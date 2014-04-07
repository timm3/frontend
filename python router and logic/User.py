'''
Created on Feb 25, 2014

@author: Ethan Timm

@summary: Object to hold data representing a user and functions to manipulate said object
'''

#===============================================================================
# This class represents a user 
#===============================================================================
class User:
    def __init__(self, n = "", net =  "",
                 p   , e = "", r = False,
                 ad  , salt  ,    adSalt): 
                 #sched = None            ):
        
        self.name = n
        self.netid = net
        self.password = p
        self.email = e
        self.regnow = r
        self.adPassword = ad
        self.salt = salt
        self.adSalt = adSalt
        #self.schedule = sched
        
        #===============================================================================
        # Schedule is represented as a list(week) of lists(days) containing BUSY times
        # Times for schedule use 24hr format without a colon 
        # 09:30AM -> 930  and  05:00PM -> 1700
        #===============================================================================
        