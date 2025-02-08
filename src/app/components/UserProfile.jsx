'use client'
import React, { useState, useEffect } from "react";
import { PokemonSelector } from "./Pokemons";

export default function  UserProfile({ user, users, setUsers, setLoggedInUser }) {
  const [pokemonImage, setPokemonImage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUser, setFilteredUser] = useState(null);

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

  const handleSearch = () => {
    const foundUser = users.find((u) => u.nickname.toLowerCase() === searchTerm.toLowerCase());
    setFilteredUser(foundUser || null);
  };

  const handleDeleteUser = () => {
    if (filteredUser) {
      setUsers(users.filter((u) => u.nickname !== filteredUser.nickname));
      setFilteredUser(null);
    }
  };
  return (
    <div className="flex flex-col md:flex-row justify-between items-center p-6 bg-white rounded-xl shadow-md w-[80%] max-md:w-3/4 ">
      <div className="w-full md:w-1/2 p-4 border rounded-xl bg-gray-100 text-black h-full">
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

      <div className="w-full md:w-2/3 p-4 border rounded-xl bg-gray-100 overflow-y-auto max-h-96">
        <h3 className="text-lg font-bold mb-4">Modificar Usuarios</h3>
        <input
          type="text"
          placeholder="Buscar usuario por nickname"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <button className="w-full bg-blue-500 text-white p-2 rounded mb-2" onClick={handleSearch}>
          Buscar Usuario
        </button>
        {filteredUser && (
          <div className="mb-4 border p-2 rounded">
            <input type="text" value={filteredUser.nombre} onChange={(e) => handleUpdateUser(users.indexOf(filteredUser), "nombre", e.target.value)} className="w-full mb-1 p-2 border rounded" />
            <input type="text" value={filteredUser.apellido} onChange={(e) => handleUpdateUser(users.indexOf(filteredUser), "apellido", e.target.value)} className="w-full mb-1 p-2 border rounded" />
            <input type="text" value={filteredUser.nickname} onChange={(e) => handleUpdateUser(users.indexOf(filteredUser), "nickname", e.target.value)} className="w-full mb-1 p-2 border rounded" />
            <input type="email" value={filteredUser.correo} onChange={(e) => handleUpdateUser(users.indexOf(filteredUser), "correo", e.target.value)} className="w-full mb-1 p-2 border rounded" />
            <input type="text" value={filteredUser.telefono} onChange={(e) => handleUpdateUser(users.indexOf(filteredUser), "telefono", e.target.value)} className="w-full mb-1 p-2 border rounded" />
            <input type="date" value={filteredUser.fechaNacimiento} onChange={(e) => handleUpdateUser(users.indexOf(filteredUser), "fechaNacimiento", e.target.value)} className="w-full mb-1 p-2 border rounded" />
            <PokemonSelector selectedPokemon={filteredUser.pokemon} onSelectPokemon={(value) => handleUpdateUser(users.indexOf(filteredUser), "pokemon", value)} />
            <button className="w-full bg-red-500 text-white p-2 rounded mt-2" onClick={handleDeleteUser}>
              Eliminar Usuario
            </button>
          </div>
        )}
        <button className="w-full bg-green-500 text-white p-2 rounded mt-2" onClick={saveChanges}>
          Guardar Cambios
        </button>
        {showMessage && <p className="text-green-500 mt-2">Cambios guardados exitosamente.</p>}
      </div>
    </div>
  );
}