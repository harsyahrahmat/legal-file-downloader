```js
// server.js
import express from "express";
import fetch from "node-fetch";
import path from "path";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";


dotenv.config();


const __dirname = path.resolve();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Rate limiter (basic)
const limiter = rateLimit({
windowMs: 60 * 1000, // 1 minute
max: 30, // max 30 requests per minute per IP
standardHeaders: true,
legacyHeaders: false,
});
app.use(limiter);


// Serve frontend
app.use(express.static(path.join(__dirname, 'public')));


// Basic allowlist for hosts (optional): jika mau batasi domain yang boleh di-proxy
const HOST_WHITELIST = (process.env.HOST_WHITELIST || '').split(',').map(s => s.trim()).filter(Boolean);


function isAllowedHost(url) {
if (!HOST_WHITELIST.length) return true; // jika kosong => izinkan semua
try {
const u = new URL(url);
return HOST_WHITELIST.includes(u.hostname);
} catch (e) {
return false;
}
}


app.post('/download', async (req, res) => {
const { url } = req.body;
if (!url) return res.status(400).json({ error: 'Missing url' });


if (!isAllowedHost(url)) {
return res.status(400).json({ error: 'Host not allowed by server config' });
}


try {
const response = await fetch(url, { redirect: 'follow', timeout: 30000 });


if (!response.ok) return res.status(400).json({ error: 'Failed to fetch file (remote error)' });


```
