import axios from 'axios'
import  jwt_decode from 'jwt-decode'

export const CreateOrGetUser =async (res , add)=>{
    const decoded = jwt_decode(res.credential)
    const {picture , name , sub } = decoded;
    const user = {
        _id: sub ,
        _type: 'user',
        userName : name,
        image : picture,
        verified : false
    }
    add(user);
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth`;
    const response = await axios.post(url,user);
}