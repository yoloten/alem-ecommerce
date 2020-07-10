import React, { useState, useEffect } from "react"

import CardGrid from "./CardGrid"

export default function Pagination({ itemsPerPage, items, fromFilters, getLastIndex, toFirst }: any): JSX.Element {
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

        if (items.length === 0) {
            setIsNextActive(false)
        }

        if (toFirst) {
            setCurrentPage(1)
        }
    }, [currentPage, items])

    const prev = () => {
        if (isPrevActive) {
            if ((currentPage - 1) % pageBound === 0) {
                setUpperPageBound(upperPageBound - pageBound)
                setLowerPageBound(lowerPageBound - pageBound)
            }

            setCurrentPage(currentPage - 1)
        }
    }

    const next = () => {
        if (isNextActive) {
            if (currentPage + 1 > upperPageBound) {
                setUpperPageBound(upperPageBound + pageBound)
                setLowerPageBound(lowerPageBound + pageBound)
            }

            getLastIndex(12)
            setCurrentPage(currentPage + 1)
        }
    }

    const renderItems = () => {
        const indexOfLastTodo = currentPage * itemsPerPage
        const indexOfFirstTodo = indexOfLastTodo - itemsPerPage
        const currentItems = items.slice(indexOfFirstTodo, indexOfLastTodo)

        return <CardGrid content={currentItems} fromFilters={fromFilters} />
    }

    return (
        <div>
            {renderItems()}
            <div className="page-numbers">
                <div className={`${!isPrevActive ? "closed" : ""} prev`} onClick={prev}>
                    Previous
                </div>
                <div className={`${!isNextActive ? "closed" : ""} prev`} onClick={next}>
                    Next
                </div>
            </div>
        </div>
    )
}
