import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CreateOrGetUser } from "../utils/index";
import { useRouter } from "next/router";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import Logo from "../utils/logo.png";
import { AiOutlinePlus } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import dp from '../public/dp.png'
import useAuthStore from "../store/authStorage";
const NavBar = () => {
  const router = useRouter();
  const { userProfile, addUser, removeUser } = useAuthStore();
  const [searchKey, setSearchKey] = useState("");
  const handleSearch=(e)=>
  {
    e.preventDefault();
    if(searchKey)
    {
      router.push(`/search/${searchKey.split(" ").join("%20")}`)
    }
  }
  return (
    <div className="w-full flex justify-between py-2 px-4 items-center border-b-[0.5px] border-b-gray-100/25 h-full">
      <Link href="/" className="">
        <div className="flex justify-center align-center h-full">
          <div className="w-[60px] md:w-[80px]">
            <Image
              src={Logo}
              alt="P"
              className="cursor-pointer"
              layout="responsive"
            />
          </div>
          <span className="text-left flex justify-start items-end md:ml-[-27px] ml-[-17px] text-white  text-3xl font-bold" style={{ lineHeight: "3rem" }}>et-<span className="text-secondary">Reels</span>
          </span>
        </div>
      </Link>
      <div className="form-control hidden md:block">
        <div className="input-group">
          <form className="w-[40vw]" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search…"
            onChange={(e) =>setSearchKey(e.target.value)}
            className="input w-full rounded input-bordered"
            />
          </form>
          <button onClick={handleSearch} className="btn btn-square btn-secondary">
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
          </button>
        </div>
      </div>
      <div>
        {userProfile ? (
          <div className="flex gap-4 items-center">
            
            <button
            onClick={()=>{router.push("/upload")}}
              className="relative h-[40px] w-[40px] md:w-auto md:h-auto inline-flex items-center justify-center p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 rounded-lg shadow-2xl group"
            >
              <span className="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-red-500 rounded-full blur-md ease"></span>
              <span className="absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease">
                <span className="absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-purple-500 rounded-full blur-md"></span>
                <span className="absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-pink-500 rounded-full blur-md"></span>
              </span>
              <span className="relative text-white flex items-center gap-2 justify-center">
                <AiOutlinePlus className="font-bold md:text-2xl text-base" />
                <p className="xl:block hidden">Upload</p>
              </span>
            </button>
            <Link href={`/users/${userProfile._id}`}>
              <div className="w-[38px] h-[38px] flex items-center justify-center cursor-pointer rounded-full bg-secondary  hover:bg-primary">
                <Image
                  src={userProfile.image || dp}
                  alt="Profile"
                  height="100%"
                  width="100%"
                  className="rounded-full"
                />
              </div>
            </Link>
            <button
              onClick={() => {
                googleLogout();
                removeUser();
              }}
              className="btn btn-warning hover:btn-error rounded-full flex items-center justify-center"
            >
              <FiLogOut className="sm:text-lg text-sm md:font-bold" />
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(res) => {
              CreateOrGetUser(res, addUser);
            }}
            onError={(error) => {
              console.log("Error");
            }}
          />
        )}
      </div>
    </div>
  );
};
export default NavBar;
