function MyApp({ Component, pageProps }: any) {
    return (
        <>
            <Component {...pageProps} />
            <style jsx global>{`
                @font-face {
                    font-family: 'SegoeUI';
                    src: url('fonts/SegoeUI.ttf');
                }

                @font-face {
                    font-family: 'Poppins';
                    src: url('fonts/Poppins-Medium.ttf');
                }

                @font-face {
                    font-family: 'PoppinsLight';
                    src: url('fonts/Poppins-Light.ttf');
                }

                @font-face {
                    font-family: 'PoppinsSemiBold';
                    src: url('fonts/Poppins-SemiBold.ttf');
                }

                @font-face {
                    font-family: 'TimeBurner';
                    src: url('fonts/timeburnernormal.ttf');
                }

                @font-face {
                    font-family: 'SegoeUIBold';
                    src: url('fonts/SegoeUI-Bold.ttf');
                }

                body{
                    font-family: 'PoppinsLight', serif;
                    margin: 0;
                }
            `}</style>
        </>
    )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp
