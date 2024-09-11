import {client} from '../../../utils/client';
import { v4 as uuid } from 'uuidv4'
export default async function handler(req, res) {
   if (req.method === 'PUT') {
        const {userId , postId , save } = req.body;
        let data;
        if(save){
            data = await client.patch(userId).setIfMissing({saved : []}).insert('after' , 'saved[-1]' , [{
                
                _key : uuid(),
                _ref : postId
            }]).commit();
        }
        else
        {
            data = await client.patch(userId).unset([`saved[_ref=="${postId}"]`]).commit();
        }
        res.status(200).json(data)
    }
}