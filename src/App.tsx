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
    fetch('http://localhost:8080/run-script', { // Assurez-vous que l'URL correspond à votre backend
      method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
      if (data.output) {
        setOutput(data.output); // Mettre à jour l'état avec la sortie du backend
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

        {output && <div className="mt-4">{output}</div>}
      </div>
    </div>
  );
};

export default App;