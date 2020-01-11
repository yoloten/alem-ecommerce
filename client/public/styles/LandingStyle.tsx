import React from "react"

export default function LandingStyle() {
    return (
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
                .promocards{
                    margin-top: 40px;
                    display: flex;
                    justify-content: space-between
                }
                .popular{
                    margin-top: 120px;
                }
                .popular-header{
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 60px;
                }
                .popular-title{
                    font-size: 29px
                }
                .product-info{
                    margin-top: 40px
                }
                .product-price {
                    width: 200px;
                    display: flex;
                    justify-content: space-between;
                    font-size: 16px;
                }
                .new-price{
                    font-size: 20px;
                    color: red;
                }
                .old-price{
                    font-size: 20px;
                    color: grey;
                }
                .pros-cards{
                    margin-top: 80px;
                }
                .pros-header{
                    text-align: center;
                    font-size: 29px;
                    margin-bottom: 60px;
                }
                .pros-list{
                    display: flex;
                    justify-content: space-between;
                    font-family: 'SegoeUIBold', serif;
                }
                .pros-card-icon{
                    height: 70px;
                    width: 70px;
                    border-radius: 6px;
                    background: #d9d9d9;
                    display: flex;
                    justify-content: center;
                    align-items: center
                }
                .pros-card-subtitle{
                    font-family: 'SegoeUI', serif;
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
    )
}
