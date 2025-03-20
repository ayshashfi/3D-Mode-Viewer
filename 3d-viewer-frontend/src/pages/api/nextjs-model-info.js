export default function handler(req, res) {
  if (req.method === "GET") {
      res.status(200).json({
          scale: "1.0",
          face_count: 2500,
          source: "Next.js Backend"
      });
  } else {
      res.status(405).json({ message: "Method Not Allowed" });
  }
}
