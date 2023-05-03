import datetime

def date_shift(date, weeks=0, days=0, hours=0, minutes=0):
    t_delta = datetime.timedelta(weeks=weeks, days=days, hours=hours, minutes=minutes)
    new_date = date + t_delta
    return new_date
