import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react"

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [iscopy, setIsCopy] = useState(false);

  const passwordGenerator = useCallback(() => {
      let str = 'abcdefghijkklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVEWXYZ';
      let pass = '';

      if(numberAllowed) str += '1234567890';
      if(charAllowed) str += '~!@#$%^&*(){}<>[]';

      for (let i = 1; i < length; i++) {
        let random = Math.floor(Math.random() * str.length +  1);
        pass += str.charAt(random);
      };
      setPassword(pass);
  },[charAllowed,numberAllowed,length,setPassword]);

  useEffect(() => {
    passwordGenerator();
  },[charAllowed,numberAllowed,length,]);

  const copyToClipBoard = useCallback(() => {
    window.navigator.clipboard.writeText(password);
      setIsCopy(true);

      setTimeout(() => {
        setIsCopy(false);
      }, 1000);
  }, [password]);

  return (
    <>
      <div className="h-screen w-screen bg-slate-800 flex items-center justify-center">
        <div className="bg-slate-700 p-2 rounded-lg w-1/2">
          <h2 className="text-4xl font-bold text-white text-center">Password Generator</h2>
          <div className="flex justify-center mt-5">
            <input
              type="text"
              placeholder="Password"
              className="rounded-tl-full rounded-bl-full p-2 w-8/12 pl-4 outline-none"
              value={password}
            />
            <button className="text-white bg-blue-600 rounded-tr-full rounded-br-full font-bold px-4" onClick={copyToClipBoard}>Copy</button>
          </div>
          <div className="flex items-center justify-center mt-5 gap-10">
            <div className="flex gap-3">
              <input
                type="range"
                min={8}
                max={30}
                value={length}
                onChange={(e) => setLength(e.target.value)}
              />
              <p className="text-white text-md">Length :{length}</p>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="Number"
                className="size-4"
                defaultChecked={numberAllowed}
                onChange={() => setNumberAllowed((prev) => !prev)} />
              <label
                htmlFor="Number"
                className="text-md text-white ml-1 mr-4"
              >
                Number
              </label>
              <input 
                type="checkbox" 
                id="Char" 
                className="size-4" 
                defaultChecked={charAllowed}
                onChange={() => setCharAllowed((prev) => !prev)}
              /> 
              <label 
                htmlFor="Char" 
                className="text-md text-white ml-1" >
                  Character
              </label>
            </div>
          </div>
        </div>
        {iscopy ? 
        <p 
          className="absolute 
                    top-10 
                    right-0
                    duration-500
                  text-black 
                    p-2 
                    rounded-lg 
                    bg-white">
            Copied ✔
        </p> : 
          ''
        }
      </div>
    </>
  )
}

export default App
