import psycopg2

def psql_connect():
    psql_user = 'mikolaj'
    psql_pass = 'mikolaj123'
    psql_ip = '23.88.122.80'
    psql_port = '5432'
    psql_db = 'helbreder'

    c = psycopg2.connect(database=psql_db, user=psql_user, password=psql_pass, host=psql_ip, port=psql_port)
    cur = c.cursor()
        
    return cur, c