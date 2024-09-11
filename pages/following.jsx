import axios from 'axios';
import * as React from 'react';
import useAuthStore from '../store/authStorage'
import VideoCard from '../Components/VideoCard'
const refineFollowing =async (UPID,AP)=>
{
    const UF = await userFetch(UPID);
    // const result  = AP.filter(p=>{
    //           return p;
    //     // for(let  i=0; i< UF.length ; i++)
    //     // {
    //     //     if(p.postedBy._id === UF[i]._id)
    //     //     {
    //     //     }
    //     // }
    // });
    return UF;
}
const userFetch= async (key)=>{
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${key}`;
    const {data} = await axios.get(url);
    return data.followers
  }
export default function Home({allPosts}) 
{
    const {userProfile} = useAuthStore();
    const [videos, setVideos] = React.useState();
    React.useEffect(() => {
        const result = refineFollowing(userProfile._id,allPosts);
        setVideos(result)
    } , [userProfile,allPosts])

  return (
    <div className="flex flex-col h-full videos gap-10">
      <p className="text-xl font-bold">Following</p>
      {videos?.length ? (
        videos?.map(video=>
        (
            <VideoCard video={video} key={video._id} onlyvideo={false}/> 
        ))
      ):(
<div className="alert alert-error shadow-lg">
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    <span>{`No Videos OR Check your internet connection (Refresh the page)`}</span>
  </div>
</div>
      )}
      <div className="h-10 text-center text-success">Reels for Pets</div>
    </div>
  )
}
export const getServerSideProps =async ()=>
{
let response;
 try{
      response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post`);
  }catch (e) {console.log("Error in Fetching")}
  return {
    props: {
       allPosts: response?.data || []
    }
  }
}