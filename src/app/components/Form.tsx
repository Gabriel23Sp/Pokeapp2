import React, { useState } from 'react'
import { Pokemons } from './Pokemons';

export const Form = ({}) => {
  const [phone, setPhone] = useState("");
  const[nick,setNick]=useState('')
  const[pass,setPass]=useState('')
  const[error,setError]=useState<boolean>(false)

   const handlesubmit = (e:any)=>{
     e.preventDefault()
     if(nick==''|| pass=='') {
       setError(true)
       return
     }
     setError(false)
   }

  function validarNumero(input:any) {
    input.value = input.value.replace(/\D/g, '').slice(0, 9);
}
const handleChange = (e:any) => {
  let value = e.target.value.replace(/\D/g, ""); 
  value = value.slice(0, 9); 
  setPhone(value);
};
  return (
    <form className=''>
        <fieldset>
            <label>Enter Your First Name: 
              <input name="First_Name" type="text"  />
            </label>
            <label>Enter Your Last Name: 
              <input name="Last_Name" type="text"  />
            </label>
            <label>Enter Input your age (years): 
              <input name="age" type="number"  />
            </label>
            <label>Enter Your Phone Number: 
              <input  type="text" maxLength={9} pattern="\d{9}" placeholder="Ingresa tu teléfono" value={phone} onChange={handleChange}/>
            </label>
            <label>Enter Your Email: 
              <input  name="first-name" type="text"  />
            </label>
        </fieldset>
        <fieldset>
        <label>Enter Your Nickname: 
              <input name="Nickname" type="text" onChange={e =>setNick(e.target.value)}/>
            </label>
            <label>Enter Your Password: 
              <input  name="first-name" type="password" pattern="[a-z0-5]{8,}"  onChange={e =>setPass(e.target.value)}/>
            </label>
        <Pokemons/>
        </fieldset>
        <div className='flex gap-2'>
        <input className='cursor-pointer rounded-md bg-green-600 hover:bg-green-900   ease-out duration-300' type="submit" value="Sing up" />
        <input className='cursor-pointer rounded-md bg-blue-600 hover:bg-blue-900  ease-out duration-300' type="submit" value="Sing In" />
        </div>
    </form> 
  )
}