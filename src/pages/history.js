import Test1 from "../component/test1"
import Test2 from "../component/test2"
import React, { useCallback, useState } from "react"

const History = function () {
    const [numb, setNumb] = useState(1)
    const [count, setCount] = useState(100)

    const clickToAdd = function () {
        var newNumb = numb + 1
        setNumb(newNumb)
    }

    const clickToDecrease = function () {
        var newCount = count - 1
        setCount(newCount)
    }

    const displayAlert = useCallback(() => {
        console.log("display")
    }, [])

    return (
        <div>
            This is history
            <button onClick={clickToAdd}>Click me {numb}</button>
            <Test1 display={displayAlert}></Test1>
            <Test2></Test2>
        </div>
    )
}

export default History