import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

const App: React.FC<{ env: string }> = ({ env }) => {
  // Utiliser useState pour gérer l'état de la couleur de fond
  const [backgroundColor, setBackgroundColor] = useState<string>('bg-gradient-to-tr from-green-300 via-green-500 to-green-700');
  const [annotations, setAnnotations] = useState<any[]>([]); // Initialisation de la variable d'état annotations

  // Méthode appelée lorsque l'utilisateur clique sur le bouton pour changer la couleur de fond
  function changeBackgroundColor() {
    setBackgroundColor('bg-blue-500'); // Changer la couleur de fond en bleu
  }

  function closeWindow() {
    logseq.hideMainUI();
  }

  const [output, setOutput] = useState<string>(''); // État pour stocker la sortie du backend

  function runPythonScript() {
    console.log('Fetching data from backend...');
  
    fetch('http://localhost:8080/run-script', {
      method: 'POST',
    })
    .then(response => {
      console.log('Response received from backend:', response);
      return response.json();
    })
    .then(data => {
      console.log('Data received from backend:', data);
      if (data.annotations) {
        console.log('Updating annotations state:', data.annotations);
        setAnnotations(data.annotations);
      } else {
        console.error('Error:', data.error);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }


  return (
    <div className={`w-screen h-screen flex items-center justify-center text-white grey-300`}>
      {/* Votre contenu d'interface utilisateur */}
      <div className="w-screen h-screen fixed top-0 left-0" onClick={() => logseq.hideMainUI()}></div>
      <div className={`w-5/6 h-5/6 z-0 ${backgroundColor} flex flex-col items-center justify-center`}>
        <h1 className="font-bold text-4xl">Plugin de Gabriel</h1>

        {/* Bouton pour changer la couleur de fond */}
        <button onClick={changeBackgroundColor} className="button"><i className="ti ti-window"></i> Change Background Color</button>
        <button onClick={closeWindow} className="button"><i className="ti ti-window"></i> Fermer la fenetre</button>
        <button onClick={runPythonScript} className="button"><i className="ti ti-code"></i> Run Python Script</button>

        {annotations.length > 0 && (
          <div className="mt-4">
            <h3 className="text-2xl font-semibold">Zotero Annotations</h3>
            <table>
              <thead>
                <tr>
                  <th>Item ID</th>
                  <th>Parent Item ID</th>
                  <th>Type</th>
                  {/* Ajoutez les autres en-têtes de colonnes ici */}
                </tr>
              </thead>
              <tbody>
                {annotations.map((annotation, index) => (
                  <tr key={index}>
                    <td>{annotation.itemID}</td>
                    <td>{annotation.parentItemID}</td>
                    <td>{annotation.type}</td>
                    {/* Ajoutez les autres cellules de données ici */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;