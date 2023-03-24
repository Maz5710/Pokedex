import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Pokedex from './Pokedex';
import PokemonDetail from './PokemonDetail';

function App() {
  return (
    <>
    <HashRouter>
      <Routes>
        <Route exact path="/" element={<Pokedex />} /> 
        <Route path= "/pokemon/:id" element={<PokemonDetail />} />

      </Routes>

    </HashRouter>
    </>
  );
}

export default App;
