import { Range, getTrackBackground } from "react-range"
import React, { useState, useEffect } from "react"

const STEP = 1
const MIN = 0
const MAX = 2500

function TwoThumbs({ values, onChange, windowWidth, currency, min, max }: any) {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                width: windowWidth < 1370 ? "180px" : "270px",
                marginBottom: "20px",
                marginLeft: "20px",
            }}
        >
            <output
                style={{
                    marginTop: "20px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                }}
                id="output"
            >
                <div
                    style={{
                        height: "27px",
                        paddingLeft: "10px",
                        paddingRight: "10px",
                        display: "flex",
                        alignItems: "center",
                        borderRadius: "3px",
                        justifyContent: "center",
                    }}
                >
                    {currency ? values[0] + " " + currency : values[0]}
                </div>
                <div
                    style={{
                        height: "25px",
                        display: "flex",
                        alignItems: "center",
                        paddingLeft: "10px",
                        paddingRight: "10px",
                        borderRadius: "3px",
                        justifyContent: "center",
                    }}
                >
                    {currency ? values[1] + " " + currency : values[1]}
                </div>
            </output>
            <Range
                values={values}
                step={STEP}
                min={min ? min : MIN}
                max={max ? max : MAX}
                onChange={onChange}
                renderTrack={({ props, children }) => (
                    <div
                        onMouseDown={props.onMouseDown}
                        onTouchStart={props.onTouchStart}
                        style={{
                            ...props.style,
                            height: "36px",
                            display: "flex",
                            width: windowWidth < 1370 ? "120px" : "220px",
                        }}
                    >
                        <div
                            ref={props.ref}
                            style={{
                                height: "3px",
                                width: "100%",
                                borderRadius: "4px",
                                background: getTrackBackground({
                                    values,
                                    colors: ["#d9d9d9", "#000", "#d9d9d9"],
                                    min: min ? min : MIN,
                                    max: max ? max : MAX,
                                }),
                                alignSelf: "center",
                            }}
                        >
                            {children}
                        </div>
                    </div>
                )}
                renderThumb={({ props, isDragged }) => (
                    <div
                        {...props}
                        style={{
                            ...props.style,
                            height: "10px",
                            width: "10px",
                            borderRadius: "100px",
                            backgroundColor: "#FFF",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            border: "2px solid #000",
                        }}
                    ></div>
                )}
            />
        </div>
    )
}

export default TwoThumbs
