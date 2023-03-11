from psql import psql_connect
from hashlib import sha256
from flask_httpauth import HTTPBasicAuth

auth = HTTPBasicAuth()

@auth.verify_password
def verify_password(username, password):
    password_hash = hash_password(password)
    if email_check(username):
        if check_pass(username, password_hash):
            return True

    return False

def email_check(email):
    cur, c = psql_connect()
    cur.execute(f"SELECT email FROM ACCOUNTS_SOFTMAKS WHERE email = '{email}'")
    emails_sql = cur.fetchone()
    if not emails_sql:
        return False
    return True

def check_pass(email, password_hash):
    cur, c = psql_connect()
    cur.execute(f"SELECT password FROM ACCOUNTS_SOFTMAKS WHERE email = '{email}'")
    password = cur.fetchall()
    if password[0][0] == password_hash:
        return True
    return False

def hash_password(password):
    h = sha256()
    h.update(password.encode())
    return h.hexdigest()

def add_account(data):
    cur, c = psql_connect()
    email, name, surname, age, sex, number = data["email"], data["name"], data["surname"], data["age"], data["sex"], data["number"]
    password_hash = hash_password(data["pass"])
    cur.execute(f"INSERT INTO ACCOUNTS_SOFTMAKS (name, surname, password, age, sex, email, number) VALUES ('{name}', '{surname}', '{password_hash}', {age}, '{sex}', '{email}', {number});")
    c.commit()

def get_name(email):
    cur, c = psql_connect()
    cur.execute(f"SELECT name FROM ACCOUNTS_SOFTMAKS WHERE email = '{email}'")
    name = cur.fetchone()
    return name[0]

def log_in(data):
    email = data["email"]
    password_hash = hash_password(data["pass"])
    if email_check(email):
        if check_pass(email, password_hash):
            return True
        else:
            return False
    else:
        return False

def register_fcn(data):
    email = data["email"]
    if email_check(email):
        return False
    else:
        add_account(data)
        return True

def user_data(data):
    cur, c = psql_connect()
    email = data["email"]
    cur.execute(f"SELECT * FROM ACCOUNTS_SOFTMAKS WHERE email = '{email}'")
    data = cur.fetchone()
    data_temp = list(data)
    keys = ["name", "surname", "password", "age", "sex", "email", "number"]
    data_temp = {keys[i]: data_temp[i] for i in range(len(keys))}
    return data_temp

def update_user(data):
    cur, c = psql_connect()
    name, surname, age, sex, email, number, oldemail = data["name"], data["surname"], data["age"], data["sex"], data["email"], data["number"], data["oldemail"]
    password_hash = hash_password(data["password"])
    if number == '':
        cur.execute(f"UPDATE ACCOUNTS_SOFTMAKS SET name = '{name}', surname = '{surname}', password = '{password_hash}', age = {age}, sex = '{sex}', email = '{email}' WHERE email = '{oldemail}';")
        c.commit()
    else:
        cur.execute(f"UPDATE ACCOUNTS_SOFTMAKS SET name = '{name}', surname = '{surname}', password = '{password_hash}', age = {age}, sex = '{sex}', email = '{email}', number = {number} WHERE email = '{oldemail}';")
        c.commit()

    cur.execute(f"UPDATE PROJECT_USERS SET user_email = '{email}' WHERE user_email = '{oldemail}';")
    c.commit()
    cur.execute(f"UPDATE PROJECTS_SOFTMAKS SET created_by = '{email}' WHERE created_by = '{oldemail}';")
    c.commit()
    cur.execute(f"UPDATE COMMENTS SET user_email = '{email}' WHERE user_email = '{oldemail}';")
    c.commit()
    return True

def get_users_email():
    cur, c = psql_connect()
    cur.execute("SELECT email FROM ACCOUNTS_SOFTMAKS")
    data = cur.fetchall()
    everyemail = []
    for emails in data:
        for email in emails:
            everyemail.append(email)
    return everyemail
    
def get_users_projects(data):
    cur, c = psql_connect()
    email = data["email"]
    cur.execute(f"SELECT project_id FROM PROJECT_USERS where user_email = '{email}'")
    data = cur.fetchall()
    projects_array = []
    keys = ["id", "name", "description", "start", "end", "status", "owner"]
    projects_array.append(keys)
    for project_id in data:
        cur.execute(f"SELECT * FROM PROJECTS_SOFTMAKS where project_id = {project_id[0]}")
        projects = cur.fetchone()
        projects_array.append(projects)
    
    result = []
    num_arrays = len(projects_array)
    num_items = len(projects_array[0])

    for i in range(1, num_arrays):
        temp_dict = {}
        for j in range(num_items):
            temp_dict[projects_array[0][j]] = projects_array[i][j]
        result.append(temp_dict)
        
    return result

