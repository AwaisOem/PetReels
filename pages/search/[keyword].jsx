import * as React from 'react'
import { useRouter } from 'next/router'
import UserCard from '../../Components/UserCard';
import VideoCard from '../../Components/VideoCard';
import axios from 'axios';
import { FaVideoSlash } from 'react-icons/fa';
function Search({keyword,data}) {
    const [videos , setVideos] = React.useState();
    const [users , setUsers] = React.useState();
    React.useEffect(() => {
        setVideos(data.videos);
        setUsers(data.users);
    } ,[data.users, data.videos])
    const [page, setPage] = React.useState("posts");
  return (
    <div className="py-4 px-2 flex flex-col gap-3">
        <p className="text-xl">Search Results for <span className="text-warning">{keyword}</span></p>
        <div className={`flex gap-3 border-b-2 ${(page==="posts") ? "border-warning":"border-success"}`}>
            <button onClick={()=>setPage("posts")} className={`rounded-t-2xl px-4 py-2 ${page==="posts" && "bg-warning text-black"} hover:bg-warning hover:text-black text-white`}>Posts</button>
            <button onClick={()=>setPage("users")} className={`rounded-t-2xl px-4 py-2 ${page==="users" && "bg-success text-black"} hover:bg-success hover:text-black text-white`}>Users</button>
        </div>
        <div className="flex flex-col gap-4">
            {(page==="posts") ? (<Mapping dataArr={videos} post={true} />):(<Mapping dataArr={users} post={false} />)}
        </div>
    </div>
  )
}
export function Mapping({dataArr , post})
{
 return (
    <>
    {(dataArr && dataArr.length !== 0)? (
        dataArr.map(d=>((post)?(<VideoCard key={d._id} video={d} onlyvideo={false} />):(<UserCard  key={d._id}  user={d}/>)))
    ):(
        <div className="w-full h-full flex flex-col justify-center items-center"><FaVideoSlash className="text-3xl"/><p className="text-xl font-bold">No Results</p></div>
    )
    }
    </>
 )
}
export const getServerSideProps =async ({params : {keyword}})=>{
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/search/${keyword}`;
    const {data}= await axios.get(url);
    return {
        props: {
            keyword,
            data
        }
    }
}
export default Search