import axios from 'axios';
import {useRouter} from 'next/router'
import VideoCard from '../Components/VideoCard'
export default function Home({videos}) 
{
  const router = useRouter();
  const {topic } = router.query
  return (
    <div className="flex flex-col h-full videos gap-10">
      <p className="text-xl font-bold">{(topic) ? `${topic}`:"For You"}</p>
      {videos.length ? (
        videos.map(video=>
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
export const getServerSideProps =async ({query : { topic }})=>
{
  let response;
  try
  {
    if(topic)
    {
      response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/discover/${topic}`);
      console.log(response);
    }else
    {
      response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post`);
      console.log(response);
    }
  }catch (e) {console.log(`Error in fetching: ${e.message}`);}
  return {
    props: {
       videos:response?.data || []
    }
  }
}