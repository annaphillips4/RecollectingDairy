from app.models import db, Task, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date

def seed_tasks():
  wt1 = Task(
    name='Prepare presentation for meeting',
    completed=True,
    due_date=date(2023, 5, 22),
    start_date=date(2023, 5, 15),
    priority=1,
    repeat_period=0,
    repeat_type='None',
    location='Work',
    estimate=180,
    tags='Work Tasks',
    notes='',
    list_id=1,
    owner_id=1,
    assigned_user_id=1
  )
  wt8 = Task(
    name='Review project proposal',
    completed=True,
    due_date=date(2023, 5, 22),
    start_date=date(2023, 5, 16),
    priority=1,
    repeat_period=0,
    repeat_type='None',
    location='Work',
    estimate=25,
    tags='Work Tasks',
    notes='',
    list_id=1,
    owner_id=1,
    assigned_user_id=1
  )
  wt2 = Task(
    name='Send follow-up emails to clients',
    completed=True,
    due_date=date(2023, 5, 23),
    start_date=date(2023, 5, 17),
    priority=2,
    repeat_period=0,
    repeat_type='None',
    location='Work',
    estimate=30,
    tags='Work Tasks',
    notes='',
    list_id=1,
    owner_id=1,
    assigned_user_id=1
  )
  wt3 = Task(
    name='Complete expense report',
    completed=True,
    due_date=date(2023, 5, 23),
    start_date=date(2023, 5, 18),
    repeat_period=0,
    repeat_type='None',
    location='Work',
    estimate=35,
    tags='Work Tasks',
    notes='',
    list_id=1,
    owner_id=1,
    assigned_user_id=1
  )
  wt4 = Task(
    name='Research industry trends',
    completed=False,
    due_date=date(2023, 5, 24),
    start_date=date(2023, 5, 19),
    repeat_period=0,
    repeat_type='None',
    location='Work',
    estimate=40,
    tags='Work Tasks',
    notes='',
    list_id=1,
    owner_id=1,
    assigned_user_id=1
  )
  wt5 = Task(
    name='Update project status report',
    completed=False,
    due_date=date(2023, 5, 24),
    start_date=date(2023, 5, 19),
    priority=2,
    repeat_period=0,
    repeat_type='None',
    location='Work',
    estimate=45,
    tags='Work Tasks',
    notes='',
    list_id=1,
    owner_id=1,
    assigned_user_id=1
  )
  wt6 = Task(
    name='Prepare agenda for team meeting',
    completed=False,
    due_date=date(2023, 5, 25),
    start_date=date(2023, 5, 22),
    priority=3,
    repeat_period=0,
    repeat_type='None',
    location='Work',
    estimate=50,
    tags='Work Tasks',
    notes='',
    list_id=1,
    owner_id=1,
    assigned_user_id=1
  )
  wt7 = Task(
    name='Generate monthly report',
    completed=False,
    due_date=date(2023, 5, 25),
    start_date=date(2023, 5, 23),
    priority=1,
    repeat_period=0,
    repeat_type='None',
    location='Work',
    estimate=55,
    tags='Work Tasks',
    notes='',
    list_id=1,
    owner_id=1,
    assigned_user_id=1
  )
  wt9 = Task(
    name="Plan next week's tasks",
    completed=False,
    due_date=date(2023, 5, 26),
    start_date=date(2023, 5, 24),
    priority=1,
    repeat_period=0,
    repeat_type='None',
    location='Work',
    estimate=55,
    tags='Work Tasks',
    notes='',
    list_id=1,
    owner_id=1,
    assigned_user_id=1
  )
  errand1 = Task(
    name='Grocery shopping',
    completed=True,
    due_date=date(2023, 5, 22),
    start_date=date(2023, 5, 15),
    priority=1,
    repeat_period=0,
    repeat_type='None',
    location='',
    estimate=180,
    tags='Errands',
    notes='',
    list_id=2,
    owner_id=1,
    assigned_user_id=1
  )
  errand2 = Task(
      name='Pick up dry cleaning',
      completed=True,
      due_date=date(2023, 5, 23),
      start_date=date(2023, 5, 17),
      priority=2,
      repeat_period=0,
      repeat_type='None',
      location='',
      estimate=30,
      tags='Errands',
      notes='',
      list_id=2,
      owner_id=1,
      assigned_user_id=1
  )
  errand3 = Task(
      name='Schedule dentist appointment',
      completed=False,
      due_date=date(2023, 5, 23),
      start_date=date(2023, 5, 18),
      repeat_period=0,
      repeat_type='None',
      location='',
      estimate=35,
      tags='Errands',
      notes='',
      list_id=2,
      owner_id=1,
      assigned_user_id=1
  )
  errand4 = Task(
      name='Pay utility bills',
      completed=False,
      due_date=date(2023, 5, 24),
      start_date=date(2023, 5, 19),
      repeat_period=0,
      repeat_type='None',
      location='',
      estimate=40,
      tags='Errands',
      notes='',
      list_id=2,
      owner_id=1,
      assigned_user_id=1
  )
  errand5 = Task(
      name="Renew driver's license",
      completed=False,
      due_date=date(2023, 5, 24),
      start_date=date(2023, 5, 19),
      priority=2,
      repeat_period=0,
      repeat_type='None',
      location='',
      estimate=45,
      tags='Errands',
      notes='',
      list_id=2,
      owner_id=1,
      assigned_user_id=1
  )
  errand6 = Task(
      name='Book flight tickets',
      completed=False,
      due_date=date(2023, 5, 25),
      start_date=date(2023, 5, 22),
      priority=3,
      repeat_period=0,
      repeat_type='None',
      location='',
      estimate=50,
      tags='Errands',
      notes='',
      list_id=2,
      owner_id=1,
      assigned_user_id=1
  )
  errand7 = Task(
      name='Organize closet',
      completed=True,
      due_date=date(2023, 5, 25),
      start_date=date(2023, 5, 23),
      priority=1,
      repeat_period=0,
      repeat_type='None',
      location='',
      estimate=55,
      tags='Errands',
      notes='',
      list_id=2,
      owner_id=1,
      assigned_user_id=1
  )
  errand8 = Task(
      name='Make dinner reservations',
      completed=True,
      due_date=date(2023, 5, 22),
      start_date=date(2023, 5, 16),
      priority=1,
      repeat_period=0,
      repeat_type='None',
      location='',
      estimate=25,
      tags='Errands',
      notes='',
      list_id=2,
      owner_id=1,
      assigned_user_id=1
  )
  errand9 = Task(
      name='Call plumber to fix leaky faucet',
      completed=False,
      due_date=date(2023, 5, 23),
      start_date=date(2023, 5, 17),
      priority=2,
      repeat_period=0,
      repeat_type='None',
      location='',
      estimate=35,
      tags='Errands',
      notes='',
      list_id=2,
      owner_id=1,
      assigned_user_id=1
  )
  errand10 = Task(
      name='Arrange car maintenance',
      completed=False,
      due_date=date(2023, 5, 24),
      start_date=date(2023, 5, 18),
      repeat_period=0,
      repeat_type='None',
      location='',
      estimate=40,
      tags='Errands',
      notes='',
      list_id=2,
      owner_id=1,
      assigned_user_id=1
  )
  errand11 = Task(
      name='Update home insurance policy',
      completed=False,
      due_date=date(2023, 5, 25),
      start_date=date(2023, 5, 19),
      priority=1,
      repeat_period=0,
      repeat_type='None',
      location='',
      estimate=45,
      tags='Errands',
      notes='',
      list_id=2,
      owner_id=1,
      assigned_user_id=1
  )
  errand12 = Task(
      name='Donate clothes to charity',
      completed=True,
      due_date=date(2023, 5, 26),
      start_date=date(2023, 5, 20),
      priority=3,
      repeat_period=0,
      repeat_type='None',
      location='',
      estimate=50,
      tags='Errands',
      notes='',
      list_id=2,
      owner_id=1,
      assigned_user_id=1
  )
  errand13 = Task(
      name='Plan weekend activities',
      completed=False,
      due_date=date(2023, 5, 27),
      start_date=date(2023, 5, 21),
      priority=2,
      repeat_period=0,
      repeat_type='None',
      location='',
      estimate=55,
      tags='Errands',
      notes='',
      list_id=2,
      owner_id=1,
      assigned_user_id=1
  )
  errand14 = Task(
      name='Create meal plan for the week',
      completed=False,
      due_date=date(2023, 5, 28),
      start_date=date(2023, 5, 22),
      priority=1,
      repeat_period=0,
      repeat_type='None',
      location='',
      estimate=30,
      tags='Errands',
      notes='',
      list_id=2,
      owner_id=1,
      assigned_user_id=1
  )
  errand15 = Task(
      name='Research new phone options',
      completed=True,
      due_date=date(2023, 5, 29),
      start_date=date(2023, 5, 23),
      repeat_period=0,
      repeat_type='None',
      location='',
      estimate=35,
      tags='Errands',
      notes='',
      list_id=2,
      owner_id=1,
      assigned_user_id=1
  )
  hip1 = Task(
      name='Replace kitchen faucet',
      completed=True,
      due_date=date(2023, 5, 22),
      start_date=date(2023, 5, 15),
      priority=1,
      repeat_period=0,
      repeat_type='None',
      location='',
      estimate=20,
      tags='Home Improvement Projects',
      notes='',
      list_id=3,
      owner_id=1,
      assigned_user_id=1
  )
  hip2 = Task(
      name='Build bookshelf in the study',
      completed=False,
      due_date=date(2023, 5, 22),
      start_date=date(2023, 5, 16),
      priority=1,
      repeat_period=0,
      repeat_type='None',
      location='',
      estimate=150,
      tags='Home Improvement Projects',
      notes='',
      list_id=3,
      owner_id=1,
      assigned_user_id=1
  )
  hip3 = Task(
      name='Repair broken fence',
      completed=False,
      due_date=date(2023, 5, 23),
      start_date=date(2023, 5, 17),
      priority=2,
      repeat_period=0,
      repeat_type='None',
      location='',
      estimate=120,
      tags='Home Improvement Projects',
      notes='',
      list_id=3,
      owner_id=1,
      assigned_user_id=1
  )
  hip4 = Task(
      name='Clean gutters',
      completed=False,
      due_date=date(2023, 5, 23),
      start_date=date(2023, 5, 18),
      repeat_period=0,
      repeat_type='None',
      location='',
      estimate=35,
      tags='Home Improvement Projects',
      notes='',
      list_id=3,
      owner_id=1,
      assigned_user_id=1
  )
  fitgoals1 = Task(
      name='Set fitness goals for the month',
      completed=True,
      due_date=date(2023, 5, 22),
      start_date=date(2023, 5, 15),
      priority=1,
      repeat_period=0,
      repeat_type='None',
      location='',
      estimate=25,
      tags='Fitness Goals',
      notes='',
      list_id=4,
      owner_id=1,
      assigned_user_id=1
  )

  fitgoals2 = Task(
      name='Join a sports club',
      completed=True,
      due_date=date(2023, 5, 23),
      start_date=date(2023, 5, 17),
      priority=2,
      repeat_period=0,
      repeat_type='None',
      location='',
      estimate=10,
      tags='Fitness Goals',
      notes='',
      list_id=4,
      owner_id=1,
      assigned_user_id=1
  )

  fitgoals3 = Task(
      name='Attend a cycling class',
      completed=True,
      due_date=date(2023, 5, 23),
      start_date=date(2023, 5, 18),
      repeat_period=0,
      repeat_type='None',
      location='',
      estimate=50,
      tags='Fitness Goals',
      notes='',
      list_id=4,
      owner_id=1,
      assigned_user_id=1
  )

  fitgoals4 = Task(
      name='Participate in a charity walk/run event',
      completed=False,
      due_date=date(2023, 5, 24),
      start_date=date(2023, 5, 19),
      repeat_period=0,
      repeat_type='None',
      location='',
      estimate=60,
      tags='Fitness Goals',
      notes='',
      list_id=4,
      owner_id=1,
      assigned_user_id=1
  )

  fitgoals5 = Task(
      name='Schedule a session with a personal trainer',
      completed=False,
      due_date=date(2023, 5, 24),
      start_date=date(2023, 5, 19),
      priority=2,
      repeat_period=0,
      repeat_type='None',
      location='',
      estimate=5,
      tags='Fitness Goals',
      notes='',
      list_id=4,
      owner_id=1,
      assigned_user_id=1
  )

  fitgoals6 = Task(
      name='Try a new hiking trail',
      completed=False,
      due_date=date(2023, 5, 25),
      start_date=date(2023, 5, 22),
      priority=3,
      repeat_period=0,
      repeat_type='None',
      location='',
      estimate=50,
      tags='Fitness Goals',
      notes='',
      list_id=4,
      owner_id=1,
      assigned_user_id=1
  )

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
    list_id=5,
    owner_id=2,
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
    list_id=5,
    owner_id=2,
    assigned_user_id=3
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
    list_id=6,
    owner_id=2
    )

  tasks = [wt1, wt8, wt2, wt3, wt4, wt5, wt6, wt7, wt9, errand1, errand2, errand3, errand4, errand5, errand6, errand7, errand8, errand9, errand10, errand11, errand12, errand13, errand14, errand15, hip1, hip2, hip3, hip4, fitgoals1, fitgoals2, fitgoals3, fitgoals4, fitgoals5, fitgoals6]
  for task in tasks:
    db.session.add(task)

  db.session.commit()

def undo_tasks():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.tasks RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM tasks"))

  db.session.commit()
