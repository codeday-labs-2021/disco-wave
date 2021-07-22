import { appendSong } from "../sessionsOperations";

export default async function addsuggestion(req,res){
    if (req.method !== 'POST') {
        res.status(400).send({ message: 'Only POST requests allowed' })
        return
      }
    const body = req.headers;
    const result = appendSong(body.session_id, body.suggestion, body.password)
    if(result==="Suggestion added"){
        res.status(200).send(result)
    }else if(result==="Wrong password"){
        res.status(403).send(result)
    }else{
        res.status(404).send(result)
    }
}