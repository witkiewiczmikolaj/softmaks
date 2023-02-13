from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from accounts import *

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/api/get_name', methods=['GET'])
@cross_origin()
def get_name():
    data = {'message': 'Hello User1'}
    return jsonify(data)

@app.route('/api/get_projects', methods=['GET'])
@cross_origin()
def get_projects():
    data = [{'name': 'Projekt1', 'start' : '2022-01-01', 'end' : '2022-01-02', 'status' : 'nowy'},
            {'name': 'Projekt2', 'start' : '2022-02-01', 'end' : '2022-02-02', 'status' : 'nowy'},
            {'name': 'Projekt3', 'start' : '2022-03-01', 'end' : '2022-03-02', 'status' : 'nowy'}
    ]
    return jsonify(data)

@app.route('/api/post_data', methods=['POST'])
def post_data():
    data = request.get_json()
    return data

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    return jsonify(log_in(data))

if __name__ == '__main__':
    app.run(debug=True)
