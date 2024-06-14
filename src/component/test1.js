import React from "react"

const Test1 = function (props) {
    const { displayAlert } = props
    console.log("this is test1")
    return (
        <div>
            <p>test1</p>
        </div>
    )
}

export default React.memo(Test1)