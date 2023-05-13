from app.models import db, List, environment, SCHEMA
from sqlalchemy.sql import text

def seed_lists():
    workTasks = List(
        name='Work Tasks', notes="Prioritize tasks based on deadlines to ensure timely completion of projects", owner_id=1)
    errands = List(
        name='Errands', notes="Need to plan the most efficient route to save time and make the most of the day.", owner_id=1)
    homeImpPro = List(
        name='Home Improvement Projects', notes="Allocate specific timelines to ensure smooth progress and successful completion.", owner_id=1)
    fitnessGoals = List(
        name='Fitness Goals', notes="Track progress regularly, and celebrate milestones to stay motivated.", owner_id=1)
    chores = List(
        name='Chores', notes="", owner_id=2)
    workpro = List(
        name='Work Project', notes="Go over with boss on Monday", owner_id=3)

    db.session.add(groceries)
    db.session.add(chores)
    db.session.add(workpro)
    db.session.commit()

def undo_lists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.lists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM lists"))

    db.session.commit()
