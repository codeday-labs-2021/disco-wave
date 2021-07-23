const { Deta } = require('deta');
const deta = Deta(process.env.DETA_KEY)
const db = deta.Base('sessions_db'); 


const bcrypt = require('bcrypt')




interface appendData{
    session_id: string;
    password: string;
    song_reqs: string[]
}





export default function resolver(req,res){
    res.send("Hey wait a minute this place is restricted how did you get here?!\nTake a fish for now: ><>");
}

export async function verifySessionID(session_id: string){
    
    const res = await db.fetch({"session_id":session_id})
    if(res.items.length<0){
        return "No session matched the ID given"
    }
    return status;
}

export function appendSession(data:appendData): void{
    db.put(data);
    
}

export async function appendSong(session_id: string, suggestion: string, password: string) {
    
    const res = await db.fetch({"session_id":session_id})
    if(res.items.length>0){
        if(!bcrypt.compareSync(password, res.items[0].password)){return "Wrong password"}

        await db.update({"song_reqs":db.util.append(suggestion)}, res.items[0].key)
        
        return "Suggestion added"
    }else{
        return "No session matched the ID given"
    }
}
    

export async function getSessions(session_id: string, password: string) {
    const res = await db.fetch({"session_id":session_id})
    if(res.items.length>0){
        if(!bcrypt.compareSync(password, res.items[0].password)){return "Wrong password"}
        
        return res.items[0].song_reqs
    }else{
        return "No session matched ID given"
    }
    
}