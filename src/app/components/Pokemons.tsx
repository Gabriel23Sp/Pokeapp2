'use client'
import React, { useEffect, useState } from 'react'

export const Pokemons = () => {
    const [name, setName]=useState<any>([])

    useEffect(()=>{
        const getName=async()=>{
            const response = await fetch('https://pokeapi.co/api/v2/pokemon/')
            const list=await response.json()
            const{ results }=list

            const pokemones=results.map(async(pokemon:any)=>{
                const response =await fetch(pokemon.url)
                const  Pokemons =await response.json()

                return{
                    id:Pokemons.id,
                    name:Pokemons.name,
                    img:Pokemons.sprites.other.dream_world.font_default
                }
            })
            setName(await Promise.all(pokemones))
        }
        getName()
    },[])
    return (
    <select>
        <option value="">hola</option>
        {
        name.map( (item:any,index:any) => <option key={index} value={item.id}>{item.name}</option>)
        }
    </select>
  )
}
