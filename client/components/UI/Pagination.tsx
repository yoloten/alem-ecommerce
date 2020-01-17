import React, { useState, useEffect } from "react"

import CardGrid from "./CardGrid"

namespace Paginate {
    export interface Props {
        itemsPerPage: number
        items: any[]
    }
}

export default function Pagination({ itemsPerPage, items }: Paginate.Props) {
    const [currentPage, setCurrentPage] = useState(1)
    const [upperPageBound, setUpperPageBound] = useState(3)
    const [lowerPageBound, setLowerPageBound] = useState(0)
    const [pageBound, setPageBound] = useState(2)

    const handleClick = (e: any) => setCurrentPage(parseInt(e.target.id, 10))

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
        if ((currentPage + 1) > upperPageBound) {
            setUpperPageBound(upperPageBound + pageBound)
            setLowerPageBound(lowerPageBound + pageBound)
        }

        setCurrentPage(currentPage + 1)
    }

    const renderItems = () => {
        const indexOfLastTodo = currentPage * itemsPerPage
        const indexOfFirstTodo = indexOfLastTodo - itemsPerPage
        const currentItems = items.slice(indexOfFirstTodo, indexOfLastTodo)

        return <CardGrid content={currentItems} fromFilters={true} />
    }

    const renderPageNumbers = () => {
        const pageNumbers = []
        for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i++) {
            pageNumbers.push(i)
        }
        
        return pageNumbers.map((number) => <div key={number} onClick={handleClick}>{number}</div>)
    }

    return (
        <div>
            {renderItems()}
            <div className="page-numbers">
                {lowerPageBound >= 1 ? <div className="decrement" onClick={decrement}>...</div> : ""}
                <div className="prev" onClick={prev}>Prev</div>
                <div className="numbers">
                    {renderPageNumbers()}
                    {currentPage > upperPageBound ? <div className="decrement" onClick={increment}>...</div> : ""}
                </div>
                <div className="prev" onClick={next}>Next</div>
            </div>
            <style jsx>{`
                .page-numbers{
                    display: flex;
                    border: 1px solid red;
                    margin-bottom: 80px;
                    margin-left: 2.85vw;
                    align-items: center;
                    justify-content: space-between;
                }
                .numbers{
                    display: flex;
                    justify-content: space-between;
                    width: 30px;
                    cursor: pointer
                }
                .prev{
                    cursor: pointer
                }
                
            `}</style>
        </div>
    )
}
