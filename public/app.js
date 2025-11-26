const btn = document.getElementById('btn');
const clear = document.getElementById('clear');
const urlInput = document.getElementById('url');
const msg = document.getElementById('msg');


btn.addEventListener('click', async () => {
const url = urlInput.value.trim();
if (!url) return showMsg('Masukkan URL dulu');


showMsg('Memproses...');
try {
const res = await fetch('/download', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ url })
});


if (!res.ok) {
const j = await res.json().catch(() => null);
return showMsg('Error: ' + (j?.error || res.statusText));
}


const blob = await res.blob();
const disposition = res.headers.get('content-disposition');
let filename = 'file';
if (disposition) {
const m = disposition.match(/filename="?([^";]+)/);
if (m) filename = m[1];
}


const link = document.createElement('a');
link.href = URL.createObjectURL(blob);
link.download = filename;
document.body.appendChild(link);
link.click();
link.remove();
showMsg('Download started');
} catch (e) {
showMsg('Server error: ' + e.message);
}
});


clear.addEventListener('click', () => { urlInput.value = ''; msg.textContent = ''; });


function showMsg(t) { msg.textContent = t; }
