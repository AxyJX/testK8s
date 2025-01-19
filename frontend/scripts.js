/* eslint-disable no-unused-vars */
const linkInputContainer = document.getElementById('linkInputContainer');
const wifiInputContainer = document.getElementById('wifiInputContainer');
const linkInput = document.getElementById('linkInput');
const ssidInput = document.getElementById('ssidInput');
const passwordInput = document.getElementById('passwordInput');
const qrcodeContainer = document.getElementById('qrcode');
const downloadBtn = document.getElementById('downloadBtn');

function showLinkInput() {
  linkInputContainer.classList.remove('hidden');
  wifiInputContainer.classList.add('hidden');
  qrcodeContainer.innerHTML = '';
  downloadBtn.disabled = true;
}

function showWifiInput() {
  linkInputContainer.classList.add('hidden');
  wifiInputContainer.classList.remove('hidden');
  qrcodeContainer.innerHTML = '';
  downloadBtn.disabled = true;
}

function generateQRCode() {
  let url = '';
  if (!linkInputContainer.classList.contains('hidden')) {
    url = linkInput.value;
  } else {
    const ssid = ssidInput.value;
    const password = passwordInput.value;
    url = `WIFI:T:WPA;S:${ssid};P:${password};;`;
  }

  if (url) {
    QRCode.toDataURL(url, { width: 500, height: 500, errorCorrectionLevel: 'H' }, (err, url) => {
      if (err) {
        console.error(err);
        return;
      }
      qrcodeContainer.innerHTML = `<img src="${url}" alt="Generated QR code" width="500" height="500"/>`;
      downloadBtn.disabled = false;
      downloadBtn.onclick = () => {
        const a = document.createElement('a');
        a.href = url;
        a.download = 'qrcode.png';
        a.click();
      
        // Send QR code to the backend
        fetch('http://localhost:5000/save_qr', {
          method: 'POST',  // Ensure this is set to POST
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ qr_code: url }),
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
      };
    });
  } else {
    qrcodeContainer.innerHTML = '';
    downloadBtn.disabled = true;
  }
}

linkInput.addEventListener('input', generateQRCode);
ssidInput.addEventListener('input', generateQRCode);
passwordInput.addEventListener('input', generateQRCode);
