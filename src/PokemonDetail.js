import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import './App.css'

const PokemonDetail = () => {
    const { id } = useParams();
    const [state, setState] = useState({pokemonData: null});

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((response) => {
            setState((prevState) => {
                return { ...prevState, pokemonData: response.data};
            });
        })
    }, [id]);

    if(!state.pokemonData) {
        return <div>Loading ...</div>
    }

  return (
    <div className='pokemon-detail'>
        <h1>{state.pokemonData.name.toUpperCase()}</h1>
        <img src={state.pokemonData.sprites.front_default} alt={state.pokemonData.name}/>
        <ul>
            {state.pokemonData.types.map((type) => (
                <li key={type.type.name}>{type.type.name.toUpperCase()}</li>
            ))}
        </ul>
        <button><a href='/'>Back</a></button>
    </div>
    )
}

export default PokemonDetail

