// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {client} from '../../../utils/client';
import { allPostsQuery } from '../../../utils/queries'
import { v4 as uuid } from 'uuidv4'
export default async function handler(req, res) {
   if (req.method === 'PUT') {
        const {postId , userId , like } = req.body;
        let data;
        if(like){
            data = await client.patch(postId).setIfMissing({likes : []}).insert('after' , 'likes[-1]' , [{
                _key : uuid(),
                _ref : userId
            }]).commit();
        }
        else
        {
            data = await client.patch(postId).unset([`likes[_ref=="${userId}"]`]).commit();
        }
        res.status(200).json(data)
    }
}