// instant like and comment show process later in background 
import * as React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import axios, { Axios } from "axios";
import { BsFillHeartFill, BsPersonPlusFill } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { GoVerified } from "react-icons/go";
import dp from '../../public/dp.png'
import useAuthStore from "../../store/authStorage";
import { FaShare, FaSave, FaCommentSlash } from "react-icons/fa";
import { RiUserUnfollowFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
const arrUpdater= async (old)=>{
  const unresolve = old.map(c=>userFetch(c.postedBy._ref))
  const result =await Promise.all(unresolve);
    // c.postedBy = obj;
    result.forEach((r,i)=>
    {
      old[i].postedBy=r.user;
    })
  return old;
}
const userFetch= async (key)=>{
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${key}`;
  const {data} = await axios.get(url);
  return data
}
function Details({ video }) {
  const router = useRouter(); 
  const { userProfile } = useAuthStore();
  const [post, setPost] = React.useState(video);
  const [liked, setLiked] = React.useState();
  const [followLoading, setFollowLoading] = React.useState(false);
  const [Followed, setFollowed] = React.useState(false);
  const [userC, setUserC] = React.useState(video.postedBy);
  const [saved, setSaved] = React.useState();
    const [saveLoading, setSaveLoading] = React.useState();
    React.useEffect( () => {
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
  React.useEffect(() => {
      setUserC(video.postedBy);
  }, [video.postedBy]);

  React.useEffect(() => {
      const checkFollowed = userProfile && userC.followers?.filter(f=>(userProfile._id===f._ref))
      if (checkFollowed && checkFollowed.length > 0) {
          setFollowed(true);
      }
  }, [ userProfile,userC])
  const handleSaved = async ()=>
{
  if (userProfile) {
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
  else
  {
    alert("Login First");
  }
}
  const handleFollow  = async ()=>
  {
      if (userProfile) {
        setFollowLoading(true);
          let obj;
          if(Followed)
          {
              obj = {userId : video.postedBy._id , FollowerId : userProfile._id , follow : false}
              setFollowed(false)
          }
          else
          {
              obj = {userId : video.postedBy._id , FollowerId : userProfile._id , follow : true }
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
  
  const filterLikes = post.likes?.filter((e) => e._ref === userProfile?._id);
  React.useEffect(() => {
    if (filterLikes?.length > 0) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [post.likes , filterLikes.length]);
  const handleLike = async () => {
    if (userProfile) {
      let document;
      if (liked) {
        document = { postId: post._id, userId: userProfile._id, like: false };
        setLiked(false);
      } else {
        document = { postId: post._id, userId: userProfile._id, like: true };
        setLiked(true);
      }
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/post/like`;
      const { data } = await axios.put(url, document);
      setPost({ ...post, likes: data.likes });
    } else {
      alert("Login or Signup for Like any post");
    }
  };
  const [commentLoading, setCommentLoading] = React.useState(false);
  const [comment, setComment] = React.useState("");
  const handleComment =async (e)=>
  {
    e.preventDefault();
    if (userProfile) { 
      if ( comment) {
        setCommentLoading(true);
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${post._id}`;
        const obj = {userId : userProfile._id,cmt : comment}
        const response = await axios.put(url , obj);
        const result = await arrUpdater(response.data.comments);
        setPost({...post , comments : result });
        setComment("");
        setCommentLoading(false);
      }
    }
    else
    {
      alert("Login First");
    }
  }
  const deleteComponent =async (key) =>{
    const obj = {postid : post._id ,  cmtKey: key} 
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/post/deleteComment`;
    const {data} = await axios.put(url , obj);
    const result = await arrUpdater(data.comments);
    setPost({...post , comments : result });
  }
  return (
    <div className="flex flex-col gap-5 py-4 pr-4">
      <video
        src={post.video.asset.url}
        className="w-full h-fit max-h-[calc(100vh-120px)] rounded bg-black"
        controls
        loop
      ></video>
      <p className="text-xl font-bold text-white">{post.caption}</p>
      <p className="text-sm ">Date implemented soon</p>
      <div className="flex gap-3 justify-center items-center w-full ">
        <button
          onClick={handleLike}
          className={`btn btn-error ${
            liked ? "" : "btn-outline"
          } flex gap-1 sm:w-[110px] md:hover:btn-error sm:gap-4 jusify-center items-center text-2xs sm:text-base`}
        >
          <AiFillHeart />
          {post.likes?.length !== 0 ? post.likes.length : "Like"}
        </button>
        <button onClick={()=>{router.push(`/share?id=${post._id}`)}} className="btn btn-success btn-outline flex gap-1 sm:gap-3 jusify-center items-center text-2xs sm:text-base">
          <FaShare />
          Share
        </button>
        <button onClick={handleSaved} className={`btn btn-info ${saved ? "":"btn-outline"} ${saveLoading && "loading"} flex gap-1 sm:gap-3 jusify-center items-center text-2xs sm:text-base`}>
          {!saveLoading && (<FaSave />)} Save{saved && "d"}
        </button>
      </div>
      <div className="flex justify-between sm:mx-6 items-center">
        <Link href="/">
          <div className="flex gap-2">
            <div className="image w-12 h-12 rounded-full">
              <Image
                src={post.postedBy.image || dp}
                alt="Profile"
                width="100%"
                className="rounded-full"
                layout="responsive"
                height="100%"
                loading="lazy"
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="flex gap-3 items-center">
                <p className="text-semibold text-xl text-white">
                  {post.postedBy.userName}
                </p>
                {post.postedBy.verified && (
                  <GoVerified className="text-blue-400 text-md" />
                )}
              </span>
              <p className="text-sm opacity-60">{`${(userC.followers) ? userC.followers.length:"0"} followers`}</p>
            </div>
          </div>
        </Link>
        <button onClick={handleFollow} className={`btn btn-info ${Followed ? "btn-error":"btn-info"} ${followLoading && "loading"}`}>
          {Followed ? (
                        <RiUserUnfollowFill className={`${followLoading ? "hidden":"block"} sm:hidden`}/>
                    ) : (
                        <BsPersonPlusFill className={`${followLoading ? "hidden":"block"} sm:hidden`}/>
                    )}
                {Followed ? (
                        <span className="hidden sm:block">Unfollow</span>
                        ) : (
                        <span className="hidden sm:block">Follow</span>
                    )}
        </button>
      </div>
      <div className="mt-5 sm:mx-6 rounded">
        <div
          className="flex flex-col h-[500px] py-4  overflow-auto gap-2 justify-start items-center"
          style={{
            boxShadow:
              "inset 5px 5px 13px #1b1f26, inset -5px -5px 13px #394152",
          }}
        >
          {(post.comments && post.comments.length!==0) ?(
            <>
            {post.comments.map(c=>{
                if(userProfile && c.postedBy._id == userProfile._id)
                {
                  return (<Comment comment={c} del={deleteComponent} key={c._key} ext={true} ext_str={"You"} />)
                }
                else if(c.postedBy._id == post.postedBy._id)
                {
                  return (<Comment comment={c} del={deleteComponent} key={c._key} ext={true} ext_str={"Author"} />)
                }
                else
                {
                  return (<Comment comment={c} del={deleteComponent} key={c._key} ext={false} ext_str={""} />)
                }
              })
              }
              </>
              ) : (
            <div className="flex flex-col w-full h-full gap-2 justify-center items-center">
              <FaCommentSlash className="text-center text-bold text-3xl" />
              <p className="text-xl font-bold">No Comments</p>
            </div>
          )}
        </div>
        <div className="flex gap-2 mt-4 mb-8">
          <form onSubmit={handleComment} className="w-full">
            <input
            type="text"
            value={comment}
            placeholder="Comment here"
            onChange={(e) =>setComment(e.target.value)}
            className="input input-bordered input-warning w-full"
            />
          </form>
          <button  onClick={handleComment} className={`btn btn-warning ${commentLoading && "loading"}`}>
            <BiCommentDetail className={`sm:hidden ${commentLoading && "hidden"}`} />
            <p className="sm:block hidden">{commentLoading ? "Commenting...":"Comment"}</p>
          </button>
        </div>
      </div>
    </div>
  );
}

function Comment({comment, del, ext ,ext_str }) {
  const [loading, setLoading] = React.useState(false)
  const handleDelete = ()=>
  {
    setLoading(true);
    del(comment._key);
  }
  return (
    <div className={`rounded-lg w-[90%] h-[70px] px-2 text-black flex justify-between items-center bg-warning `}>
                <div className="flex gap-2">
                <div className="image w-[60px] h-[60px] rounded-full">
                  <Link href={"/"} >
                    <Image
                        src={comment.postedBy.image}
                        alt="Profile"
                        width="100%"
                        className="rounded-full"
                        layout = "responsive"
                        height="100%"
                        loading="lazy"
                    />
                  </Link>
                </div>
                <div className='flex flex-col  justify-center'>
                    <span className="flex gap-3 items-center text-bold"><p className="text-semibold text-lg">{comment.postedBy.userName.split(" ")[0]}</p>{comment.postedBy.verified && (<GoVerified className="text-blue-400 text-md"/>)}{ext && <span className="px-2 rounded-xl text-xs bg-primary text-white">{ext_str}</span>}</span>
                    <p className="text-2xs">{comment.comment}</p>
                </div>
                </div>
                {ext && ext_str==="You" && <button  onClick={handleDelete} className={`${loading && "loading"} btn btn-error text-xs`}>
                  <span className="hidden sm:block">
                    {!loading && "delete"}
                  </span>
                  <span className="sm:hidden">
                    {!loading && (<MdDelete/>)}
                  </span>
                  </button>}
    </div>
  )
}

export const getServerSideProps = async ({ params: { id } }) => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${id}`;
  const response = await axios.get(url);
  return {
    props: {
      video: response.data,
    },
  };
};
export default Details;
