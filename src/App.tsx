import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

interface Annotation {
  emID: string;
  parentItemID: string;
  type: string;
  // Ajoutez les autres propriétés d'annotation ici
}

const App: React.FC<{ env: string }> = ({ env }) => {
  const [backgroundColor, setBackgroundColor] = useState<string>('bg-gradient-to-tr from-green-300 via-green-500 to-green-700');
  const [annotations, setAnnotations] = useState<Annotation[]>([]);

  function changeBackgroundColor() {
    setBackgroundColor('bg-blue-500');
  }

  function closeWindow() {
    logseq.hideMainUI();
  }

  // Fonction pour traiter l'output et mettre à jour les annotations
  function processOutput(output: string) {
    const lines = output.split('\n');
    const newAnnotations: Annotation[] = [];
    for (let i = 1; i < lines.length; i++) {
      const columns = lines[i].split(' ');
      const annotation: Annotation = {
        emID: columns[0],
        parentItemID: columns[1],
        type: columns[2],
        // Ajoutez d'autres propriétés d'annotation ici
      };
      newAnnotations.push(annotation);
    }
    setAnnotations(newAnnotations);
  }

  function getZoteroAnnotations() {
    fetch('http://localhost:8080/get-zotero-annotations', {
      method: 'POST',
    })
    .then(response => response.text())
    .then(data => {
      processOutput(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  return (
    <div className={`w-screen h-screen flex items-center justify-center text-white grey-300`}>
      <div className="w-screen h-screen fixed top-0 left-0" onClick={() => logseq.hideMainUI()}></div>
      <div className={`w-5/6 h-5/6 z-0 ${backgroundColor} flex flex-col items-center justify-center`}>
        <h1 className="font-bold text-4xl">Plugin de Gabriel</h1>

        <button onClick={changeBackgroundColor} className="button"><i className="ti ti-window"></i> Change Background Color</button>
        <button onClick={closeWindow} className="button"><i className="ti ti-window"></i> Fermer la fenetre</button>
        <button onClick={getZoteroAnnotations} className="button"><i className="ti ti-code"></i> Get Zotero Annotations</button>

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
                    <td>{annotation.emID}</td>
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
