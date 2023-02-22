from flask import Flask, jsonify, request
from flask.helpers import send_from_directory
from flask_cors import CORS, cross_origin
from fetch_data import *

app = Flask(__name__, static_folder='frontend/build', static_url_path='')
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/api/get_projects', methods=['POST'])
@cross_origin()
def get_projects():
    data = request.get_json()
    return jsonify(get_users_projects(data))

@app.route('/api/get_project_details', methods=['POST'])
@cross_origin()
def get_project_details():
    data = request.get_json()
    return jsonify(get_project_details_fcn(data))

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

@app.route('/api/get_project_data', methods=['POST'])
@cross_origin()
def get_project_data():
    data = request.get_json()
    return jsonify(get_project_data_fcn(data))

@app.route('/api/update_project_data', methods=['POST'])
@cross_origin()
def update_project_data():
    data = request.get_json()
    return jsonify(update_project_data_fcn(data))

@app.route('/api/add_comment', methods=['POST'])
@cross_origin()
def add_comment():
    data = request.get_json()
    return jsonify(add_comment_fcn(data))

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
@cross_origin()
def login():
    data = request.get_json()
    return jsonify(log_in(data))

@app.route('/')
@cross_origin()
def serve():
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run()
