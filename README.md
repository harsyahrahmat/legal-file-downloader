# Legal File Downloader

Aplikasi ini mem-proxy file dari URL publik ke user. Hanya untuk file yang legal/lo punya izin.

## Run locally

1. copy .env.example -> .env (optional)
2. npm install
3. npm run dev
4. buka http://localhost:3000

## Deploy

Rekomendasi: Render (full app), atau Heroku-like provider.


- Push repo ke GitHub
- Di Render: New -> Web Service -> hubungkan repo, build: `npm install`, start: `npm start`


Untuk domain gratis gunakan Freenom dan arahkan CNAME ke domain Render/Load Balancer.
