import DisplayGeoLoc from './asset/Componants/geolocalisation';
import DisplayHistory from './asset/Componants/history';
import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  function pageSet(name) {
    let pageAll = document.querySelectorAll(".page")

    pageAll.forEach((elem) => {
      name != elem.id ? elem.classList.add("hidden") : elem.classList.remove("hidden") 
    })
  }

  return (
    <div className="App px-2">
      <header className='flex justify-between items-center'>
        <h1 className='text-3xl font-bold'>Weather App</h1>
        <nav>
          <ul className='flex space-x-2 items-center'>
            <li onClick={() => pageSet("home")}>Météo actuelle</li>
            <li onClick={() => pageSet("history")}>Historique</li>
          </ul>
        </nav>
      </header>
      <main className='flex justify-center text-center space-y-2 mt-2'>
        <section id='home' className='page'>
          <DisplayGeoLoc />
        </section>
        <section id='history' className='hidden page'>
            <DisplayHistory />
        </section>
      </main>
    </div>

  );
}

export default App;
