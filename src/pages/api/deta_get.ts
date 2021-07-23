const { Deta } = require('deta');
const deta = Deta(process.env.DETA_KEY)
const db = deta.Base('sessions_db'); 

export default async function resolver(req, res) {
    const data = await db.fetch({})
    res.send(data)
  }