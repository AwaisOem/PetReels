import * as React from "react";
import Router, { useRouter } from "next/router";
import useAuthStore from "../store/authStorage";
import axios from "axios";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {client} from "../utils/client";
import { topics } from "../utils/constants";
const Upload = () => {
    const router = useRouter();
    const { userProfile} = useAuthStore();
  const [loading, setLoading] = React.useState(false);
  const [wrongFileType, setWrongFileType] = React.useState(false);
  const [videoAsset, setVideoAsset] = React.useState();
  const [savingPost, setSavingPost] = React.useState(false);
  const [caption, setCaption] = React.useState("");
  const [catagory, setCatagory] = React.useState(topics[0].name);
  const  uploadVideo = async(e)=>
  {
    setLoading(true);
    const selectedFile = e.target.files[0];
    const fileTypes  = [ 'video/ogg' , 'video/webm' , 'video/mp4'];
    if (fileTypes.includes(selectedFile.type)) {
        const data  = await client.assets.upload('file' , selectedFile ,{contentType: selectedFile.type, filename: selectedFile.name})
          setVideoAsset(data);
          setLoading(false);
    }
    else{
        setLoading(false);
        setWrongFileType(true);
      }
    }
  const handleDiscard  = () =>
  {
      setLoading(false);
      setVideoAsset(undefined);
      setWrongFileType(false);
      setSavingPost(false);
      setCaption('');
      setCatagory("");
  }
  const handlePost= async()=>
  {
    if(userProfile && catagory && caption && videoAsset)
    {
        setSavingPost(true)
        const  document = 
        {
            _type: 'post',
            caption : caption,
            video:{
                _type: 'file',
                asset : {
                    _type: 'reference',
                    _ref:videoAsset?._id,
                }
            },
            userId : userProfile._id,
            postedBy :{
                _type: 'postedby',
                _ref : userProfile._id,
             },
             topic: catagory,
        }
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/post`;
        await axios.post(url,document);
        router.push('/');
    }
    else
    {
      alert("Please fill all fileds")
    }
  }
  return (
    <div className="flex w-full h-full absolute left-0 top-[60px] lg:top-[70px] mb-10 py-5 bg-base-100 overflow-auto justify-center">
      <div className=" bg-primary rounded-lg h-fit flex gap-6 flex-wrap justify-center items-center p-14 my-6">
        <div>
          <div>
            <p className="text-2xl font-bold">Upload Video</p>
            <p className="text-md text-gray-400 mt-1">
              Post a video to your account
            </p>
          </div>
          <div className=" border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center  outline-none mt-10 h-fit  p-10 cursor-pointer hover:border-warning hover:bg-base-100">
            {loading ? (
              <p className="text-center text-3xl text-error font-semibold">
                Uploading...
              </p>
            ) : (
              <div>
                {!videoAsset ? (
                  <label className="cursor-pointer">
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="flex flex-col justify-center items-center">
                        <p className="font-bold text-xl">
                          <FaCloudUploadAlt className="text-gray-300 text-6xl" />
                        </p>
                        <p className="text-xl font-semibold">
                          Select video to upload
                        </p>
                      </div>

                      <p className="text-gray-400 text-center mt-10 text-sm leading-8">
                        MP4 or WebM or ogg <br />
                        720x1280 resolution or higher <br />
                        Up to 10 minutes <br />
                        Less than 2 GB
                      </p>
                      <p className="btn btn-warning">
                        Select file
                      </p>
                    </div>
                    <input
                      type="file"
                      name="upload-video"
                      onChange={(e) => uploadVideo(e)}
                      className="w-0 h-0"
                    />
                  </label>
                ) : (
                  <div className=" rounded-3xl max-w-[600px] flex flex-col gap-6 justify-center items-center">
                    <video
                      className="rounded-xl h-[345px] mt-16 bg-black"
                      controls
                      loop
                      src={videoAsset?.url}
                    />
                    <div className=" flex justify-between gap-20">
                      <p className="text-lg">{videoAsset.originalFilename}</p>
                      <button
                        type="button"
                        className=" rounded-full bg-gray-200 text-red-400 p-2 text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                        onClick={() => setVideoAsset(undefined)}
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          {wrongFileType && (
            <p className="text-center text-base whitespace-nowrap text-error font-semibold mt-4 w-[260px]">
              Please select an video file (mp4 or webm or ogg)
            </p>
          )}
        </div>
        <div className="flex flex-col gap-3 pb-10">
          <label className="text-md font-medium ">Caption</label>
          <input type="text" value={caption} onChange={e=>setCaption(e.target.value)} placeholder="Type here" className="input input-bordered input-warning w-full max-w-xs" />
          <label className="text-md font-medium ">Choose a topic</label>
          <select className="select select-warning w-full max-w-xs" onChange={(e) => setCatagory(e.target.value)}>
            {topics.map((item , i) => (
                (i===0)?
                    <option key={item.name} defaultValue={item.name}>{item.name}</option>
                :
                    <option key={item.name} value={item.name}>{item.name}</option>
            ))}
          </select>
          <div className="flex gap-6 mt-10">
            <button
              onClick={handleDiscard}
              type="button"
              className="btn btn-outline  w-[130px] btn-error"
            >
              Discard
            </button>
            <button
              onClick={handlePost}
              type="button"
              className={`btn btn-warning w-[130px] ${savingPost ? "loading" : ""}`}
            >
              {savingPost ? "Posting..." : "Post"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
