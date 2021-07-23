import { getSessions } from "../sessionsOperations";

export default async function addsuggestion(req,res){
    if (req.method !== 'POST') {
        res.status(400).send({ message: 'Only POST requests allowed' })
        return
      }
    const body = req.headers;
    const result = await getSessions(body.session_id, body.password)
    if(result!=="No session matched ID given"&& result!=="Wrong password"){
        res.status(200).json(result)
    }else{
        res.status(400).send(result)
    }
}