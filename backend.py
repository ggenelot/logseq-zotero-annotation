from flask import Flask, request, jsonify
import subprocess

app = Flask(__name__)

@app.route('/run-script', methods=['POST'])
def run_script():
    try:
        # Exécuter le script Python qui compte de 1 à 100
        script_output = subprocess.check_output(['python', 'count.py'])  # Assurez-vous que le script count.py est dans le même répertoire que backend.py
        return jsonify({'output': script_output.decode('utf-8')})
    except subprocess.CalledProcessError as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=8080)

