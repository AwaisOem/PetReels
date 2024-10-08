// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {client} from '../../../utils/client';
import { postDetailQuery } from '../../../utils/queries'
import {v4 as uuid} from 'uuidv4';
export default async function handler(req, res) {
    const { id } = req.query;
    if(req.method === 'GET')
    {
        const query = postDetailQuery(id);
        const data = await client.fetch(query);
        res.status(200).json(data[0]);
    }
    else if(req.method === 'PUT')
    {
        const {userId, cmt} = req.body;
        const response = await client.patch(id).setIfMissing({comments : []}).insert('after' , 'comments[-1]',[{
            _type : 'comment',
            comment : cmt,
            _key : uuid(),
            postedBy : 
            {
                _type : 'postedBy',
                _ref : userId,
            }
        }]).commit();
        res.status(200).json(response);
    }
}