from app.models import db, Task, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date

def seed_tasks():
  groceries = Task(
    name='Go to Whole Foods for groceries',
    completed=False,
    dueDate=date(2069, 1, 1),
    startDate=date(2023, 1, 1),
    priority=1,
    repeat_period=0,
    repeat_type='None',
    location='Austin, TX',
    estimate=180,
    tags='Grocery',
    notes='',
    listId=1,
    ownerId=1,
    # assigned_user=1
  )
  gym = Task(
    name='PUMP IRON BABY',
    completed=False,
    dueDate=date(2023, 1, 2),
    startDate=date(2023, 1, 1),
    priority=2,
    repeat_period=0,
    repeat_type='None',
    location='New York, NY',
    estimate=120,
    tags='Fitness',
    notes='',
    listId=2,
    ownerId=2,
    # assigned_user=2
  )
  fight_crime = Task(
    name='cosplay your favorite cape crusader',
    completed=False,
    dueDate=date(6969, 1, 1),
    startDate=date(2023, 1, 1),
    priority=2,
    repeat_period=0,
    repeat_type='None',
    location='New York, NY',
    estimate=120,
    tags='Leisure',
    notes='',
    listId=2,
    ownerId=2,
    # assigned_user=2
  )

  db.session.add(groceries)
  db.session.add(gym)
  db.session.add(fight_crime)
  db.session.commit()

def undo_tasks():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.tasks RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM tasks"))

  db.session.commit()
