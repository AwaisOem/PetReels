// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {client} from '../../../utils/client';
import { singleUserQuery , userCreatedPostsQuery , userLikedPostsQuery } from '../../../utils/queries'
export default async function handler(req, res) {
    const { id } = req.query;
    if(req.method === 'GET')
    {
        const query = singleUserQuery(id);
        const query2 = userCreatedPostsQuery(id);
        const query3 = userLikedPostsQuery(id);
        const userDetail = await client.fetch(query);
        const userCreated = await client.fetch(query2);
        const userLiked = await client.fetch(query3);
        const data = 
        {
            user : userDetail[0],
            liked : userLiked,
            Created : userCreated
        }
        res.status(200).json(data);
    }
}