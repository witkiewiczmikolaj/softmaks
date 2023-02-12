from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/api/get_data', methods=['GET'])
@cross_origin()
def get_data():
    # retrieve data from the database
    data = {'message': 'Hello from Flask'}
    return jsonify(data)

@app.route('/api/post_data', methods=['POST'])
def post_data():
    data = request.get_json()
    return data

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if data["user"] == "admin" and data["pass"] == "admin":
        return jsonify(True)
    return jsonify(False)

if __name__ == '__main__':
    app.run(debug=True)
