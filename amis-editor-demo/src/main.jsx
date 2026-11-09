import React from 'react';
import ReactDOM from 'react-dom/client';
import 'amis/lib/themes/cxd.css';
import 'amis-editor-core/lib/style.css';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';

window.MonacoEnvironment = {
  getWorker() {
    return new editorWorker();
  }
};

import App from './App.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
