import axios from 'axios'
import * as React from 'react'
import { FaVideoSlash } from 'react-icons/fa'
import UserCardProfile from '../../Components/UserCardProfile'
import VideoCard from '../../Components/VideoCard'
import useAuthStore from '../../store/authStorage'
const arrExpander= (arr)=>{
  if(arr)
  {
    const unresolved = arr.map(v=>fetchVideoDetails(v._ref));
    const results = Promise.all(unresolved);
    return results;
  }
}
const fetchVideoDetails= async (id)=>
{
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${id}`;
  console.log(url);
  const {data} = await axios.get(url);
  // console.log(data);
  return data;
}
const refineCreated =(AP,u)=>
{
  if(AP && u)
  {
    return AP.filter(v=>v.postedBy._id === u._id);
  }
}
function ProfileOfStranger({userDetails ,allPosts}) {
const {userProfile} = useAuthStore();
const [page, setPage] = React.useState("created");
const [savedArr, setSavedArr] = React.useState();
const [CreatedArr, setCreatedArr] = React.useState();
React.useEffect(() => {
if (userDetails.user.saved){
  arrExpander(userDetails.user.saved).then((result) => {
      setSavedArr(result);
  });
}
},[userDetails.user.saved])

React.useEffect(() => {
  const result = refineCreated(allPosts,userDetails.user)
  setCreatedArr(result);
},[allPosts,userDetails.user])
const own = (userProfile && userProfile._id == userDetails.user._id);
  return (
    <div className="py-4 px-2 flex flex-col gap-3">
        <UserCardProfile user={userDetails.user} NoOfPosts={CreatedArr?.length} />
        <div className={`flex gap-3 border-b-2 ${(page==="created") ? "border-warning":(page==="liked")?"border-success":"border-secondary"}`}>
            <button onClick={()=>setPage("created")} className={`rounded-t-2xl px-4 py-2 ${page==="created" && "bg-warning text-black"} hover:bg-warning hover:text-black text-white`}>Created</button>
            <button onClick={()=>setPage("liked")} className={`rounded-t-2xl px-4 py-2 ${page==="liked" && "bg-success text-black"} hover:bg-success hover:text-black text-white`}>Liked</button>
            {own && (<button onClick={()=>setPage("saved")} className={`rounded-t-2xl px-4 py-2 ${page==="saved" && "bg-secondary text-black"} hover:bg-secondary hover:text-black text-white`}>Saved</button>)}
        </div>
        <div className="flex flex-col gap-4">
            {page==="created" && (<Mapping vidArr={CreatedArr}/>)}
            {page==="liked" && (<Mapping vidArr={userDetails.liked}/>)}
            {page==="saved" && (<Mapping vidArr={savedArr}/>)}
        </div>
    </div>
  )
}
export function Mapping({vidArr})
{
  return(
    <>
      {(vidArr && vidArr.length!==0) ? 
      (vidArr.map(obj =>(<VideoCard video={obj} key={obj._id} onlyvideo={true} />))
      ):(<div className="w-full h-full flex flex-col justify-center items-center"><FaVideoSlash className="text-3xl"/><p className="text-xl font-bold">No Videos</p></div>)}    
    </>
  )
}  
export const getServerSideProps = async ({params : {id}})=>{
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${id}`;
  const res1 = await axios.get(url);
  const url2 = `${process.env.NEXT_PUBLIC_BASE_URL}/api/post`;
  const res2 = await axios.get(url2);

  return {
    props : {
      userDetails : res1.data,
      allPosts : res2.data,

    }
  }
}
export default ProfileOfStranger