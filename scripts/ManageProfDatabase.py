'''
Created on Feb 19, 2014

@author: Ethan Timm

@summary: DO NOT RUN MORE THAN ONCE.
          tools to build, alter, and otherwise manage a mongoDB based database of professor information 
'''

import pymongo
import Professor
from pymongo import MongoClient 

#===============================================================================
# This function takes a Professor and returns a Document for mongoDB to use
#===============================================================================    

def docFromProf(prof):
    doc = {"name": prof.name, "uri": prof.uri, "hotness": prof.hotness, 
           "quality": prof.quality, "helpfulness": prof.helpfulness, 
           "clarity": prof.clarity, "ease": prof.ease, 
           "averageGrade": prof.averageGrade, "comments": prof.comments}
    return doc
    
    
#===============================================================================
# A temporary entry is used to provoke mongoDB into creating the database 
# instead of being 'lazy' and not building the DB until the first real
# professor is added
#===============================================================================

if __name__ == "__main__":
    #TODO insert code to make sure that mongoDB is running?
    
    client = MongoClient()
    db = client.ProfDB
    
    profCollection = db.ProfCollection
    
    #add to and then clean the DB of initializing entry
    initProf = Professor.Professor()
    build_id = profCollection.insert(docFromProf(initProf));
    profCollection.remove(build_id);
    
    
#===============================================================================
# No methods for adding, or removing a professor are necessary as 
# they are already built in. Some modification methods are available for 
# more complicated alterations, such as comments.
#===============================================================================


