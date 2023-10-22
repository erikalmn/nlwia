import ytdl from "ytdl-core"
import fs from "fs"

export const download = (videoId) =>
  new Promise((resolve, reject) => {
    const videoURL = "https://www.youtube.com/shorts/" + videoId

    console.log("Downloading...")

    ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
      .on("info", (info) => {
        const seconds = info.formats[0].approxDurationMs / 1000

        if (seconds > 60) {
          throw new Error("Video length is longer than 60 seconds")
        }
      })
      .on("end", () => {
        console.log("Download completed!")
        resolve()
      })
      .on("error", (error) => {
        console.log("Unable to download:", error)
        reject(error)
      })
      .pipe(fs.createWriteStream("./tmp/audio.mp4"))
  })
