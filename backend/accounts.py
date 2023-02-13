from psql import *

def email_check(email):
    if psql_connect() == 'error':
        return 'error'
    else:
        cur, c = psql_connect()
        cur.execute(f"SELECT email FROM ACCOUNTS_SOFTMAKS WHERE email = '{email}'")
        emails_sql = cur.fetchone()
        if not emails_sql:
            return False
        return True


def check_pass(email, password_arg):
    if psql_connect() == 'error':
        return 'error'
    else:
        cur, c = psql_connect()
        cur.execute(f"SELECT password FROM ACCOUNTS_SOFTMAKS WHERE email = '{email}'")
        password = cur.fetchall()
        if password[0][0] == password_arg:
            return True
        return False

def log_in(data):
    email = data["email"]
    password = data["pass"]
    if email_check(email) == 'error':
        return """Can't connect to database"""
    elif not email_check(email):
        return 'The email you entered was incorrect'
    else:
        if check_pass(email, password) == 'error':
            return """Can't connect to database"""
        elif not check_pass(email, password):
            return 'The password you entered was incorrect'
        else:
            return True

def user_data(data):
    email = data["email"]
    if psql_connect() == 'error':
        return 'error'
    else:
        cur, c = psql_connect()
        cur.execute(f"SELECT * FROM ACCOUNTS_SOFTMAKS WHERE email = '{email}'")
        data = cur.fetchall()
        return data

def update_user(data):
    data = data["data"]
    if psql_connect() == 'error':
        return 'error'
    else:
        cur, c = psql_connect()
        try:
            cur.execute(f"UPDATE ACCOUNTS_SOFTMAKS SET name = '{data[0]}', surname = '{data[1]}', password = '{data[2]}', age = {data[3]}, sex = '{data[4]}', email = '{data[5]}', number = {data[6]} WHERE email = '{data[5]}';")
            c.commit()
        except psycopg2.errors.CheckViolation:
            return 'violation'
        return True