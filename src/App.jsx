import { useCallback, useState, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [isNumber, setisNumber] = useState(false);
  const [isChar, setisChar] = useState(false);
  let [password, setPassword] = useState("")
  const passRef = useRef(null);

  const generatePass = useCallback(() => {
    let str = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
    if(isNumber) str += "1234567890";
    if(isChar) str += "!@#$%^&*()_+";
    let tempPass = "";
    for(let i = 1; i <= length; i++){
      const char = Math.floor(Math.random() * str.length);
      tempPass += str[char];
    }
    console.log("Password is: ", tempPass);
    setPassword(tempPass);
  }, [length, isNumber, isChar])
  
  useEffect(() => {
    generatePass();
  }, [setPassword, isNumber, isChar, length])
  


  return (
    <div className='bg-black text-white h-[100vh]'>
      <div className=' p-4 w-1/2 mx-auto'>
        <div className='mt-6 border-2 flex gap-4 p-4 flex-col justify-center items-center border-white rounded'>
          <h2 className='text-lg'>Password generator</h2>
          <div>
            <input type="text" placeholder='password' className='rounded-l-lg px-4 py-3 outline-none text-black' value={password} ref={passRef}/>
            <button onClick={(() => {
              console.log(passRef);
              passRef.current.select();
              navigator.clipboard.writeText(passRef.current.value);
            })
            } className='bg-blue-500 rounded-r-lg px-4 py-3'>Copy</button>
          </div>
          <div
          className='flex gap-3 justify-center items-center'>
            <div>
              <input type="range" 
              min="0"
              max="100"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              />
              <label htmlFor="">Length: {length}</label>
            </div>
             <div>
              <input type="checkbox" 
              onChange={
                () => setisNumber(prev => !prev)
              }
              />
              <label htmlFor="">Numbers</label>
             </div>
             <div>
              <input type="checkbox" onChange={
                () => setisChar(prev => !prev)
              }/>
              <label htmlFor="">Characters</label>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
