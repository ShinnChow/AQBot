import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoot from './App';
import './index.css';

// Probe whether ::-webkit-scrollbar custom rendering actually works.
// On macOS, WKWebView compiled against older SDKs may recognise the pseudo-
// element (blocking standard scrollbar-color) without rendering it correctly,
// producing a solid-black native scrollbar.  The probe creates an off-screen
// scrollable div, applies a custom scrollbar width via a scoped stylesheet,
// and checks whether the layout width changes.  If it does, the custom
// scrollbar pipeline is functional and we enable the ::-webkit-scrollbar rules
// in index.css by adding the `webkit-scrollbar-ok` class to <html>.
(() => {
  const outer = document.createElement('div');
  Object.assign(outer.style, {
    position: 'fixed',
    top: '-9999px',
    left: '-9999px',
    width: '100px',
    height: '100px',
    overflow: 'scroll',
    visibility: 'hidden',
  });
  const inner = document.createElement('div');
  inner.style.height = '200px';
  outer.appendChild(inner);
  document.documentElement.appendChild(outer);

  const defaultWidth = outer.offsetWidth - outer.clientWidth;

  const style = document.createElement('style');
  style.textContent = '#__scrollbar_probe::-webkit-scrollbar { width: 1px !important; }';
  document.head.appendChild(style);
  outer.id = '__scrollbar_probe';
  // Force re-layout after stylesheet injection
  void outer.offsetWidth;
  const customWidth = outer.offsetWidth - outer.clientWidth;

  outer.remove();
  style.remove();

  if (customWidth !== defaultWidth) {
    document.documentElement.classList.add('webkit-scrollbar-ok');
  }
})();

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
