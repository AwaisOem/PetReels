import {client} from '../../../utils/client';
import  { searchPostsQuery ,searchUsersQuery} from '../../../utils/queries'
export default async function handler(req, res){
    if(req.method === 'GET') 
    {
        const {keyword} = req.query;
        const query1= searchUsersQuery(keyword);
        const query2= searchPostsQuery(keyword);
        const users = await client.fetch(query1);
        const videos = await client.fetch(query2);
        const data = 
        {
            users,videos
        }
        res.status(200).json(data);
    }
}








