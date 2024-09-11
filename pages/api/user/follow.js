import {client} from '../../../utils/client';
import { v4 as uuid } from 'uuidv4'
export default async function handler(req, res) {
   if (req.method === 'PUT') {
        const {userId , FollowerId , follow } = req.body;
        let data;
        if(follow){
            data = await client.patch(userId).setIfMissing({followers : []}).insert('after' , 'followers[-1]' , [{
                
                _key : uuid(),
                _ref : FollowerId
            }]).commit();
        }
        else
        {
            data = await client.patch(userId).unset([`followers[_ref=="${FollowerId}"]`]).commit();
        }
        res.status(200).json(data)
    }
}