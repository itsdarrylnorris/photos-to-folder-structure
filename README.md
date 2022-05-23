<h1 align="center">Photos To Folder Structure</h3>
<h3 align="center">Opinionated Folder Structure For Photos App Export </h3>

<p align="center">
  <em> Cameras: GoPro · iPhone · Sony</em>
</p>

## Intro

**Photos To Folder Structure** is an opinionated folder structure to organize your media after exporting from the Photos app. It uses the file name to determine the folder structure.

- It changes the files from a flat structure
  ![From](/documentation/from.png)

- To a well structure folder, which you can modify before running the script.
  ![To](/documentation/to.png)

## Background

For many years, I used the Photos apps to organize all my media and browse my media. However, I ran into many issues, and I have decided to move away from the Photos app. Here is the list of the problems I ran into:

- **Backing up solutions:** The photos app works very well with iCloud to backup all your content. However, iCloud does not support more than 2TB worth of content, and it can only sync up with Apple products. In theory, I can just backup the entire Photos app, but this adds like 30% more storage, and it has a lot of unnecessary data. Storing a 2TB + blob can take a really long time and introduce issues. Lastly, when making changes to the Photos app, this can change the file structure and update the photos app database, which can take longer to backup data.

- **Unsupported Formats:** I recently purchased a Sony A7IV, and they do not fully support the Sony A7IV photos/ videos formats.

## Requirements:
- Git
- Mac
- Node & NPM

## How to use:

- Export all your photos and videos as "Unmodified" Original, and with subfolder format "Momement Name"
- Download and setup this project:

```bash
### Clone the repository
git clone git@github.com:itsdarrylnorris/photos-to-folder-structure.git

### Download dependencies
npm install

### Create environment variable file.
touch .env

```

- Add these enviroment variables to your folder:

```
##
# Directory Path - Where the files export it's going to be.
##
DIRECTORY_PATH="/Users/<USERNAME>/Media/Export"

# iPhone Support
IPHONE_VIDEOS_FILES_STRUCTURE="IPhone/Photos"
IPHONE_PHOTOS_FILES_STRUCTURE="IPhone/Videos"

# DJI Drone Support
DRONE_VIDEO_FILE_STRUCTURE="DJI Mini 2/Videos"
DRONE_PHOTOS_FILE_STRUCTURE="DJI Mini 2/Photos"

# GoPRO Support
GOPRO_VIDEO_FILE_STRUCTURE="GoPro/Videos"
GOPRO_PHOTOS_FILE_STRUCTURE="GoPro/Photos"

# Sony camera
SONY_VIDEO_FILE_STRUCTURE="Sony A7IV/Videos"
SONY_PHOTOS_FILE_STRUCTURE="Sony A7IV/Photos"
SONY_XML_FILE_STRUCTURE="Sony A7IV/XML"

```
- Update the environment variable `DIRECTORY_PATH` to directory of the folder where you export your data.
- [Optional] You can change the structure of the folder by modifying those formats.
- Run the script `node index.js`
