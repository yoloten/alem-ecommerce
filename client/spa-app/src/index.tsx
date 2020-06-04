import * as ReactDOM from "react-dom"
import * as UI from "../../common-components/src/"
import React from "react"

function Name() {
    const inputa = (e: React.ChangeEvent<HTMLInputElement>) => console.log(e.target.value)

    return (
        <div>
            <UI.Input
                onChange={inputa}
                width={100}
                name="lol"
                id="1"
                borderRadius="3px"
                bgColor="#fff"
                border={true}
                type="text"
            />
            <UI.Dropdown width={200} name="lol" id="1" options={[{ value: "label", label: "label" }]} />
            <UI.Checkbox />
        </div>
    )
}

const root = (
    <div>
        <UI.Button content="lol" />
        <Name />
    </div>
)

ReactDOM.render(root, document.getElementById("root"))
