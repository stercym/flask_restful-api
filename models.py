from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin

db = SQLAlchemy()

class Trainer(db.Model, SerializerMixin):
    '''
    Trainer class with attributes; id, name, bio, specialization, phone_number
    '''
    __tablename__ = 'trainers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    bio = db.Column(db.String)
    specialization = db.Column(db.String)
    phone_number = db.Column(db.String)

    sessions = db.relationship('Session', back_populates='trainer')
    trainees = association_proxy('sessions','trainee', creator=lambda thisTrainer: Session(trainer=thisTrainer))

    # manyrelatedobjects = association_proxy('hasmanythroughrelationship','relatedclass', creator= def(thisInstance): AssociationModel(thisRelationship=thisInstance))
    # trainees = association_proxy('sessions','trainee',creator= lambda thisTrainer: Session(trainer = thisTrianer))
class Trainee(db.Model):
    '''
    Trainee class with attributes; id, name, email, phone_number, age
    '''

    __tablename__ = 'trainees'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String)
    phone_number = db.Column(db.String)
    age = db.Column(db.Integer)

    sessions = db.relationship('Session', backref='trainee')
    # manyrelatedobjects = association_proxy('hasmanythroughrelationship','relatedclass', creator= def(thisInstance): AssociationModel(thisRelationship=thisInstance))
    trainers = association_proxy('sessions','trainer', creator=lambda thisTrainee: Session(trainee = thisTrainee))

class Session(db.Model):
    '''
    Session class with attributes; id, day, activity, trainer_id, trainee_id
    '''

    __tablename__ = 'sessions'
    id = db.Column(db.Integer, primary_key=True)
    day = db.Column(db.String)
    activity = db.Column(db.String)
    trainer_id = db.Column(db.Integer, db.ForeignKey('trainers.id'))
    trainee_id = db.Column(db.Integer, db.ForeignKey('trainees.id'))

    trainer = db.relationship('Trainer', back_populates='sessions')


