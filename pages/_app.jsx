import '../styles/globals.css'
import { useState ,useEffect } from 'react';
import Head from 'next/head'
import NavBar from "../Components/NavBar";
import { GoogleOAuthProvider } from '@react-oauth/google';
import SideBar from "../Components/SideBar";
const MyApp = ({ Component, pageProps }) =>{
  const [isSSR,setIsSSR]= useState(true);
  useEffect(() => {
    setIsSSR(false);
  }, [])
  if (isSSR)
    return null;
  return (
    <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}>
    <div data-theme="dark">
      <NavBar/>
      <Head>
      <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests"/> 
        <title>PetReels</title>
      </Head>
      <div className="flex gap-6 md:gap-20">
        <div>
          <SideBar/>
        </div>
        <div className="mt-4 h-[88vh] overflow-auto flex flex-col gap-10 flex-1 videos-container">
          <Component {...pageProps} />
        </div>
      </div> 
    </div>
    </GoogleOAuthProvider>
  )
}
export default MyApp
