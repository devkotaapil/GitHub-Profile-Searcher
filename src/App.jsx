import {motion} from 'motion/react'
import { useEffect, useState } from 'react';
import axios from "axios";

function App(){
  const [search,setSearch] = useState('');
  const [res, setRes] = useState(null);

  
  
  const handleSubmit = async() =>{
    try{
      const response = await axios.get(`https://api.github.com/users/${search}`);
      setRes(response.data);
    }
    catch(error){
      console.log(`Couldn't render the server`,error.message);
    }
  };


  return(
    <div className="flex h-screen w-full justify-center items-center">
      <div  className="border border-indigo-600 p-10 bg-indigo-400 rounded-lg shadow-lg shadow-blue-400">
        <h1 className='text-center text-2xl text-white'>Search GitHub Profile</h1>
        <input type="text" 
        value={search}
        onChange={(e)=> setSearch(e.target.value)} 
        className="border w-full mt-2 border-3 border-white text-center text-white " autoFocus/>
        <motion.button
        onClick={handleSubmit}
        whileHover={{scale:1.1}}
        whileTap={{scale:0.9}}
        className='block px-3 py-2 bg-indigo-600 text-white hover:cursor-pointer font-semibold rounded-lg shadow-lg mx-auto mt-5'
        >Search</motion.button>

        {res && 
           <div className='grid grid-cols-2 mt-2 p-2'>
          <img src={res.avatar_url} alt={res.login}  className='w-40 h-40 '/>
          <div className='text-white font-serif'>
          <h3 className='ml-5 underline'>Username:</h3>
          <h3 className='ml-5'> {res.name}</h3>
          <p className='ml-5 mt-5 underline'>Bio:</p>
          <p className='ml-5'>{res.bio}</p>
          </div>
          
        </div>
        }
     
      </div>
    </div>
  )
}

export default App;