const crypto = require('crypto')
const bcrypt = require('bcrypt');
import { appendSession } from "./sessionsData";

export default async function resolver(req,res){
    if (req.method !== 'POST') {
        res.status(400).send({ message: 'Only POST requests allowed' })
        return
      }

    const body = req.headers;
    const hash = await bcrypt.hash(body.password, 10)
    const id: string = crypto.randomBytes(8).toString("hex")
    let data = {session_id:id, password: hash, song_reqs: []}
    appendSession(data);
    res.status(200).json({session_id:id});
    
    
    
}