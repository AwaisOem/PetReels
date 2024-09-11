import React , {useState , useEffect , useRef} from 'react'
import Image from 'next/image'
import {HiVolumeUp , HiVolumeOff } from 'react-icons/hi';
import {BsPlay ,BsFillPlayFill , BsFillPauseFill} from 'react-icons/bs' 
import {GoVerified} from 'react-icons/go';
import {FaShare , FaSave} from 'react-icons/fa';
import axios from 'axios';
import {useRouter } from 'next/router'
import useAuthStore from '../store/authStorage';
import {BiCommentDetail} from 'react-icons/bi';
import {AiFillHeart , AiOutlineHeart} from 'react-icons/ai';
import Link from 'next/link'

const VideoCard = ({video , onlyvideo}) => {
    const router =useRouter();
    const [Hover, setHover] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(true);
    const [post, setPost] = useState(video);
    const { userProfile} = useAuthStore(); 
    const [liked, setLiked] = useState();
    const mainVid = useRef(null);
    const [saved, setSaved] = useState();
    const [saveLoading, setSaveLoading] = useState();
    useEffect( () => {
        if (post && userProfile) {
            fetchUserDetails(userProfile._id).then((result) => {
                const checkSaved =  result.user.saved?.filter(f=>(post._id===f._ref))
                if (checkSaved && checkSaved.length > 0) {setSaved(true);}
            });
        }
    }, [post , userProfile])
    const fetchUserDetails = async (id) => 
    {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${id}`
        const {data} = await axios.get(url);
        return data
    }
    const vidClick = ()=>
    {
        setIsVideoPlaying(p=>!p);
        if (mainVid.current.paused === true) {
            mainVid.current.play();
        }
        else
        {
            mainVid.current.pause();
        }
    }
    const filterLikes  = post.likes?.filter(e=> e._ref  === userProfile?._id);
    useEffect(()=>{
        if (filterLikes?.length > 0) {
        setLiked(true);
        }else
        {
        setLiked(false);
        }
    } ,[post.likes , filterLikes])
const handleLike = async ()=>
{
  if (userProfile)
  {
    let document; 
    if(liked)
    {
      document = { postId : post._id , userId : userProfile._id , like:false }
       setLiked(false);
    }
    else
    {
        document = { postId : post._id , userId : userProfile._id , like:true }
        setLiked(true);
    }
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/post/like`;
    const {data} = await axios.put(url, document); 
    setPost({...post,likes : data.likes});
  }
  else
  {
    alert("Login or Signup for Like any post");
  }
}
const handleSaved = async ()=>
{
    setSaveLoading(true);
    let obj;
    if (saved) {
        obj = {userId: userProfile._id , postId: post._id,save : false};
        setSaved(false);
    }
    else
    {
        obj = {userId: userProfile._id , postId: post._id,save : true};
        setSaved(true);
    }
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/save`;
    const {data} = await axios.put(url , obj);
    setSaveLoading(false);
}
  return (
    <div className="flex flex-col max-w-screen-sm m-auto gap-4 pl-2 pr-4 py-4 h-fit w-full">
        {!onlyvideo && (<div className="flex justify-start items-center">
            <Link href={`/users/${video.postedBy._id}`} className="cursor-pointer" >
                <div className="flex gap-2 cursor-pointer">
                <div className="image w-8 h-8 md:w-10 md:h-10 xl:w-12 xl:h-12 rounded-full">
                    <Image
                        src={video.postedBy.image}
                        alt="Profile"
                        width="100%"
                        className="rounded-full"
                        layout = "responsive"
                        height="100%"
                        loading="lazy"
                    />
                </div>
                <div className='flex flex-col justify-center'>
                    <span className="flex gap-3 items-center"><p className="text-semibold text-xl text-white">{video.postedBy.userName}</p>{video.postedBy.verified && (<GoVerified className="text-blue-400 text-md"/>)}</span>
                    <p className="text-sm opacity-60"></p>
                </div>
                </div>
            </Link>
        </div>)}
        <p className="text-semibold text-white">{video.caption}</p>
        <div className='video cursor-pointer flex justify-center rounded-xl bg-black h-[426px] w-full'
        onMouseEnter={()=>{setHover(true)}}
        onMouseLeave={()=>{setHover(false)}}
        onClick={vidClick} 
        onDoubleClick={()=>{router.push(`/details/${video._id}`)}}
        >
            {Hover && (
            <div className="relative left-[33%]  md:left-[41%] ">
            <button id="playpause" style={{backgroundColor : '#ffffffa8'}} className="btn top-[37%] h-[100px] outline-none border-0 w-[100px] text-6xl flex justify-center items-center absolute rounded-full ">
                {isVideoPlaying ? 
                (<BsFillPlayFill className=" text-white font-extrabold"/>)
                :(<BsFillPauseFill className=" text-white font-extrabold"/>)}
            </button>
            </div>
            )}
            {/* {Hover && (
                <div className="relative  left-[93%]">
                <div  className="top-[93%] absolute">
                    {isVideoMuted ? 
                (<HiVolumeOff className="text-white font-extrabold"/>)
                :(<HiVolumeUp className="text-white font-extrabold"/>)}
                </div>
                </div>
            )} */}
                <video
                loop
                ref={mainVid}
                src={video.video.asset.url}
                height="100%"
                width="100%"
                className= "rounded-2xl"
                />
        </div>
        <div className='flex justify-between items-center'>
            <div className='flex gap-3 justify-center items-center'>
                <span><button onClick={handleLike} className={`btn btn-error  ${(liked) ? "":"btn-outline"}`}><AiFillHeart/></button></span>
                <Link href={`/details/${video._id}`}><button className="btn btn-warning btn-outline"><BiCommentDetail/></button></Link>
                <span><button onClick={()=>{router.push(`/share?id=${video._id}`)}} className="btn btn-success btn-outline"><FaShare/></button></span>
            </div>
            <div className='flex gap-3 justify-center items-center'>
                <span><button onClick={handleSaved} className={`btn ${saveLoading && "loading"} btn-info ${saved ? "":"btn-outline"}`}>{!saveLoading && (<FaSave/>)}</button></span>
            </div>
        </div>
        
    </div>
  )
}

export default VideoCard