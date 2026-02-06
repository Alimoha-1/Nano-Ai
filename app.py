from flask import Flask, request, jsonify
from flask_cors import CORS
from Ai import get_gemini_response

app = Flask(__name__)
CORS(app)   # <<< Halkan ayaa muhiim ah

@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.json
    user_input = data.get("prompt", "")
    response = get_gemini_response(user_input)
    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
