# MyQR - QR Code Generator

A simple, clean web app that turns any text, number or link into a QR code. Type something, click Generate, and download the result as a PNG image.

Built with plain HTML, CSS and JavaScript. No frameworks, no installation.

## Features

- Generate a QR code from text, numbers or links
- Press Enter or click Generate
- Download the QR code as a PNG
- Clear button to start over
- Error messages for empty input or a failed request
- Responsive layout for phones and desktops
- Keyboard-friendly, with visible focus outlines

## How to run

1. Download or clone this repository.
2. Keep `index.html`, `MyQR.css` and `MyQR.js` in the same folder.
3. Open `index.html` in any browser.

An internet connection is required (see "How it works").

## How it works

The project is split into three files, each with one job:

| File | Purpose |
|------|---------|
| `index.html` | Page structure: the form, the QR preview area and the buttons |
| `MyQR.css` | All styling: colors, layout, responsive design |
| `MyQR.js` | Logic: reads the input, requests the QR code, shows or downloads it |

Steps when you click Generate:

1. JavaScript reads the text from the input box.
2. If it is empty, an error message is shown.
3. Otherwise, the text is encoded with `encodeURIComponent` and sent to the free [QR Server API](https://goqr.me/api/).
4. The API returns a QR code image, which is displayed on the page.
5. Download PNG fetches the image and saves it as `myqr.png`.

> Privacy note: The text you enter is sent to the QR Server API to create the image. Do not enter passwords or private information.

## Problems faced and how they were solved

- Messy layout. The first version positioned every element with `position: absolute` and percentage offsets, so items could overlap on different screen sizes. I replaced it with a centered card using Flexbox and Grid, which also works on mobile.
- Everything in one file. The JavaScript lived inside the HTML. I separated the project into HTML, CSS and JS files to keep it easier to read and maintain.
- Broken favicon. The icon pointed to a path on my own computer (`C:\Users\...`), which doesn't work for anyone else. I replaced it with a built-in icon embedded in the page.
- Empty input. Clicking Generate with nothing typed produced a broken image. I added validation and a clear error message.
- Outside dependency. The QR image comes from an online API, so the app needs internet and the request can fail. I added loading and error states so users know what happened.
- Downloading the image. Because the image comes from another website, browsers can block a direct download. The code fetches the image first and, if that fails, opens it in a new tab so it can be saved manually.

## Possible improvements

- Generate QR codes offline with a JavaScript QR library
- Options for QR size and colors
- Copy-to-clipboard button

## License

MIT License. Free to use and modify.
