from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'root',
    'database': 'AgileBiteExpress',
}

# Establish a connection to the MySQL database
conn = mysql.connector.connect(**db_config)
cursor = conn.cursor()

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    name = data['name']
    email = data['email']
    password = data['password']

    print('Request data:', request.get_json())

    # Insert user data into the 'users' table
    cursor.execute('INSERT INTO users (name, email, password) VALUES (%s, %s, %s)', (name, email, password))
    conn.commit()

    return jsonify({'message': 'User registered successfully'})

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']

    # Query the database to check if the credentials are valid
    query = "SELECT * FROM users WHERE email=%s AND password=%s"
    cursor.execute(query, (email, password))
    result = cursor.fetchone()

    if result:
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'message': 'Login failed'}), 401
    
@app.route('/feedback', methods=['POST'])
def feedback():
    data = request.get_json()
    name = data['name']
    email = data['email']
    age = data['age']
    location = data['location']
    feedback = data['feedback']

    print('Request data:', request.get_json())

    # Insert user data into the 'users' table
    cursor.execute('INSERT INTO feedback (name, email, age, location, feedback) VALUES (%s, %s, %s, %s, %s)', (name, email, age, location, feedback))
    conn.commit()

    return jsonify({'message': 'User registered successfully'})
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
