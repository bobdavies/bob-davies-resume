// QR Code Generation
document.addEventListener('DOMContentLoaded', function() {
    const qrcode = new QRCode(document.getElementById("qrcode"), {
        text: "https://your-portfolio-url.com", // Replace with your actual portfolio URL
        width: 180,
        height: 180,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
});
