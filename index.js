import fs from 'fs/promises'
import regularFs from 'fs'
import dayjs from 'dayjs'
import makeDir from 'make-dir'
import { moveFile } from 'move-file'
import 'dotenv/config'

const directoryPath = process?.env?.DIRECTORY_PATH
const iPhoneVideoFileStructure = process?.env?.IPHONE_VIDEOS_FILES_STRUCTURE
const iPhonePhotoFileStructure = process?.env?.IPHONE_PHOTOS_FILES_STRUCTURE
const DroneVideoFileStructure = process?.env?.DRONE_VIDEO_FILE_STRUCTURE
const DronePhotosFileStructure = process?.env?.DRONE_PHOTOS_FILE_STRUCTURE
const GoproVideoFileStructure = process?.env?.GOPRO_VIDEO_FILE_STRUCTURE
const GoproPhotosFileStructure = process?.env?.GOPRO_PHOTOS_FILE_STRUCTURE
const ScreenRecording = 'ScreenRecording'

/**
 * Renames the top folders.
 * From: May 3, 2022 -> To: 2022-05-03.
 */
let renamingTopFolders = async () => {
  try {
    const filesInDirectory = await getFilesInADirectory(directoryPath)
    // @TODO: Filter out files or folders with the correct dates?

    try {
      await Promise.all(
        filesInDirectory.map((item) => {
          return fs.rename(`${directoryPath}/${item}`, `${directoryPath}/${dayjs(item).format('YYYY-MM-DD')}`)
        }),
      )
    } catch (error) {
      console.error('[renamingTopFiles] Something went wrong', error)
    }

    console.log('[renamingTopFiles] Done Updating files')
  } catch (e) {
    console.error('[renamingTopFiles] Something when wrong getting the files.', error)
  }
}

/**
 * Get's all folders and files from a directory.
 *
 * Similar as doing: ls -al in Linux.
 *
 * @param {*} path
 * @returns
 */
let getFilesInADirectory = async (path) => {
  return (await fs.readdir(path)).filter((item) => {
    return item !== '.DS_Store'
  })
}

/**
 * Check if folder it's created and if not, creates one.
 * @param {*} folder
 */
let createDirectory = async (folder) => {
  if (!regularFs.existsSync(folder)) {
    await makeDir(folder)
    console.log(`[createDirectory] Folder Created Successfully. ${folder}`)
  }
}

/**
 * Moves the media file, and it creates file structure if needed.
 *
 * @param {*} source
 * @param {*} destination
 */
let moveMediaFile = async (source, destination) => {
  // Getting the destination file struture to see if we go create the directory or not.
  let destinationArray = destination.split('/')
  // Removing the file
  destinationArray.pop()

  // Get's the path of the destination
  let destinationPath = destinationArray.join('/')

  try {
    // Creates a file if necessary.
    await createDirectory(destinationPath)
  } catch (error) {
    console.error(`[moveMediaFile] Failed to create directory ${destinationPath}`)
  }

  try {
    await moveFile(source, destination)
    console.log(`[moveMediaFile] Move file ${source} --> ${destination}`)
  } catch (error) {
    console.error(`[moveMediaFile] Failed to move file ${source} --> ${destination}`)
  }
}

let createSubFolderStructure = async () => {
  try {
    const filesInDirectory = await getFilesInADirectory(directoryPath)

    for (const key in filesInDirectory) {
      let fileInDirectory = filesInDirectory[key]

      let subFiles = await getFilesInADirectory(`${directoryPath}/${fileInDirectory}`)

      for (const subFileKey in subFiles) {
        const individualFile = subFiles[subFileKey]
        let sourceFile = `${directoryPath}/${fileInDirectory}/${individualFile}`
        let basePath = `${directoryPath}/${fileInDirectory}`

        // In case it's not a file
        if (!sourceFile.includes('.')) {
          continue
        }

        // This means they are screen recording from the website.
        if (individualFile.includes('Screen Recording')) {
          await moveMediaFile(sourceFile, `${basePath}/${ScreenRecording}/${individualFile}`)
        }

        // This means it's from the drone.
        else if (individualFile.toLowerCase().includes('dji_')) {
          if (individualFile.toLowerCase().includes('.mp4')) {
            await moveMediaFile(sourceFile, `${basePath}/${DroneVideoFileStructure}/${individualFile}`)
          } else if (individualFile.toLowerCase().includes('.jpg')) {
            await moveMediaFile(sourceFile, `${basePath}/${DronePhotosFileStructure}/${individualFile}`)
          }
        }

        // This means it's from GoPRO
        else if (individualFile.includes('G00') || individualFile.includes('GOPR0') || individualFile.includes('GX')) {
          if (individualFile.toLowerCase().includes('.mp4')) {
            await moveMediaFile(sourceFile, `${basePath}/${GoproVideoFileStructure}/${individualFile}`)
          } else if (individualFile.toLowerCase().includes('.jpg')) {
            await moveMediaFile(sourceFile, `${basePath}/${GoproPhotosFileStructure}/${individualFile}`)
          }
        }

        // This means it's from iPhone
        else if (individualFile.includes('IMG_') || individualFile.includes('APC_')) {
          // This means it's an iPhone videos.
          if (individualFile.toLowerCase().includes('.mov')) {
            await moveMediaFile(sourceFile, `${basePath}/${iPhoneVideoFileStructure}/${individualFile}`)
          }

          // It means it's a iPhone photo
          else if (
            individualFile.toLowerCase().includes('.heic') ||
            individualFile.toLowerCase().includes('.jpg') ||
            individualFile.toLowerCase().includes('.jpeg') ||
            individualFile.toLowerCase().includes('.dng')
          ) {
            await moveMediaFile(sourceFile, `${basePath}/${iPhonePhotoFileStructure}/${individualFile}`)
          } else if (individualFile.toLowerCase().includes('.mp4')) {
            await moveMediaFile(sourceFile, `${basePath}/${iPhoneVideoFileStructure}/${individualFile}`)
          }
        }
        if (individualFile.toLowerCase().includes('.mov')) {
          await moveMediaFile(sourceFile, `${basePath}/${iPhoneVideoFileStructure}/${individualFile}`)
        } else {
          console.log('[createSubFolderStructure] Unknown File', sourceFile)
        }
      }
    }
  } catch (error) {
    console.log('[createSubFolderStructure] Something went wrong', error)
  }
}

;(async () => {
  // Running this first
  await renamingTopFolders()

  await createSubFolderStructure()
})()