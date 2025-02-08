import React, { useState, useEffect } from "react";
import { PokemonSelector } from "./Pokemons";

export default function UserProfile({ user, users, setUsers, setLoggedInUser }) {
  const [pokemonImage, setPokemonImage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (user.pokemon) {
      const fetchPokemonImage = async () => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${user.pokemon}`);
        const data = await response.json();
        setPokemonImage(data.sprites.other["official-artwork"].front_default);
      };
      fetchPokemonImage();
    }
  }, [user.pokemon]);

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  const handleUpdateUser = (index, field, value) => {
    const updatedUsers = [...users];
    updatedUsers[index][field] = value;
    setUsers(updatedUsers);
  };

  const saveChanges = () => {
    console.log("Usuarios actualizados:", users);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center p-6 bg-white rounded-xl shadow-md w-[50%]">
      <div className="w-full md:w-1/3 p-4 border rounded-xl bg-gray-100 text-black h-full">
        <h2 className="text-xl font-bold mb-4">Perfil del Usuario</h2>
        <p><strong>Nombre:</strong> {user.nombre}</p>
        <p><strong>Nickname:</strong> {user.nickname}</p>
        <p><strong>Correo:</strong> {user.correo}</p>
        <p><strong>Pokémon Favorito:</strong> {user.pokemon || "No seleccionado"}</p>
        {pokemonImage && <img src={pokemonImage} alt={user.pokemon} className="w-32 h-32 mt-2" />}
        <button className="mt-4 bg-red-500 text-white p-2 rounded" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>

      <div className="w-full md:w-2/3 p-4 border rounded-xl bg-gray-100 overflow-y-auto max-h-96 h-full">
        <h3 className="text-lg font-bold mb-4">Modificar Usuarios</h3>
        {users.map((u, index) => (
          <div key={index} className="mb-4 border p-2 rounded">
            <input
              type="text"
              value={u.nombre}
              onChange={(e) => handleUpdateUser(index, "nombre", e.target.value)}
              className="w-full mb-1 p-2 border rounded"
            />
            <input
              type="text"
              value={u.nickname}
              onChange={(e) => handleUpdateUser(index, "nickname", e.target.value)}
              className="w-full mb-1 p-2 border rounded"
            />
            <input
              type="text"
              value={u.correo}
              onChange={(e) => handleUpdateUser(index, "correo", e.target.value)}
              className="w-full mb-1 p-2 border rounded"
            />
            <input
              type="password"
              value={u.password}
              onChange={(e) => handleUpdateUser(index, "password", e.target.value)}
              className="w-full mb-1 p-2 border rounded"
            />
            <PokemonSelector
              selectedPokemon={u.pokemon}
              onSelectPokemon={(value) => handleUpdateUser(index, "pokemon", value)}
            />
          </div>
        ))}
        <button className="w-full bg-green-500 text-white p-2 rounded mt-2" onClick={saveChanges}>
          Guardar Cambios
        </button>
        {showMessage && <p className="text-green-500 mt-2">Cambios guardados exitosamente.</p>}
      </div>
    </div>
  );
}