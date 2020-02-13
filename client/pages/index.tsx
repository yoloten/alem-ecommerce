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
        console.log("click")
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

                @media (max-width: 1200px) { 
                    .main{
                        margin-left: 60px;
                        margin-right: 60px; 
                    }
                    .header-main{
                        margin-left: 110px;
                        margin-top: 80px
                    }
                }

                @media (max-width: 1000px) { 
                    .main{
                        margin-left: 30px;
                        margin-right: 30px; 
                    }
                    .header-main{
                        margin-left: 55px;
                        margin-top: 80px
                    }
                    .header{
                        background: grey;
                        height: 650px
                    }
                }

                @media (max-width: 700px) { 
                    .main{
                        margin-left: 15px;
                        margin-right: 15px;    
                    }
                    .header-main{
                        margin-left: 25px;
                        margin-top: 80px
                    }
                    .header{
                        background: grey;
                        height: 550px
                    }
                }

                @media (max-width: 370px) { 
                    .main{
                        margin-left: 5px;
                        margin-right: 5px; 
                    }
                    .header-main{
                        margin-left: 10px;
                        margin-top: 80px
                    }
                    .header{
                        background: grey;
                        height: 450px
                    }
                    .title{
                        font-size: 30px;
                        width: 300px
                    }
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
