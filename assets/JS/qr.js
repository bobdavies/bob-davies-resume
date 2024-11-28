// QR Code Generation
document.addEventListener('DOMContentLoaded', function() {
    const qrContainer = document.getElementById("qrcode");
    
    if (!qrContainer) {
        console.error("QR code container not found!");
        return;
    }

    try {
        const qrcode = new QRCode(qrContainer, {
            text: window.location.href, // Use current URL
            width: 180,
            height: 180,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });
    } catch (error) {
        console.error("Failed to generate QR code:", error);
    }
});
