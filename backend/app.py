from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from accounts import *

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/api/get_projects', methods=['POST'])
@cross_origin()
def get_projects():
    data = request.get_json()
    return jsonify(get_users_projects(data))

@app.route('/api/delete_project', methods=['POST'])
@cross_origin()
def delete_project():
    data = request.get_json()
    return jsonify(delete_project_fcn(data))

@app.route('/api/get_users', methods=['GET'])
@cross_origin()
def get_users():
    data = get_users_email()
    return jsonify(data)

@app.route('/api/get_user_data', methods=['POST'])
@cross_origin()
def get_user_data():
    data = request.get_json()
    return jsonify(user_data(data))

@app.route('/api/create_project', methods=['POST'])
@cross_origin()
def create_project():
    data = request.get_json()
    return jsonify(create_new_project(data))

@app.route('/api/update_user_data', methods=['POST'])
@cross_origin()
def update_user_data():
    data = request.get_json()
    return jsonify(update_user(data))

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    return jsonify(log_in(data))

if __name__ == '__main__':
    app.run(debug=True)
