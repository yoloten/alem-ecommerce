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
                <div className="landing-header">
                    <Navbar landing={true} />
                    <div className="landing-header-main">
                        <div className="landing-title">Brand new January Collection</div>
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
                <div className="landing-main">
                    <PromoCards />
                    <WithCarousel header="withcarousel-popular-header" />
                    <ProsCards />
                    <WithCarousel header="withcarousel-prod-header" />
                </div>
            </div>
            <Footer />
        </>
    )
}

// index.getInitialProps = () => {

//     return {}
// }

export default index
