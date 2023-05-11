from app.models import db, List, environment, SCHEMA
from sqlalchemy.sql import text

def seed_lists():
    groceries = List(
        name='Groceries', notes="Don't forget!!", owner_id=1)
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
