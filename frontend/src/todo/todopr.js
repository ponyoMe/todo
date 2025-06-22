import { useState, useEffect, useRef, useMemo } from "react";

export default function Practice(){
    const arr = ["a", "b", "c", "d", "e"]
    const [running, setRunning] = useState(true)

    const intervalRef = useRef(null)
    const count = useRef(0)

    function handleClick(){
        count.current++
        console.log(`You clicked button ${count.current} times`)
    }

    useEffect(()=>{
        if(running){
            intervalRef.current = setInterval(()=>{
                console.log("running")
            },1000)

        }
        return()=>{
           clearInterval(intervalRef.current)
           console.log("clearing")
        } 
    },[running])

    const calculation = (num)=>{
        let result = 0
        for(let i =0; i<1000000; i++){
             result +=num
        }
        return result
    }

    const res = useMemo(()=>calculation(23), [23])
    const smth = ()=> alert("Hello from parent")

    return(<div className="flex flex-col justify-center items-center h-screen">
           <ul>
            {arr.map((el)=>(
                <li key={el}>{el}</li>
            ))}
           </ul>
           <button onClick={()=>setRunning(false)}>Stop button</button>
           <button onClick={handleClick}>click me</button>

           <p>result of memo: {res}</p>
           <Child onClick={smth} />
    </div>)
}

export function Child({onClick}){
    return(<button onClick={onClick}>Call parent
        
    </button>)

}