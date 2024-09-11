import * as React from 'react'
import {useRouter} from 'next/router'
import { AiOutlineClose } from 'react-icons/ai';
const Share = () => {
    const router = useRouter();
    const {id} = router.query;
    const [copied, setCopied] = React.useState(false)
    const url = `/details/${id}`;
    const handleCopy = ()=>
    {
        navigator.clipboard.writeText(url)
        setCopied(true);
    }
    const [once, setOnce] = React.useState(1)
    const handleClose = ()=>
    {
        if(once)
        {
            router.back();
            setOnce(0);
        }
    }
  return (
    <div className="w-full h-full absolute top-0 left-0" style={{backgroundColor : "#000000b3"}}>
        <div className="max-w-[500px] h-[200px] bg-base-100 rounded-xl p-4 absolute top-[50%] left-[50%]" style={{transform : "translate(-50%,-50%)"}}>
            <div className="flex justify-between  w-full items-center">
                <p className="text-xl font-bold">Share Link</p>
                <button onClick={handleClose} className={`btn btn-square ${once===0 && "loading"}`} >{once===1 && (<AiOutlineClose className="text-white"/>)}</button>
            </div>
            <div className="flex gap-2 justify-center h-full w-full items-center">
                <input value={url} type="text" readOnly="true" className="input input-outline rounded"/>
                <button onClick={handleCopy} className="btn btn-success">{copied ? "Copied" : "Copy"}</button>
            </div>
        </div>
    </div>
  )
}

export default Share