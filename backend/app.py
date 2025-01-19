from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import psycopg2

app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "*"}})

def get_db_connection():
    conn = psycopg2.connect(
        host='db',
        database='qrcodes',
        user='user',
        password='password'
    )
    cur = conn.cursor()
    cur.execute("""
        CREATE TABLE IF NOT EXISTS qr_codes (
            id SERIAL PRIMARY KEY,
            image BYTEA NOT NULL
        )
    """)
    conn.commit()
    cur.close()
    return conn

@app.route('/save_qr', methods=['POST'])
def save_qr():
    data = request.json
    if not data or 'qr_code' not in data:
        return jsonify({'error': 'Invalid input'}), 400  # Handle missing data

    qr_code_data = data['qr_code']
    
    # Decode the base64 image
    try:
        image_data = base64.b64decode(qr_code_data.split(',')[1])
    except Exception as e:
        return jsonify({'error': 'Invalid base64 data'}), 400

    # Save to database
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("INSERT INTO qr_codes (image) VALUES (%s)", (psycopg2.Binary(image_data),))
    conn.commit()
    cur.close()
    conn.close()
    
    return jsonify({'message': 'QR code saved successfully!'}), 201

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

