from app.models import db, Task, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date

def seed_tasks():
  groceries = Task(
    name='Go to Whole Foods for groceries',
    completed=True,
    due_date=date(2069, 1, 1),
    start_date=date(2023, 1, 1),
    priority=1,
    repeat_period=0,
    repeat_type='None',
    location='Austin, TX',
    estimate=180,
    tags='Grocery',
    notes='',
    list_id=1,
    owner_id=1,
    assigned_user_id=2
  )
  gym = Task(
    name='PUMP IRON BABY',
    completed=False,
    due_date=date(2023, 1, 2),
    start_date=date(2023, 1, 1),
    priority=2,
    repeat_period=0,
    repeat_type='None',
    location='New York, NY',
    estimate=120,
    tags='Fitness',
    notes='',
    list_id=2,
    owner_id=2,
    assigned_user_id=1
  )
  fight_crime = Task(
    name='cosplay your favorite cape crusader',
    completed=False,
    due_date=date(6969, 1, 1),
    start_date=date(2023, 1, 1),
    priority=2,
    repeat_period=0,
    repeat_type='None',
    location='New York, NY',
    estimate=120,
    tags='Leisure',
    notes='',
    list_id=2,
    owner_id=2
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
