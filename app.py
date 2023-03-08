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
    return jsonify(get_users_projects(request.get_json()))

@app.route('/api/get_project_details', methods=['POST'])
@cross_origin()
def get_project_details():
    return jsonify(get_project_details_fcn(request.get_json()))

@app.route('/api/delete_project', methods=['POST'])
@cross_origin()
def delete_project():
    return jsonify(delete_project_fcn(request.get_json()))

@app.route('/api/get_users', methods=['GET'])
@cross_origin()
def get_users():
    return jsonify(get_users_email())

@app.route('/api/get_user_data', methods=['POST'])
@cross_origin()
def get_user_data():
    return jsonify(user_data(request.get_json()))

@app.route('/api/get_project_data', methods=['POST'])
@cross_origin()
def get_project_data():
    return jsonify(get_project_data_fcn(request.get_json()))

@app.route('/api/update_project_data', methods=['POST'])
@cross_origin()
def update_project_data():
    return jsonify(update_project_data_fcn(request.get_json()))

@app.route('/api/add_comment', methods=['POST'])
@cross_origin()
def add_comment():
    return jsonify(add_comment_fcn(request.get_json()))

@app.route('/api/create_project', methods=['POST'])
@cross_origin()
def create_project():
    return jsonify(create_new_project(request.get_json()))

@app.route('/api/update_user_data', methods=['POST'])
@cross_origin()
def update_user_data():
    return jsonify(update_user(request.get_json()))

@app.route('/login', methods=['POST'])
@cross_origin()
def login():
    return jsonify(log_in(request.get_json()))

@app.route('/register', methods=['POST'])
@cross_origin()
def register():
    return jsonify(register_fcn(request.get_json()))

@app.route('/')
@cross_origin()
def serve():
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run()
