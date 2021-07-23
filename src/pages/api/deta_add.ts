const { Deta } = require('deta');
const deta = Deta(process.env.DETA_KEY)
const db = deta.Base('sessions_db'); 

export default async function resolver(req, res) {
    db.put({name: "alex", age: 77})
    res.send("data added!")
  }