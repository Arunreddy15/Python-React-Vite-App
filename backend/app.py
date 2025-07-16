from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow requests from React (Vite) frontend

@app.route('/api/greet', methods=['POST'])
def greet():
    data = request.get_json()
    name = data.get('name', 'Guest')
    sport = data.get('sport','')
    
    if len(name)>=3:
        if sport:return jsonify({'message': f'Hello, {name}!, We heard you love {sport}'})
        return jsonify({'message': f'Hello, {name}!'})
    return jsonify({'message': 'Warning! : Name should be atleast 3 characters'})    

if __name__ == '__main__':
    app.run(port=5000, debug=True)