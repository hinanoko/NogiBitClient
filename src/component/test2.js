import React from "react"

const Test2 = function () {
    console.log("this is test2")
    return (
        <div>
            <p>test2</p>
        </div>
    )
}

export default React.memo(Test2)