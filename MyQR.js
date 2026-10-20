"use strict";

const API_URL = "https://api.qrserver.com/v1/create-qr-code/";
const QR_SIZE = 300;

const form     = document.getElementById("qr-form");
const input    = document.getElementById("txt");
const generate = document.getElementById("generate");
const message  = document.getElementById("message");
const frame    = document.getElementById("frame");
const holder   = document.getElementById("placeholder");
const qrImage  = document.getElementById("qrim");
const actions  = document.getElementById("actions");
const download = document.getElementById("download");
const clearBtn = document.getElementById("clear");

let currentUrl = "";

function setMessage(text, isError = false) {
    message.textContent = text;
    message.classList.toggle("is-error", isError);
    input.setAttribute("aria-invalid", String(isError));
}

function buildUrl(text) {
    return `${API_URL}?size=${QR_SIZE}x${QR_SIZE}&margin=0&format=png&data=${encodeURIComponent(text)}`;
}

function showEmpty() {
    qrImage.hidden = true;
    qrImage.removeAttribute("src");
    actions.hidden = true;
    holder.hidden = false;
    frame.classList.add("is-empty");
    frame.classList.remove("is-loading");
    currentUrl = "";
}

function generateQR(event) {
    event.preventDefault();
    const text = input.value.trim();

    if (!text) {
        showEmpty();
        setMessage("Enter some text or a link first.", true);
        input.focus();
        return;
    }

    setMessage("Generating...");
    generate.disabled = true;
    frame.classList.add("is-loading");
    currentUrl = buildUrl(text);

    qrImage.onload = () => {
        holder.hidden = true;
        qrImage.hidden = false;
        actions.hidden = false;
        frame.classList.remove("is-empty", "is-loading");
        generate.disabled = false;
        setMessage("Your QR code is ready.");
    };

    qrImage.onerror = () => {
        showEmpty();
        generate.disabled = false;
        setMessage("Could not load the QR code. Check your internet connection and try again.", true);
    };

    qrImage.src = currentUrl;
}

async function downloadQR() {
    if (!currentUrl) return;
    try {
        const response = await fetch(currentUrl);
        if (!response.ok) throw new Error("Bad response");
        const blob = await response.blob();
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "myqr.png";
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(link.href);
    } catch (err) {
        // Fallback: open the image so it can be saved manually
        window.open(currentUrl, "_blank", "noopener");
    }
}

function clearAll() {
    input.value = "";
    showEmpty();
    setMessage("");
    input.focus();
}

form.addEventListener("submit", generateQR);
download.addEventListener("click", downloadQR);
clearBtn.addEventListener("click", clearAll);
input.addEventListener("input", () => {
    if (input.getAttribute("aria-invalid") === "true") setMessage("");
});
