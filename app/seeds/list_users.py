from app.models import db, List_User, environment, SCHEMA
from sqlalchemy.sql import text

def seed_list_users():
    groceries_marnie = List_User(
        user_id=2, list_id=1, edit_priv=False)
    chores_bobbie = List_User(
        user_id=3, list_id=2, edit_priv=False)
    workpro_demo = List_User(
        user_id=1, list_id=3, edit_priv=True)

    db.session.add(groceries_marnie)
    db.session.add(chores_bobbie)
    db.session.add(workpro_demo)
    db.session.commit()

def undo_list_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.list_users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM list_users"))

    db.session.commit()
