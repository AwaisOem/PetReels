// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {client} from '../../../utils/client';
import { allPostsQuery } from '../../../utils/queries'
export default async function handler(req, res) {
    if (req.method === 'GET') {
        const query = allPostsQuery();
        const  data = await client.fetch(query);
        res.status(200).json(data)
    }
    else if (req.method === 'POST') {
        const document = req.body;
        client.create(document);
        res.status(201).json("SuccessFully Added")
    }
}