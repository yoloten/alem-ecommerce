import { useDispatch, useSelector } from "react-redux"
import { getAllProducts } from "../actions/product"
import { withRedux } from "../withRedux"
import Link from "next/link"
import axios from "axios"

import WithCarousel from "../components/LandingComponents/WithCarousel"
import PromoCards from "../components/LandingComponents/PromoCards"
import ProsCards from "../components/LandingComponents/ProsCards"
import Navbar from "../components/Common/Navbar"
import Footer from "../components/Common/Footer"
import Button from "../components/UI/Button"

function index() {
    const btnClick = (): void => {
        console.log("cliks")
    }

    return (
        <>
            <div>
                <div className="header">
                    <Navbar landing={true} />
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
                    <WithCarousel header="popular-header" />
                    <ProsCards />
                    <WithCarousel header="prod-header" />
                </div>
            </div>
            <Footer />
            <style jsx>{`          
                .header{
                    background: grey;
                    height: 750px
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
            `
            }</style>
        </>
    )
}

// index.getInitialProps = () => {

//     return {}
// }

export default withRedux(index)
