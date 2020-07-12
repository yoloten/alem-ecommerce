import * as Icons from "../../public/icons/_compiled"
import React from "react"

export default function Input(props: any) {
    return (
        <>
            <div className={props.className}>
                <input
                    required={props.required ? true : false}
                    className={props.className}
                    id={props.id}
                    name={props.name}
                    type={props.name === "minLength" || props.name === "maxLength" ? "number" : props.type}
                    onChange={props.onChange}
                    min={props.min ? props.min : undefined}
                    max={props.max ? props.max : undefined}
                    step={props.step ? props.step : undefined}
                    value={props.value}
                />
                <div className="arrow">
                    {props.icon && <div className="icon">{props.icon}</div>}
                    <div className="dropdown-text">
                        <div className="placeholder">
                            {props.placeholder && props.placeholder + `${props.required ? "*" : ""}`}
                        </div>
                    </div>
                    {/* {props.type === "number"
                        ? <div className="buttons">
                            <div className="btn" onClick={countUp}>
                                <Icons.ArrowUp />
                            </div>
                            <div className="btn" onClick={countDown}>
                                <Icons.ArrowDown />
                            </div>
                        </div>
                        : ""
                    } */}
                </div>
            </div>
            <style jsx>{`
                .icon {
                    margin-left: -20px;
                    align-self: center;
                    height: ${props.height ? props.height + "px" : "45px"};
                    display: flex;
                    align-items: center;
                    padding-top: 5px;
                }
                .dropdown-text {
                    height: 100%;
                }
                .placeholder {
                    font-size: 11px;
                    color: rgba(0, 0, 0, 0.6);
                    margin-top: 3px;
                    margin-bottom: 5px;
                }
                .buttons {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    cursor: pointer;
                    justify-content: space-between;
                }
                input:required {
                    box-shadow: none;
                }

                input {
                    width: ${props.width}px;
                    height: ${props.height ? props.height + "px" : "45px"};
                    border-radius: ${props.borderRadius ? props.borderRadius : "50px"};
                    background: transparent;
                    border: none;
                    opacity: 1;
                    appearance: none;
                    outline: none;
                    padding-left: 25px;
                    padding-top: 8px;
                }

                .arrow {
                    width: ${props.type === "number" ? props.width : parseInt(props.width, 10) - 10}px;
                    height: ${props.height ? parseInt(props.height, 10) + 9 + "px" : "45px"};
                    margin-top: -${props.height ? parseInt(props.height, 10) + 9 + "px" : "45px"};
                    border: ${props.border ? `1px solid ${props.borderColor ? props.borderColor : "#f1f1f1"}` : "none"};
                    border-radius: ${props.borderRadius ? props.borderRadius : "50px"};
                    background: ${props.bgColor ? props.bgColor : "#fff"};
                    padding-left: 25px;
                    padding-right: 20px;
                    z-index: -1;
                    outline: none;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 14px;
                }
                .icon {
                    margin-top: -2px;
                }
            `}</style>
        </>
    )
}
