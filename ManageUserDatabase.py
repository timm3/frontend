'''
Created on Feb 25, 2014

@author: Ethan Timm

@summary: DO NOT RUN MORE THAN ONCE.
          tools to build, alter, and otherwise manage a mongoDB based database of user profiles 
'''

import pymongo, os, hashlib
import User
from pymongo import MongoClient 


#===============================================================================
# This function takes a User and returns a Document for mongoDB to use
#===============================================================================

def docFromUser(user):
    doc = {"name": user.name, "netid": user.netid, "pass": user.password, "salt": user.salt, 
           "email": user.email, "regnow": user.regnow, "adPass": user.adPassword,
           "adSalt": user.adSalt}#, "schedule": user.schedule}
    return doc
    
    
#===============================================================================
# Returns a tuple containing a hash and its salt
#===============================================================================
def hashPass(self, p):
    method = hashlib.sha256()
    rand = os.urandom(32);
    hashed = method(rand + p.encode()).digest()
    return hashed, rand
    
    
#===============================================================================
# A temporary entry is used to provoke mongoDB into creating the database 
# instead of being 'lazy' and not building the DB until the first real
# user is added
#===============================================================================

if __name__ == "__main__":
    # TODO insert code to make sure that mongoDB is running?
    
    client = MongoClient()
    db = client.users
    
    userCollection = db.users
    
    # add to and then clean the DB of initializing entry
    initUser = User.User()
    build_id = userCollection.insert(docFromUser(initUser));
    userCollection.remove(build_id);
    
    
    

    
    
#===============================================================================
# No methods for adding, or removing a User are necessary as 
# they are already built in. Some modification methods are available for 
# more complicated alterations, such as comments.
#===============================================================================


