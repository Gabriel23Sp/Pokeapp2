'use client'
import React, { useEffect, useState } from 'react'

export function PokemonSelector({ selectedPokemon, onSelectPokemon }) {
    const [pokemonList, setPokemonList] = useState([]);
  
    useEffect(() => {
      const fetchPokemonList = async () => {
        try {
          const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
          const data = await response.json();
          setPokemonList(data.results);
        } catch (error) {
          console.error("Error fetching Pokémon list:", error);
        }
      };
      fetchPokemonList();
    }, []);
  
    return (
      <select
        value={selectedPokemon}
        onChange={(e) => onSelectPokemon(e.target.value)}
        className="w-full mb-1 p-1 border rounded"
      >
        <option value="">Selecciona un Pokémon</option>
        {pokemonList.map((pokemon, index) => (
          <option key={index} value={pokemon.name}>
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </option>
        ))}
      </select>
    );
  }
