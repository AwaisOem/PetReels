import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'
import useAuthStore from '../store/authStorage';
import { GoVerified } from 'react-icons/go';
import { BsPersonPlusFill } from 'react-icons/bs';
import dp from '../public/dp.png'
import { RiUserUnfollowFill } from 'react-icons/ri';
import axios from 'axios';
const UserCard = ({user}) => {
    const {userProfile} = useAuthStore();
    const [loading, setLoading] = React.useState(false);
    const [Followed, setFollowed] = React.useState(false);
    const [userC, setUserC] = React.useState(user);
    React.useEffect(() => {
        setUserC(user);
    }, [user])
    React.useEffect(() => {
        const checkFollowed = userProfile && userC.followers?.filter(f=>(userProfile._id===f._ref))
        if (checkFollowed && checkFollowed.length > 0) {
            setFollowed(true);
        }
    }, [ userProfile,userC])
    
    const handleFollow  = async ()=>
    {
        if (userProfile) {
            setLoading(true);
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
            const url= `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_URL}/api/user/follow`;
            const {data} = await axios.put(url ,obj);
            setUserC({...userC , followers : data.followers });
            setLoading(false);
        }
        else
        {
            alert("Login First");
        }
    }
  return (
    <div className="flex gap-2 justify-between py-2 px-4">
        <Link href={`/users/${user._id}`}>
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
                    <span className="flex gap-3 items-center"><p className="text-semibold text-xl text-white">{user.userName}</p>{user.verified && (<GoVerified className="text-blue-400 text-md"/>)}</span>
                    <p className="text-sm opacity-60">{`${(userC.followers) ? userC.followers.length:"0"} followers`}</p>
                </div>
            </div>
        </Link>
        {(userProfile && userProfile._id == user._id)? 
        (<button className="btn btn-success">You</button>):(
            <button  onClick={handleFollow} className={`btn ${Followed ? "btn-error":"btn-info"} ${loading && "loading"}`}>
                {Followed ? (
                        <RiUserUnfollowFill className={`${loading ? "hidden":"block"} sm:hidden`}/>
                    ) : (
                        <BsPersonPlusFill className={`${loading ? "hidden":"block"} sm:hidden`}/>
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

export default UserCard