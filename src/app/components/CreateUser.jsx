import React, { useState } from 'react';
import {PokemonSelector} from '../components/Pokemons'



export default function CreateUser({ users, setUsers, setCreatingUser }) {
  const [newUser, setNewUser] = useState({
    nombre: "",
    nickname: "",
    correo: "",
    telefono: "",
    fechaNacimiento: "",
    pokemon: "",
    password: ""
  });

  const handleCreateUser = () => {
    if (!newUser.nombre || !newUser.nickname || !newUser.correo || !newUser.telefono || !newUser.fechaNacimiento || !newUser.pokemon || !newUser.password) {
      alert("Todos los campos son obligatorios");
      return;
    }
    
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setCreatingUser(false);
    alert("Usuario creado exitosamente");
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4">Crear Usuario</h2>
      <input type="text" placeholder="Nombre" value={newUser.nombre} onChange={(e) => setNewUser({ ...newUser, nombre: e.target.value })} className="w-full mb-2 p-2 border rounded" />
      <input type="text" placeholder="Nickname" value={newUser.nickname} onChange={(e) => setNewUser({ ...newUser, nickname: e.target.value })} className="w-full mb-2 p-2 border rounded" />
      <input type="email" placeholder="Correo" value={newUser.correo} onChange={(e) => setNewUser({ ...newUser, correo: e.target.value })} className="w-full mb-2 p-2 border rounded" />
      <input type="text" placeholder="Teléfono" value={newUser.telefono} onChange={(e) => setNewUser({ ...newUser, telefono: e.target.value })} className="w-full mb-2 p-2 border rounded" />
      <input type="date" placeholder="Fecha de Nacimiento" value={newUser.fechaNacimiento} onChange={(e) => setNewUser({ ...newUser, fechaNacimiento: e.target.value })} className="w-full mb-2 p-2 border rounded" />
      <PokemonSelector selectedPokemon={newUser.pokemon} onSelectPokemon={(value) => setNewUser({ ...newUser, pokemon: value })} />
      <input type="password" placeholder="Contraseña" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} className="w-full mb-2 p-2 border rounded" />
      <button className="w-full bg-green-500 text-white p-2 rounded" onClick={handleCreateUser}>Registrar</button>
      <button className="w-full bg-gray-500 text-white p-2 rounded mt-2" onClick={() => setCreatingUser(false)}>Cancelar</button>
    </div>
  );
}