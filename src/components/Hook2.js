import React, { useEffect, useState } from 'react'

export default function Hook2() {
    const [count,setCount] = useState(10)
    useEffect(() => {
        const timer = setInterval(()=>{
            setCount((preState) => preState - 1)
            console.log("a")
        },1000);
        return () => {
            clearInterval(timer)
        }
    }, [])
  return (
    <div>
        <h1>{count}</h1>
    </div>
  )
}
