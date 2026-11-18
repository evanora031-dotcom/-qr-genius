import React from 'react';
import {createRoot} from 'react-dom/client';
import {Screen} from './Screen';
import {isLang} from './model';
import './style.css';
const root=createRoot(document.getElementById('root')!);
function render(){
  const locale=location.pathname.split('/')[1];
  const browser=navigator.language.split('-')[0];
  const lang=location.hash?browser:locale;
  root.render(<Screen key={location.hash} hash={location.hash} initialLang={isLang(lang)?lang:'en'}/>);
}
render();
window.addEventListener('hashchange',render);
