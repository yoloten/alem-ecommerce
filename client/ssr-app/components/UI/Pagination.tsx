import React, { useState, useEffect } from "react"

import CardGrid from "./CardGrid"

export default function Pagination({ itemsPerPage, items, fromFilters, getLastIndex }: any): JSX.Element {
    const [currentPage, setCurrentPage] = useState(1)
    const [upperPageBound, setUpperPageBound] = useState(3)
    const [lowerPageBound, setLowerPageBound] = useState(0)
    const [pageBound, setPageBound] = useState(3)
    const [isPrevActive, setIsPrevActive] = useState(false)
    const [isNextActive, setIsNextActive] = useState(true)

    useEffect(() => {
        if (Math.ceil(items.length / itemsPerPage) > 0) {
            if (currentPage >= Math.ceil(items.length / itemsPerPage)) {
                setIsNextActive(false)
            }

            if (currentPage > 1) {
                setIsPrevActive(true)
            }

            if (currentPage < Math.ceil(items.length / itemsPerPage)) {
                setIsNextActive(true)
            }

            if (currentPage === 1) {
                setIsPrevActive(false)
            }
        }

        const indexOfLastTodo = currentPage * itemsPerPage

        if (currentPage + 1 === upperPageBound) {
            getLastIndex(items.length)
        }
    }, [currentPage, items])

    const handleClick = (e: any) => {
        setCurrentPage(parseInt(e.target.id, 10))
    }

    const increment = () => {
        setUpperPageBound(upperPageBound + pageBound)
        setLowerPageBound(lowerPageBound + pageBound)
        setCurrentPage(upperPageBound + 1)
    }

    const decrement = () => {
        setUpperPageBound(upperPageBound - pageBound)
        setLowerPageBound(lowerPageBound - pageBound)
        setCurrentPage(upperPageBound - pageBound)
    }

    const prev = () => {
        if ((currentPage - 1) % pageBound === 0) {
            setUpperPageBound(upperPageBound - pageBound)
            setLowerPageBound(lowerPageBound - pageBound)
        }

        setCurrentPage(currentPage - 1)
    }

    const next = () => {
        if (currentPage + 1 > upperPageBound) {
            setUpperPageBound(upperPageBound + pageBound)
            setLowerPageBound(lowerPageBound + pageBound)
        }

        setCurrentPage(currentPage + 1)
    }

    const renderItems = () => {
        const indexOfLastTodo = currentPage * itemsPerPage
        const indexOfFirstTodo = indexOfLastTodo - itemsPerPage
        const currentItems = items.slice(indexOfFirstTodo, indexOfLastTodo)

        return <CardGrid content={currentItems} fromFilters={fromFilters} />
    }

    const renderPageNumbers = () => {
        const pageNumbers = []
        for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i++) {
            pageNumbers.push(i)
        }

        return (
            <>
                {pageNumbers.map((number) => {
                    if (number === 1 && currentPage === 1) {
                        return (
                            <div
                                style={{
                                    marginRight: "3px",
                                    color: currentPage === number ? "red" : "#000",
                                }}
                                id={`${number}`}
                                onClick={handleClick}
                                key={number}
                            >
                                {number}
                            </div>
                        )
                    } else if (number < upperPageBound + 1 && number > lowerPageBound) {
                        return (
                            <div
                                className="number"
                                style={{
                                    marginRight: "3px",
                                    color: currentPage === number ? "red" : "#000",
                                }}
                                id={`${number}`}
                                onClick={handleClick}
                                key={number}
                            >
                                {number}
                            </div>
                        )
                    }
                })}
                {pageNumbers.length > upperPageBound ? (
                    <div className="decrement" onClick={increment}>
                        ...
                    </div>
                ) : (
                    ""
                )}
            </>
        )
    }

    return (
        <div>
            {renderItems()}
            <div className="page-numbers">
                <div className="prev" onClick={prev}>
                    {isPrevActive ? "Prev" : ""}
                </div>
                <div className="numbers">
                    {lowerPageBound >= 1 ? (
                        <div className="decrement" onClick={decrement}>
                            ...
                        </div>
                    ) : (
                        ""
                    )}
                    {renderPageNumbers()}
                </div>
                <div className="prev" onClick={next}>
                    {isNextActive ? "Next" : ""}
                </div>
            </div>
        </div>
    )
}
