import {useState} from 'react';

import viteLogo from '/vite.svg';
import './App.css';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>Vite + React + Eslint + Husky</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          You app in <code>src/App.jsx</code> enjoy hacking
        </p>
        <p>This template read for deploy your app on Vercel</p>
      </div>
    </>
  );
}
