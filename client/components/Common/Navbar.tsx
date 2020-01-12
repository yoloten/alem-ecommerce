import * as Icons from "../../public/icons/_compiled"
import React from "react"

export default function Navbar() {

    return (
        <>
            <div className="navbar">
                <div className="logo">älem</div>
                <div className="categories">
                    <div className="men">Men</div>
                    <div className="women">Women</div>
                </div>
                <div className="actions">
                    <div className="search">
                        <Icons.Search />
                    </div>
                    <div className="search">
                        <Icons.Cart />
                    </div>
                    <div className="search">
                        <Icons.Avatar />
                    </div>
                </div>
            </div>
            <style jsx>{`
                .navbar{
                    display: flex;
                    justify-content: space-between;
                    margin-left: 170px;
                    margin-right: 170px;
                    padding-top: 40px
                }
                .categories{
                    display: flex;
                    width: 100px;
                    justify-content: space-between;
                }
                .actions{
                    display: flex;
                    width: 120px;
                    justify-content: space-between;
                }
                .search{
                    cursor: pointer
                }
            `}</style>
        </>
    )
}
