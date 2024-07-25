import React, { useEffect, useState } from 'react'

export default function Hook1() {
    const [count,setCount] = useState(1)
    const [number, setNumber] = useState(1)
    useEffect(()=>{
        console.log("Side effect")
    },[count,number])
    console.log("Render hook1")
  return (
    <div>
        <h1>Tìm hiểu Effect</h1>
        <p>Count: {count}</p>
        <button onClick={()=>setCount(count+1)}>Count up</button>
        <p>Number: {number}</p>
        <button onClick={()=>setNumber(number+1)}>Number up</button>
    </div>
  )
}
