import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoot from './App';
import './index.css';

// Disable native context menu (reload, inspect element, etc.) in production builds.
// Custom context menus (antd Dropdown with trigger={['contextMenu']}) are unaffected
// since they use React synthetic events, not the browser's native context menu.
if (import.meta.env.PROD) {
  document.addEventListener('contextmenu', (e) => e.preventDefault());
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppRoot />
  </React.StrictMode>,
);
