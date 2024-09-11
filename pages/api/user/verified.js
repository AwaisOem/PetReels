import {client} from '../../../utils/client';
import { verifiedUserQuery } from '../../../utils/queries'
export default async function handler(req, res) {
    if (req.method === 'GET') {
        const query = verifiedUserQuery();
        const  data = await client.fetch(query);
        if(data){
            res.status(200).json(data)
        }else{
            res.status(200).json([])
        } 
    }
}