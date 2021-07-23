import { verifySessionID } from "./sessionsOperations";

export default async function resolver(req,res){
    if (req.method !== 'POST') {
        res.status(400).send({ message: 'Only POST requests allowed' })
        return
      }

    const body = req.headers;
    
    
    
    const response = await verifySessionID(body.session_id);
    
      if(response==="No session matched the ID given"){
        res.status(500).json({data: response});
        return;
      }
      res.json({data: response});
     
    
    
    
    
    
}
