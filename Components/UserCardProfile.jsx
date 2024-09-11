import Image from 'next/image'
import Link from 'next/link'
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import * as React from 'react'
import useAuthStore from '../store/authStorage';
import { GoVerified } from 'react-icons/go';
import { BsPersonPlusFill } from 'react-icons/bs';
import dp from '../public/dp.png'
import { FiLogOut } from 'react-icons/fi';
import UserCard from './UserCard';
import { AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';
import { RiUserUnfollowFill } from 'react-icons/ri';
const fetchUserDetails =async (old) =>{
    const unresolve = old.map(u=>userFetch(u._ref))
    const result = await Promise.all(unresolve);
      // c.postedBy = obj;
      result.forEach((r,i)=>
      {
        old[i]=r.user;
      })
    return old;
}
const userFetch= async (key)=>{
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${key}`;
    const {data} = await axios.get(url);
    return data
  }
const UserCardProfile = ({user ,NoOfPosts}) => {
    const [userC, setUserC] = React.useState(user);
    const {userProfile ,removeUser} = useAuthStore();
    const [Followed, setFollowed] = React.useState(false);
    const [FollowLoading, setFollowLoading] = React.useState(false);
    React.useEffect(() => {
        setUserC(user);
    }, [user])
    React.useEffect(() => {
        const checkFollowed = userProfile && userC.followers?.filter(f=>(userProfile._id===f?._ref  || userProfile._id===f?._id))
        if (checkFollowed && checkFollowed.length > 0) {
            setFollowed(true);
        }
    }, [ userProfile,userC])
    
    const handleFollow  = async ()=>
    {
        if (userProfile) {
            setFollowLoading(true);
            let obj;
            if(Followed)
            {
                obj = {userId : user._id , FollowerId : userProfile._id , follow : false}
                setFollowed(false)
            }
            else
            {
                obj = {userId : user._id , FollowerId : userProfile._id , follow : true }
                setFollowed(true)
            }
            const url= `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/follow`;
            const {data} = await axios.put(url ,obj);
            setUserC({...userC , followers : data.followers });
            setFollowLoading(false);
        }
        else
        {
            alert("Login First");
        }
    }
    const [FollowerShow, setFollowerShow] = React.useState(false)
    const showFollowers= async ()=>
    {
        const result = await fetchUserDetails(user.followers);
        // setUserC({...userC, followers  : result});
        setFollowerShow(true);
    }
    const CloseFollowers=()=>
    {
        setFollowerShow(false)
    }
  return (
    <div className="flex gap-2 justify-between py-2 px-4">
        {user.followers && FollowerShow && (<FollowersComponent followers={userC.followers} handleClose={CloseFollowers} />)}
            <div className="flex gap-2">
                <div className="image w-12 h-12 rounded-full">
                    <Image
                        src={user.image || dp}
                        alt="Profile"
                        className="rounded-full"
                        layout = "responsive"
                        width="100%" height="100%"
                        loading="lazy"
                    />
                </div>
                <div className='flex flex-col justify-center'>
                    <span className="flex gap-3 items-center"><p className="text-semibold text-xl text-white">{userC.userName}</p>{userC.verified && (<GoVerified className="text-blue-400 text-md"/>)}</span>
                    <p onClick={showFollowers} className="cursor-pointer block sm:hidden">{`${(userC.followers) ? userC.followers.length:"0"} Followers`}</p>
                </div>
            </div>
                <div className='hidden sm:flex gap-1 flex-col items-center justify-center'>
                    <p className="text-2xl font-bold">{NoOfPosts ? NoOfPosts:"0"}</p>
                    <p className="">Posts</p>
                </div>
                <div onClick={showFollowers} className='gap-1 flex-col cursor-pointer hidden sm:flex hover:text-success items-center justify-center'>
                    <p className="text-2xl font-bold">{(userC.followers) ? userC.followers.length:"0"}</p>
                    <p className="">Followers</p>
                </div>
        {(userProfile && userProfile._id == user._id)? 
        (<button onClick={() => {
            googleLogout();
            removeUser();
          }} className="btn btn-success"><FiLogOut className="block sm:hidden sm:text-lg text-sm md:font-bold" /><span className="hidden sm:block">Log Out</span></button>):(
            <button onClick={handleFollow} className={`btn ${Followed ? "btn-error":"btn-info"} ${FollowLoading && "loading"}`}>
                {Followed ? (
                        <RiUserUnfollowFill className={`${FollowLoading ? "hidden":"block"} sm:hidden`}/>
                    ) : (
                        <BsPersonPlusFill className={`${FollowLoading ? "hidden":"block"} sm:hidden`}/>
                    )}
                {Followed ? (
                        <span className="hidden sm:block">Unfollow</span>
                        ) : (
                        <span className="hidden sm:block">Follow</span>
                    )}
            </button>
        )}
    </div>
  )
}
function FollowersComponent({followers , handleClose })
{
    return (
        <div className="w-full h-full absolute top-0 z-50 left-0" style={{backgroundColor : "#000000b3"}}>
        <div className="max-w-[500px] w-full sm:w-fit h-full bg-base-100 rounded-xl p-4 absolute top-[50%] left-[50%]" style={{transform : "translate(-50%,-50%)"}}>
            <div className="flex justify-between  w-full items-center">
                <p className="text-xl font-bold">Followers</p>
                <button onClick={handleClose} className={`btn btn-square`} ><AiOutlineClose className="text-white"/></button>
            </div>
            <div className="flex flex-col gap-2 justify-start h-full w-full">
                {followers.map(f=>(
                    <UserCard key={f._id} user={f}/>
                ))}
            </div>
        </div>
    </div>
    )
}
export default UserCardProfile