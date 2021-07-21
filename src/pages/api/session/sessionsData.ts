import { session } from "next-auth/client";

const bcrypt = require('bcrypt')
const fs = require('fs')
const events = require('events');
const eventEmitter = new events.EventEmitter();



interface appendData{
    session_id: string;
    password: string;
    song_reqs: string[]
}
const emitterKeyword = "update";

let sessions:appendData[] = [];

const sessionArrUpdate = ()=>{
    fs.writeFile('sessionData.json', JSON.stringify(sessions), function (err) {
        if (err) throw err;
        console.log('File updated successfully.');
      })
}

eventEmitter.on(emitterKeyword, sessionArrUpdate);

try{ 
    fs.accessSync('sessionData.json', fs.constants.F_OK);
    sessions = JSON.parse(fs.readFileSync('sessionData.json', 'utf8'))
}catch(err){
    fs.writeFile('sessionData.json', JSON.stringify(sessions), function (err) {
        if (err) throw err;
        console.log('File created successfully.');
      })
    
}




export default function resolver(req,res){
    res.send("Hey wait a minute this place is restricted how did you get here?!\nTake a fish for now: ><>");
}

export function appendSession(data:appendData): void{
    sessions.push(data);
    eventEmitter.emit(emitterKeyword)
}

export function appendSong(session_id: string, suggestion: string, password: string): string {
    let newSession=-1;
    sessions.forEach((item, index)=>{
        if(item.session_id===session_id){
            newSession = index;
            return
        }
    })
    if(newSession>=0){
        if(!bcrypt.compareSync(password, sessions[newSession].password)){return "Wrong password"}
        sessions[newSession].song_reqs.push(suggestion);
        eventEmitter.emit(emitterKeyword)
        return "Suggestion added"
    }else{
        return "No session matched ID given"
    }
}

export function getSessions(session_id: string, password: string): appendData[]|string|string[] {
    console.log(sessions)
    const newSessions = sessions.filter(session=>session.session_id === session_id);
    if(newSessions.length>0){
        if(!bcrypt.compareSync(password, newSessions[0].password)){return "Wrong password"}
        
        return newSessions[0].song_reqs
    }else{
        return "No session matched ID given"
    }
    
}