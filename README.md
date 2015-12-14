# slash-data
Slash data is chrome extension for beta.ons.gov.uk that toggles between the webpage and the underlying JSON data.

## Installing
1. Obviously, you first have to be using Chrome browser! 
2. Download the contents of this Git repo, unzip and it into a folder, with any name you like (note: for the timebeing this folder needs to remain in the same location for the extension to continue working).
3. Enable extensions developer mode at chrome://extensions, if it isn't already.
4. Click 'load unpacked extension' and select the folder you've just created for the contents of this repo.
5. Check that Chrome has enabled the extension, which is should do automatically.

## Usage
Toggle the data by pressing 'Ctrl+Shift+U'.

## To do list
- ~~Add support for all ONS beta environments, local and live.~~
- Fix bug on /datalist end point.
- Use the Chrome commands API, so you can choose which keyboard shortcut they want for the toggle.
- Package extension into a single file (.crx?).
