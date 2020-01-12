import { useDispatch, useSelector } from "react-redux"
import { getAllProducts } from "../actions/product"
import { withRedux } from "../withRedux"
import Link from "next/link"

import WithCarousel from "../components/LandingComponents/WithCarousel"
import PromoCards from "../components/LandingComponents/PromoCards"
import ProsCards from "../components/LandingComponents/ProsCards"
import * as Icons from "../public/icons/_compiled"
import Button from "../components/UI/Button"

function index() {
    const state = useSelector((st: any) => st.product)
    console.log(state, "state")
    const btnClick = (): void => {
        console.log("cliks")
    }

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
                            customStyleObject={{ marginTop: "40px" }}
                            backgroundColor="#ff7070"
                            onClick={btnClick}
                            content="Check More"
                            borderRadius="30px"
                            height="50px"
                            width="150px"
                            border={false}
                            color="#fff"
                        />
                    </div>
                </div>
                <div className="main">
                    <PromoCards />
                    <WithCarousel header="popular-header"/>
                    <ProsCards />
                    
                    <WithCarousel header="prod-header"/>
                    <div className="footer">Powered by Rustam Sahatov. All rights reserved.</div>
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
                .main{
                    margin-left: 170px;
                    margin-right: 170px;
                }
                .footer{
                    margin-top: 120px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100px;
                    border-top: 1px solid #d9d9d9;
                    font-size: 18px;
                    color:  gray
                }
            `
            }</style>
        </>
    )
}

index.getInitialProps = ({ reduxStore }: any) => {
    const { dispatch } = reduxStore
    dispatch(getAllProducts())
    
    return {}
}

export default withRedux(index)
