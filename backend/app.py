from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from accounts import *

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/api/get_data', methods=['GET'])
@cross_origin()
def get_data():
    data = {'message': 'Hello from Flask'}
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
