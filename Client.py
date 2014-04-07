class Client():
    def __init__(self, name, id, active=True):
        self.name = name
        self.id = id
        self.active = active

    def is_active(self):
        return True
        # Here you should write whatever the code is
        # that checks the database if your user is active
        # return self.active

    def is_anonymous(self):
        return False

    def is_authenticated(self):
        return True
    
    def get_id(self):
        return self.name.unicode()