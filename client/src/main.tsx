import 'bootstrap/dist/css/bootstrap.css';
import "@fontsource/oswald/400.css";
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { store } from './app/store'
import { Provider } from 'react-redux'

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>,
  );
} else {
  console.error("Root element with ID 'root' not found in the document");
}
