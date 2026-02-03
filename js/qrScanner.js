document.addEventListener("DOMContentLoaded", () => {
  const resultElement = document.getElementById("qrResult");
  const html5QrCode = new Html5Qrcode("reader");

  function onScanSuccess(decodedText) {
    resultElement.innerText = "Opening link: " + decodedText;

    html5QrCode.stop().then(() => {
      // Open scanned QR link
      window.location.href = decodedText;
    });
  }

  function onScanFailure(error) {
    // Ignore scan errors
  }

  // Force BACK camera
  const cameraConfig = {
    facingMode: { exact: "environment" }
  };

  html5QrCode.start(
    cameraConfig,
    {
      fps: 10,
      qrbox: 250
    },
    onScanSuccess,
    onScanFailure
  ).catch(err => {
    console.error(err);
    resultElement.innerText = "Back camera not available or permission denied";
  });
});
