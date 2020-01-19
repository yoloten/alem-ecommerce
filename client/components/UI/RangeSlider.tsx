import { Range, getTrackBackground } from "react-range"
import React, { useState } from "react"

const STEP = 1
const MIN = 0
const MAX = 500

class TwoThumbs extends React.Component {
    state = {
        values: [0, 500]
    }

    render() {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    width: '300px',
                    marginBottom: "20px"
                }}
            >
                <output
                    style={{
                        marginTop: '20px',
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between"
                    }}
                    id="output"
                >
                    <div
                        style={{
                            background: "#d9d9d9",
                            height: "25px",
                            paddingLeft: "10px",
                            paddingRight: "10px",
                            display: "flex",
                            alignItems: "center",
                            borderRadius: "3px",
                            justifyContent: "center",
                        }}
                    >
                        {this.state.values[0] + " USD"}
                    </div>
                    <div
                        style={{
                            background: "#d9d9d9",
                            height: "25px",
                            display: "flex",
                            alignItems: "center",
                            paddingLeft: "10px",
                            paddingRight: "10px",
                            borderRadius: "3px",
                            justifyContent: "center",
                        }}
                    >
                        {this.state.values[1] + " USD"}
                    </div>
                </output>
                <Range
                    values={this.state.values}
                    step={STEP}
                    min={MIN}
                    max={MAX}
                    onChange={values => {
                        this.setState({ values })
                    }}
                    renderTrack={({ props, children }) => (
                        <div
                            onMouseDown={props.onMouseDown}
                            onTouchStart={props.onTouchStart}
                            style={{
                                ...props.style,
                                height: '36px',
                                display: 'flex',
                                width: '250px'
                            }}
                        >
                            <div
                                ref={props.ref}
                                style={{
                                    height: '3px',
                                    width: '100%',
                                    borderRadius: '4px',
                                    background: getTrackBackground({
                                        values: this.state.values,
                                        colors: ['#d9d9d9', '#000', '#d9d9d9'],
                                        min: MIN,
                                        max: MAX
                                    }),
                                    alignSelf: 'center'
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
                                height: '22px',
                                width: '22px',
                                borderRadius: '100px',
                                backgroundColor: '#FFF',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                border: "2px solid #000"
                            }}
                        >

                        </div>
                    )}
                />

            </div>
        )
    }
}

export default TwoThumbs