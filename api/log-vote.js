import { MongoClient, ServerApiVersion } from 'mongodb';
import crypto from 'crypto';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { wallet, vote } = req.body;
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  if (!wallet || !vote) {
    return res.status(400).json({ error: 'Missing wallet or vote' });
  }

  const ipHash = crypto.createHash('sha256').update(ip).digest('hex');

  try {
    await client.connect();
    const db = client.db('potuscoin'); // you can name this however you like
    const collection = db.collection('voterLogs');

    // Reject duplicate vote attempts
    const existing = await collection.findOne({
      $or: [{ wallet }, { ipHash }]
    });

    if (existing) {
      return res.status(409).json({ error: 'Vote already recorded from this wallet or IP' });
    }

    await collection.insertOne({
      wallet,
      vote,
      ipHash,
      timestamp: new Date()
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Vote logging error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await client.close();
  }
}
