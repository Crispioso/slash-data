# slash data
'slash data' is a chrome extension for beta.ons.gov.uk that toggles between the webpage and the underlying JSON data.

## Installing
First, obviously, you need to be using Chrome browser! You then have two options:

### Using a crx file
1. Download the .crx file from [Google Drive](https://drive.google.com/file/d/0B3WgKEr6-s_HVlFUcUxkeEo1cU0/view?usp=sharing).
2. Drag and drop it onto the chrome://extensions page.
3. Check it's enabled.

### From GitHub
1. Download the contents of this Git repo, unzip and put it into a folder with any name you like (note: this folder needs to remain in the same location for the extension to continue working).
2. Enable extensions developer mode at chrome://extensions, if it isn't already.
3. Click 'load unpacked extension' and select the folder you've just created for the contents of this repo.
4. Check that Chrome has enabled the extension, which it should do automatically.

## Usage
Toggle the data by pressing 'Ctrl+Shift+U'.

The keyboard shortcut can be changed in chrome://extensions ('Keyboard shortcuts' is as the very bottom of that page).

## To do list
- ~~Add support for all ONS beta environments, local and live.~~
- ~~Use the Chrome commands API, so you can choose which keyboard shortcut you want for the toggle.~~
- ~~Package extension into a single file (.crx?).~~
- Fix bug on pages that contain 'data' in the URL somewhere else.
- Add other end points, such as /publications.
