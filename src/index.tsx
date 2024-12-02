import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import for React 18+
import { GoogleOAuthProvider } from '@react-oauth/google'; // Import GoogleOAuthProvider
import './index.css';
import App from './App';

// Create a root for React to attach to and render the app
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="647779260110-9r21p3vjfk4323hpndin60tav1t56ihq.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
