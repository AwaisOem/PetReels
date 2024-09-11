// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {client} from '../../../utils/client';
import { allPostsQuery } from '../../../utils/queries'
import { uuid } from 'uuidv4'
export default async function handler(req, res) {
   if (req.method === 'PUT') {
        const {postid , cmtKey } = req.body;
        const data = await client.patch(postid).unset([`comments[_key=="${cmtKey}"]`]).commit();
        res.status(200).json(data)
    }
}