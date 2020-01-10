import Link from 'next/link'
import * as Icons from "../public/icons/_compiled"
import Card from "../components/UI/Card"
import Button from "../components/UI/Button"

export default function index() {
    return (
        <>
            <div>
                <div className="header">
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
                    <div className="header-main">
                        <div className="title">Brand new January Collection</div>
                        <Button 
                            customStyleObject={{marginTop: "40px"}}
                            backgroundColor="#ff7070"
                            className="btn-check"
                            content="Check More"
                            borderRadius="30px"
                            height="50px"
                            width="150px"
                            base={false}
                            color="#fff"
                        />
                    </div>
                    {/* carousel */}
                </div>
                <div className="main">
                    <div className="promocards">
                        <Card>
                            <div className="new-arrivals">New arrivals are on now!</div>
                            {/* <Button className="btn-check" content="Show Collection"/> */}
                        </Card>
                        <Card>
                            <div className="card-title">Jackets</div>
                            <div className="card-price">$ 39.99</div>
                            {/* <Button className="btn-check">Show Collection</Button> */}
                        </Card>
                        <Card>
                            <div className="sale">Sale this winter</div>
                            <div className="percent">-50%</div>
                        </Card>
                    </div>
                    <div className="popular">
                        <div className="popular-header">
                            <div className="popular-title">Popular</div>
                            {/* <Button>Show More</Button> */}
                        </div>
                        <div className="popular-cards">
                            <Card />
                            <Card />
                            <Card />
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .header{
                    background: grey;
                    height: 750px
                }
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
                .header-main{
                    margin-left: 210px;
                    margin-top: 80px
                }
                .title{
                    font-size: 50px;
                    width: 300px
                }
            `}</style>
        </>
    )
}
