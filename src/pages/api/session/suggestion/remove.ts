import { removeSong } from "../sessionsOperations";

export default async function addsuggestion(req, res) {
  if (req.method !== "POST") {
    res.status(400).send({ message: "Only POST requests allowed" });
    return;
  }
  const body = req.headers;
  const result = await removeSong(
    body.session_id,
    body.admin_password,
    body.song
  );
  if (result === "Requests updated") {
    res.status(200).send(result);
  } else if (result === "Wrong password") {
    res.status(403).send(result);
  } else if (
    result === "Index given was too low" ||
    result === "Index given was too high"
  ) {
    res.status(500).send(result);
  } else if (result === "No session matched the ID given") {
    res.status(404).send(result);
  }
}
