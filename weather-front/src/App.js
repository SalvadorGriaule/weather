import logo from './logo.svg';
import DisplayGeoLoc  from './asset/Componants/geolocalisation';
import './App.css';

function App() {
  

  return (
    <div className="App">
      <header>
        <h1>Weather App</h1>
      </header>
      <main>
        <section>
          <DisplayGeoLoc />
        </section>
      </main>
    </div>

  );
}

export default App;
