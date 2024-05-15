from flask import Flask, jsonify
import sqlite3
import pandas as pd

app = Flask(__name__)

@app.route('/get-zotero-annotations', methods=['POST'])
def get_zotero_annotations():
    try:
        # Connexion à la base de données SQLite
        conn = sqlite3.connect(r'C:\Users\gabriel.genelot\Zotero\zotero.sqlite')
        c = conn.cursor()

        # Exécution de la requête SQL pour récupérer les informations nécessaires avec le titre
        c.execute("SELECT itemID, parentItemID, type, authorName, text, comment, color, pageLabel, sortIndex FROM itemAnnotations")
        # Récupération des résultats de la requête
        annotations = pd.DataFrame(c.fetchall(), columns=['itemID', 'parentItemID', 'type', 'authorName', 'text', 'comment', 'color', 'pageLabel', 'sortIndex'])

        # Fermeture de la connexion à la base de données
        conn.close()

        # Convertir les données en format JSON
        annotations_json = annotations.to_json(orient='records')
        print(annotations_json)

        annotations_data =json.loads(annotations_json)
        print(annotations_data)

        # Renvoyer les données JSON dans la réponse
        return jsonify({annotations_json})
    except Exception as e:
        return jsonify({'error jsonify': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=8080)