def create_new_project(data):
    cur, c = psql_connect()
    name, description, start, end, users, email = data["name"], data["description"], data["start"], data["end"], data["users"], data["email"]
   
    cur.execute(f"INSERT INTO PROJECTS_SOFTMAKS (name, description, start_date, end_date, status, created_by) VALUES ('{name}', '{description}', '{start}', '{end}', 'NOWY', '{email}');")
    c.commit()
    cur.execute(f"SELECT project_id FROM PROJECTS_SOFTMAKS")
    project_id = cur.fetchall()
    for email_user in users:
        cur.execute(f"INSERT INTO PROJECT_USERS (project_id, user_email) VALUES ('{project_id[-1][0]}', '{email_user}');") 
        c.commit()
    cur.execute(f"INSERT INTO PROJECT_USERS (project_id, user_email) VALUES ('{project_id[-1][0]}', '{email}');") 
    c.commit()
    
    return True

def delete_project_fcn(data):
    cur, c = psql_connect()
    project_id = data["id"]

    cur.execute(f"DELETE FROM PROJECTS_SOFTMAKS WHERE project_id = {project_id}; DELETE FROM PROJECT_USERS WHERE project_id = {project_id}; DELETE FROM COMMENTS WHERE project_id = {project_id}")
    c.commit()

    return True

def get_project_data_fcn(data):
    cur, c = psql_connect()
    project_id = data["id"]

    cur.execute(f"SELECT * FROM PROJECTS_SOFTMAKS WHERE project_id = {project_id}")
    data_response = cur.fetchone()
    cur.execute(f"SELECT * FROM PROJECT_USERS WHERE project_id = {project_id}")
    users_sql = cur.fetchall()
    
    users = []
    for user in users_sql:
        users.append(user[1])
    
    data_response_temp = list(data_response)
    data_response_temp.append([])
    data_response_temp.append([])

    keys = ["id", "name", "description", "start", "end", "status", "owner", "allusers", "currentusers"]
    json = {keys[i]: data_response_temp[i] for i in range(len(keys))}
    json["allusers"].append(get_users_email())
    json["currentusers"].append(users)

    return json

def update_project_data_fcn(data):
    cur, c = psql_connect()
    name, description, start, end, status, id, users, email = data["name"], data["description"], data["start"], data["end"], data["status"], data["id"], data["users"], data["email"]
    
    cur.execute(f"UPDATE PROJECTS_SOFTMAKS SET name = CASE WHEN '{name}' <> '' THEN '{name}' ELSE name END, description = CASE WHEN '{description}' <> '' THEN '{description}' ELSE description END, start_date = CASE WHEN '{start}' <> '' THEN '{start}' ELSE start_date END, end_date = CASE WHEN '{end}' <> '' THEN '{end}' ELSE end_date END, status = CASE WHEN '{status}' <> '' THEN '{status}' ELSE status END WHERE project_id = {id};")
    c.commit()
    cur.execute(f"DELETE FROM PROJECT_USERS WHERE project_id = {id}")
    c.commit()
    for email_user in users:
        cur.execute(f"INSERT INTO PROJECT_USERS (project_id, user_email) VALUES ('{id}', '{email_user}');") 
        c.commit()
    cur.execute(f"INSERT INTO PROJECT_USERS (project_id, user_email) VALUES ('{id}', '{email}');") 
    c.commit()
    return True

def add_comment_fcn(data):
    cur, c = psql_connect()
    comment, id, email, time = data["comment"], data["id"], data["email"], data["time"]
    
    cur.execute(f"INSERT INTO COMMENTS (text, date, user_email, project_id) VALUES ('{comment}', '{time}', '{email}', {id});")
    c.commit()
   
    return True

def get_project_details_fcn(data):
    cur, c = psql_connect()
    project_id = data["id"]

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
    is_owner = []
    for commment in comments:
        if commment[2] == details[6]:
            is_owner.append(True)
        else:
            is_owner.append(False)

    details_temp = list(details)
    details_temp.append([])
    details_temp.append([])
    details_temp.append([])
    details_temp.append([])

    keys = ["id", "name", "description", "start", "end", "status", "owner", "currentusers", "comments", "ownerdata", "isowner"]
    json = {keys[i]: details_temp[i] for i in range(len(keys))}
    json["currentusers"].append(users)
    json["comments"].append(comments)
    json["ownerdata"].append(name)
    json["isowner"].append(is_owner)

    return json