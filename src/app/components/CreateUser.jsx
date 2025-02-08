import React, { useState } from 'react';

const POKEMON_LIST = ["Pikachu", "Charmander", "Bulbasaur", "Squirtle", "Eevee"];

export default function CreatedUser({ users, setUsers, setCreatingUser }) {
  const [newUser, setNewUser] = useState({
    nombre: "",
    nickname: "",
    correo: "",
    telefono: "",
    fechaNacimiento: "",
    pokemon: "",
    password: "",
  });

  const handleCreateUser = () => {
    if (
      !newUser.nombre ||
      !newUser.nickname ||
      !newUser.correo ||
      !newUser.telefono ||
      !newUser.fechaNacimiento ||
      !newUser.password
    ) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setCreatingUser(false);
    alert("Usuario creado exitosamente");
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Crear Usuario</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={newUser.nombre}
        onChange={(e) => setNewUser({ ...newUser, nombre: e.target.value })}
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="text"
        placeholder="Nickname"
        value={newUser.nickname}
        onChange={(e) => setNewUser({ ...newUser, nickname: e.target.value })}
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="email"
        placeholder="Correo"
        value={newUser.correo}
        onChange={(e) => setNewUser({ ...newUser, correo: e.target.value })}
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="text"
        placeholder="Teléfono"
        value={newUser.telefono}
        onChange={(e) => setNewUser({ ...newUser, telefono: e.target.value })}
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="date"
        value={newUser.fechaNacimiento}
        onChange={(e) =>
          setNewUser({ ...newUser, fechaNacimiento: e.target.value })
        }
        className="w-full p-2 border rounded mb-2"
      />
      <select
        value={newUser.pokemon}
        onChange={(e) => setNewUser({ ...newUser, pokemon: e.target.value })}
        className="w-full p-2 border rounded mb-2"
      >
        <option value="">Selecciona un Pokémon</option>
        {POKEMON_LIST.map((pokemon) => (
          <option key={pokemon} value={pokemon}>
            {pokemon}
          </option>
        ))}
      </select>
      <input
        type="password"
        placeholder="Contraseña"
        value={newUser.password}
        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        className="w-full p-2 border rounded mb-2"
      />
      <button
        className="w-full bg-green-500 text-white p-2 rounded mb-2"
        onClick={handleCreateUser}
      >
        Registrar
      </button>
      <button
        className="w-full bg-gray-500 text-white p-2 rounded"
        onClick={() => setCreatingUser(false)}
      >
        Cancelar
      </button>
    </div>
  );
}