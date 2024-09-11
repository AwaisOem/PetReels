// import {NextPage } from  'next';
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {useRouter} from 'next/router';
import {topics,footerList3,} from "../utils/constants";
import { AiFillGithub, AiFillHome, AiOutlineMenu, AiOutlineWhatsApp } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import { DiOpensource, DiSpark } from "react-icons/di";
import { CgProfile } from "react-icons/cg";
import { RiUserFollowFill } from "react-icons/ri";
import useAuthStore from "../store/authStorage";
import Image from "next/image";
import dp from '../public/dp.png'
import { GoVerified } from "react-icons/go";
import { MdAlternateEmail } from "react-icons/md";
const SideBar = () => {
  const router = useRouter();
  const [showSideBar, setShowSideBar] = useState(false);
  const { userProfile } = useAuthStore();
  const [searchKey, setSearchKey] = useState("");
  const handleSearch=(e)=>
  {
    e.preventDefault();
    if(searchKey)
    {
      setShowSideBar(false);
      router.push(`/search/${searchKey.split(" ").join("%20")}`)
    }
  }
  const normalLink =
    "flex item-center gap-3 hover:bg-secondary hover:text-white p-3 xl:justify-start cursor-pointer font-semibold rounded";
  const activeLink =
    "flex item-center gap-3 bg-secondary text-white p-3 xl:justify-start cursor-pointer font-semibold rounded";
  return (
      <div className={`${showSideBar ? 'absolute  w-full max-w-[400px] z-10':' w-[73px]'} xl:w-auto bg-base-100 md:absolute xl:static flex flex-col max-h-[92vh] overflow-auto h-fit justify-start mb-10 border-r-2 border-gray-100/25 xl:border-0 p-3`}>
        <div
          className="xl:hidden p-3 flex justify-start text-xl cursor-pointer"
          onClick={() => setShowSideBar((p) => !p)}
        >
          {showSideBar ? <ImCancelCircle /> : <AiOutlineMenu />}
        </div>
        <div className={`xl:border-b-2 ${showSideBar ? 'border-b-2':''} border-gray-100 xl:pb-4`}>
          <Link href="/">
            <div className={normalLink}>
              <p className="text-2xl">
                <AiFillHome />
              </p>
              <span className={`text-xl xl:block  ${!showSideBar ? 'hidden':'block'}`}>For You</span>
            </div>
          </Link>
          {userProfile && (
            <>
              <Link href={`/following`}>
                <div className={normalLink}>
                  <p className="text-2xl">
                    <RiUserFollowFill />
                  </p>
                  <span className={`text-xl xl:block ${!showSideBar ? 'hidden':'block'}`}>Following</span>
                </div>
              </Link>
              <Link href={`/users/${userProfile._id}`}>
                <div className={`${normalLink} hidden xl:flex`}>
                  <p className="text-2xl">
                    <CgProfile />
                  </p>
                  <span className="text-xl">Profile</span>
                </div>
              </Link>
              <Link href={`https://github.com/AwaisOem`}>
                <div className={normalLink}>
                  <p className="text-2xl flex items-center">
                    <DiOpensource/>
                  </p>
                  <span className={`text-xl xl:flex  flex-col ${!showSideBar ? 'hidden':'flex'}`}><span>Contribute</span><span className="text-xs">Make this site better</span></span>
                </div>
              </Link>
              <div className={`${!showSideBar ? 'mb-2':'my-5'} w-full form-control md:hidden`}>
                <div className="input-group">
                  <form onSubmit={handleSearch} className="w-full sm:w-[40vw]">
                  <input
                    type="text"
                    value={searchKey}
                    onChange={(e) =>setSearchKey(e.target.value)}
                    placeholder="Search…"
                    className={`input rounded input-bordered w-full ${!showSideBar ? 'hidden':''}`}
                    />
                  </form>
                  {(showSideBar)&&(<button onClick={handleSearch} className={`btn btn-square border-0 ${showSideBar ? 'btn-secondary':'bg-transparent hover:bg-secondary'}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>)}
                </div>
                {(!showSideBar) &&(<button onClick={(e)=>{if(!showSideBar){setShowSideBar(true)}}} className={`btn btn-square border-0 ${showSideBar ? 'btn-secondary':'bg-transparent hover:bg-secondary'}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>)}
              </div>
              
            </>
          )}
        </div>
        <Discover isSD={showSideBar} />
        <SuggestedAccounts isSD={showSideBar} />
        <SideFooter isSD={showSideBar} />
      </div>
  );
};
function Discover({isSD}) {
  const router = useRouter();
  const { topic } = router.query;
  const activelink = `${isSD ? 'border-2 border-secondary':''} btn-outline xl:border-2 p-1 rounded cursor-pointer text-secondary xl:border-secondary hover:bg-accent flex gap-2 justify-center items-center`;
  const normalLink = `${isSD ? 'bg-transparent border-2 border-accent':''} btn-outline xl:border-2 xl:border-accent text-accent p-1 rounded cursor-pointer hover:text-secondary hover:border-secondary hover:bg-transparent flex gap-2 justify-center items-center`;
  return (
    <div className={`${isSD ? 'border-b-2 border-gray-100 py-6':''} xl:border-b-2 xl:border-gray-100 xl:py-6`}>
      <p className={`${isSD ? 'block':'hidden'} font-semibold xl:block`}>Popular Topics</p>
      <div className={`${isSD ? 'flex-wrap flex-row py-5':'flex-col'} flex xl:flex-wrap xl:flex-row gap-5 xl:w-[30vw] xl:py-5`}>
        {topics.map((t) => (
          <Link href={`/?topic=${t.name}`} key={t.name}>
            <div className={topic === t.name ? activelink : normalLink}>
              <span className="text-2xl ">{t.icon}</span>
              <span className={`${isSD ? 'block':'hidden'} xl:block`}>{t.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
function SuggestedAccounts({isSD}) {
  const { verifiedUsers , fetchVerifiedUsers} = useAuthStore();
  useEffect(() => {
    fetchVerifiedUsers();
  }, [])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return (
  <div>
    <p className={`${isSD ? 'block':'hidden '}  my-6 font-semibold xl:block xl:my-6`}>Suggested Accounts</p>
    <div className={`${!isSD && "items-center"} py-3 flex flex-col xl:items-start gap-2 max-h-[250px] h-fit`}>
      {verifiedUsers.map(u=>(<User user={u} key={u._id} SD={isSD}/>))}
    </div>
  </div>);
}
function User({user , SD}){
  const router = useRouter();
  return (
    <div className="flex gap-3 items-center">
      <Link href={`/users/${user._id}`}>
        <div className="flex justify-end items-end cursor-pointer">
          <Image
          src={user.image || dp}
          alt = "Profile"
          height= {40}
          width= {40}
          className = "rounded-full"
          />
          <GoVerified className="text-blue-400 absolute xl:hidden text-md"/>
        </div>
      </Link>
      <p onClick={()=>{router.push(`/users/${user._id}`)}} className={`text-xl items-center gap-2 font-semibold cursor-pointer text-white ${SD ? "flex":"hidden"} xl:flex`}><span>{user.userName}</span><GoVerified className="text-blue-400 hidden xl:block text-md"/></p>
    </div>
  );
}
function SideFooter({isSD}) {
  return (
    <div className={`${isSD ? 'block':'hidden'} xl:block my-6`}>
      <p className={`${isSD ? 'block':'hidden '}  my-6 font-semibold xl:block xl:my-6`}>Contact</p>
      <div className="flex justify-center  gap-3 my-5">
          <Link href={`https://github.com/AwaisOem`} target="_blank"><div className="rounded-full btn text-lg btn-warning btn-outline"><AiFillGithub/></div></Link>
          <Link href={`https://awaisoem.github.io/SPARK-OFFICIALS/`} target="_blank"><div className="rounded-full px-2 btn btn-error btn-outline"><DiSpark className="text-4xl"/></div></Link>
          <Link href={`https://wa.me/923059304887`} target="_blank"><div className="rounded-full btn text-lg btn-success btn-outline"><AiOutlineWhatsApp/></div></Link>
          <Link href={`mailto:awaisoem@gmail.com`}><div className="rounded-full text-lg btn btn-info btn-outline"><MdAlternateEmail/></div></Link>
      </div>
    </div>
  );
}
function FooterLinks({ data, color }) {
  return (
    <div className={`flex flex-wrap gap-3  text-${color}`}>
      {data.map((m, i) => (
        <p key={i} className="hover:underline">
          {m}
        </p>
      ))}
    </div>
  );
}
export default SideBar;
