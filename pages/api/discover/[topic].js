// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {client} from '../../../utils/client';
import { topicPostsQuery } from '../../../utils/queries'
export default async function handler(req, res) {
    const { topic } = req.query;
    if(req.method === 'GET')
    {
        const query = topicPostsQuery(topic);
        const data = await client.fetch(query);
        res.status(200).json(data);
    }
}