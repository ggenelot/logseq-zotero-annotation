import sqlite3
import pandas as pd
from flask import Flask, jsonify


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

# Renvoyer les données JSON dans la réponse
print(annotations_json)