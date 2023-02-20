from psql import *

def email_check(email):
    try:
        cur, c = psql_connect()
    except Exception as e:
        return f"{e}"

    cur.execute(f"SELECT email FROM ACCOUNTS_SOFTMAKS WHERE email = '{email}'")
    emails_sql = cur.fetchone()
    if not emails_sql:
        return False
    return True


def check_pass(email, password_arg):
    try:
        cur, c = psql_connect()
    except Exception as e:
        return f"{e}"
    
    cur.execute(f"SELECT password FROM ACCOUNTS_SOFTMAKS WHERE email = '{email}'")
    password = cur.fetchall()
    if password[0][0] == password_arg:
        return True
    return False

def log_in(data):
    email = data["email"]
    password = data["pass"]
    if email_check(email) != True and email_check(email) != False:
        return email_check(email)
    elif not email_check(email):
        return 'The email you entered was incorrect'
    else:
        if check_pass(email, password) != True and check_pass(email, password) != False:
            return check_pass(email, password)
        elif not check_pass(email, password):
            return 'The password you entered was incorrect'
        else:
            return True

def user_data(data):
    email = data["email"]
    try:
        cur, c = psql_connect()
    except Exception as e:
        return f"{e}"

    cur.execute(f"SELECT * FROM ACCOUNTS_SOFTMAKS WHERE email = '{email}'")
    data = cur.fetchall()
    return data

def update_user(data):
    data = data["data"]
    try:
        cur, c = psql_connect()
    except Exception as e:
        return f"{e}"
    if data[6] == '':
        try:
            cur.execute(f"UPDATE ACCOUNTS_SOFTMAKS SET name = '{data[0]}', surname = '{data[1]}', password = '{data[2]}', age = {data[3]}, sex = '{data[4]}', email = '{data[5]}' WHERE email = '{data[7]}';")
            c.commit()
        except Exception as e:
            return f"{e}"
    else:
        try:
            cur.execute(f"UPDATE ACCOUNTS_SOFTMAKS SET name = '{data[0]}', surname = '{data[1]}', password = '{data[2]}', age = {data[3]}, sex = '{data[4]}', email = '{data[5]}', number = {data[6]} WHERE email = '{data[7]}';")
            c.commit()
        except Exception as e:
            return f"{e}"
    
    return True

def get_users_email():
    try:
        cur, c = psql_connect()
    except Exception as e:
        return f"{e}"
    cur.execute("SELECT email FROM ACCOUNTS_SOFTMAKS")
    data = cur.fetchall()
    everyemail = []
    for emails in data:
        for email in emails:
            everyemail.append(email)
    return everyemail
    
def get_users_projects(data):
    email = data["email"]
    try:
        cur, c = psql_connect()
    except Exception as e:
        return f"{e}"

    cur.execute(f"SELECT project_id FROM PROJECT_USERS where user_email = '{email}'")
    data = cur.fetchall()
    projects_array =[]
    for project_id in data:
        cur.execute(f"SELECT * FROM PROJECTS_SOFTMAKS where project_id = {project_id[0]}")
        projects = cur.fetchall()
        projects_array.append(projects)

    return projects_array

def create_new_project(data):
    data = data["data"]
    try:
        cur, c = psql_connect()
    except Exception as e:
        return f"{e}"
    try:
        cur.execute(f"INSERT INTO PROJECTS_SOFTMAKS (name, description, start_date, end_date, status, created_by) VALUES ('{data[0]}', '{data[1]}', '{data[2]}', '{data[3]}', 'NOWY', '{data[5]}');")
        c.commit()
        cur.execute(f"SELECT project_id FROM PROJECTS_SOFTMAKS")
        project_id = cur.fetchall()
        for email in data[4]:
            cur.execute(f"INSERT INTO PROJECT_USERS (project_id, user_email) VALUES ('{project_id[-1][0]}', '{email}');") 
            c.commit()
        cur.execute(f"INSERT INTO PROJECT_USERS (project_id, user_email) VALUES ('{project_id[-1][0]}', '{data[5]}');") 
        c.commit()
    except Exception as e:
        return f"{e}"
    
    return True

def delete_project_fcn(data):
    project_id = data["id"]
    try:
        cur, c = psql_connect()
    except Exception as e:
        return f"{e}"

    cur.execute(f"DELETE FROM PROJECTS_SOFTMAKS WHERE project_id = {project_id}")
    c.commit()
    cur.execute(f"DELETE FROM PROJECT_USERS WHERE project_id = {project_id}")
    c.commit()

    return True

def get_project_data_fcn(data):
    project_id = data["id"]
    try:
        cur, c = psql_connect()
    except Exception as e:
        return f"{e}"

    cur.execute(f"SELECT * FROM PROJECTS_SOFTMAKS WHERE project_id = {project_id}")
    data_response = cur.fetchall()

    return data_response

def update_project_data_fcn(data):
    data = data["data"]
    try:
        cur, c = psql_connect()
    except Exception as e:
        return f"{e}"
    
    cur.execute(f"UPDATE PROJECTS_SOFTMAKS SET name = '{data[0]}', description = '{data[1]}', start_date = '{data[2]}', end_date = '{data[3]}', status = '{data[4]}' WHERE project_id = {data[5]};")
    c.commit()
   
    return True

def add_comment_fcn(data):
    data = data["data"]
    try:
        cur, c = psql_connect()
    except Exception as e:
        return f"{e}"
    
    cur.execute(f"INSERT INTO COMMENTS (text, date, user_email, project_id) VALUES ('{data[0]}', '{data[3]}', '{data[2]}', {data[1]});")
    c.commit()
   
    return True

def get_project_details_fcn(data):
    project_id = data["id"]
    try:
        cur, c = psql_connect()
    except Exception as e:
        return f"{e}"

    cur.execute(f"SELECT * FROM PROJECTS_SOFTMAKS where project_id = {project_id}")
    details = cur.fetchone()
    cur.execute(f"SELECT name, surname FROM ACCOUNTS_SOFTMAKS where email = '{details[6]}'")
    name = cur.fetchone()
    cur.execute(f"SELECT * FROM PROJECT_USERS where project_id = {project_id}")
    users_sql = cur.fetchall()
    cur.execute(f"SELECT * FROM COMMENTS where project_id = {project_id}")
    comments = cur.fetchall()
    users = []
    for user in users_sql:
        users.append(user[1])
    data = [details, users, comments, name]

    return data