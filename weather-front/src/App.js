import DisplayGeoLoc from './asset/Componants/geolocalisation';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000')
    .then(response => response.text())
    .then(data => setMessage(data));
  })

  return (
    <div className="App">
      <header>
        <h1>Weather App</h1>
      </header>
      <main>
        <section>
          <DisplayGeoLoc />
        </section>
        <section>
        <p>{message}</p>
        </section>
      </main>
    </div>

  );
}

export default App;
