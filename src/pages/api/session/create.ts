const crypto = require("crypto");
const bcrypt = require("bcrypt");
import { appendSession } from "./sessionsOperations";

export default async function resolver(req, res) {
  if (req.method !== "POST") {
    res.status(400).send({ message: "Only POST requests allowed" });
    return;
  }

  const body = req.headers;

  const hash = await bcrypt.hash(body.password, 10);
  const adminhash = await bcrypt.hash(body.admin_password, 10);
  const id: string = crypto.randomBytes(8).toString("hex");
  let data = {
    session_id: id,
    admin_password: adminhash,
    password: hash,
    song_reqs: [],
  };
  await appendSession(data);
  res.status(200).json({ session_id: id });
}
