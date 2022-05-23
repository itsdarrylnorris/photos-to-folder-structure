<h1 align="center">Photos To Folder Structure</h3>
<h3 align="center"> Opinionated Folder Structure From Mac Export </h3>

<p align="center">
  <em> Cameras: GoPros · iPhones · Sony</em>
</p>

## Intro

**Photos To Folder Structure** is an opinionated folder structure to organize your media after exporting from the Photos app. It uses the default file format figure how the location on how to storage.

## Background

For many years, I used the Photos apps to organize all my media and browsers around my media. However, I ran into many issues, and I have decided to move away from the Photos app. Here is the list of the problems I ran into:

- **Backing up solutions:** The photos app works very well with iCloud to backup all your content. However, iCloud does not support more than 2TB worth of content, and it can only sync up with Apple products. In theory, I can just backup the entire Photos app, but this adds like 30% more storage, and it has a lot of unnecessary data, and I ran into issues trying to sync up all this data. Most importantly, if I make changes across multiple files, this will affect the Photo app database, which makes data syncing take a lot longer than it should be.

- **Unsupported Formats:** I recently purchased a Sony A7IV, and they do not fully support the Sony A7IV photos/ videos formats.

## Requirements:

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
DIRECTORY_PATH="/Users/darrylnorris/Desktop/test-photos"

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

- [Optional] You can change the structure of the folder by modifying those formats.
- Run the script `node index.js`
