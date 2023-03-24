import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const Pokedex = () => {
    // Set state for pokemon data
    const [ pokemonData, setPokeomnData] = useState([]);
    // Set state for search
    const [searchTerm, setSearchTerm] = useState('');
    // Set States for pagination
    const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=20');
    const [nextPageUrl, setNextPageUrl] = useState('');
    const [prevPageUrl, setPrevPageUrl] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/pokemon?limit=20')
        .then((response) => {
            setPokeomnData(response.data.results);
        });
    }, [])

    // Set useEffect for our pagination
    useEffect(() => {
        setLoading(true);
        axios.get(currentPageUrl)
            .then((response) => {
                setLoading(false);
                setNextPageUrl(response.data.next);
                setPrevPageUrl(response.data.previous);
                setPokeomnData(response.data.results);
            });
        }, [currentPageUrl])

    // Handle serach change
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value)
    }

    // Filter the pokemon based on searchTerm
    const fileredPokemon = pokemonData.filter((pokemon) => {
        return pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    })

    // Pagination
    const goToNextPage = () => {
        setCurrentPageUrl(nextPageUrl);
    };

    const goToPrevPage = () => {
        setCurrentPageUrl(prevPageUrl);
    };

  return (
    <div className='pokedex'> 
        <h1>Pokedex</h1>
        <input type='text' value={searchTerm} onChange={handleSearchChange} />
        <ul>
            {fileredPokemon.map((pokemon) => (
                <li key={pokemon.name}>
                    <a href={`/#/pokemon/${pokemon.url.split('/')[6]}`}>
                        <li key={pokemon.name}>{pokemon.name.toUpperCase()} </li>
                    </a>
                    </li>                                    
             ))}
        </ul>
            <button onClick={goToPrevPage} disabled={!prevPageUrl}>Previous</button>
            <button onClick={goToNextPage} disable={!nextPageUrl}>Next</button>
    </div>
    );
}

export default Pokedex
