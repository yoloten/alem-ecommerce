import * as Icons from "../../public/icons/_compiled"
import React, { useRef } from "react"

export default function Input(props: any) {
    const inputEl: any = useRef(null)

    const countUp = () => inputEl.current.stepUp()

    const countDown = () => inputEl.current.stepDown()

    return (
        <>
            <div className={props.className}>
                <input
                    className={props.className}
                    id={props.id}
                    name={props.name}
                    ref={inputEl}
                    type={props.type}
                    onChange={props.onChange}
                />
                <div className="arrow">
                    <div className="dropdown-text">
                        <div className="placeholder">{props.placeholder}</div>
                        <div className="val">{props.value}</div>
                    </div>
                    {props.type === "number"
                        ? <div className="buttons">
                            <div className="btn" onClick={countUp}>
                                <Icons.ArrowUp />
                            </div>
                            <div className="btn" onClick={countDown}>
                                <Icons.ArrowDown />
                            </div>
                        </div>
                        : ""
                    }
                </div>
            </div>
            <style jsx>{`
                .dropdown-text {
                    height: 100%;  
                }
                .placeholder {
                    font-size: 11px;
                    color: rgba(0, 0, 0, 0.6);
                    margin-top: 3px;
                    margin-bottom: 5px
                }
                
                .buttons{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    cursor: pointer;
                    justify-content: space-between;
                }
                input{
                    width: ${props.type === "number" ? parseInt(props.width, 10) - 20 : props.width}px;
                    height: ${props.height ? props.height + "px" : "45px"};
                    border-radius: ${props.borderRadius ? props.borderRadius : "50px"};
                    background: transparent;
                    border: none;
                    opacity: 1;
                    appearance: none;
                    outline: none;
                    position: absolute;
                    padding-left: 20px;
                    padding-top: 8px
                }
                input[type="number"] {
                    -webkit-appearance: textfield;
                       -moz-appearance: textfield;
                            appearance: textfield;
                }
                input[type=number]::-webkit-inner-spin-button, 
                input[type=number]::-webkit-outer-spin-button { 
                    -webkit-appearance: none;
                }
                .arrow{
                    width: ${props.type === "number" ? props.width : parseInt(props.width, 10) - 10}px;
                    height: ${props.height ? parseInt(props.height, 10) + 9 + "px" : "45px"};
                    border: ${props.border ? "1px solid #f1f1f1" : "none"};
                    border-radius: ${props.borderRadius ? props.borderRadius : "50px"};
                    background: ${props.bgColor ? props.bgColor : "#fff"};
                    padding-left: 20px;
                    padding-right: 20px;
                    z-index: -1;
                    outline: none;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 14px;
                }
                .icon{
                    margin-top: -2px
                }
            `}</style>
        </>
    )
}
