import { FFmpeg, createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg"

let ffmpeg: FFmpeg = null as unknown as FFmpeg

export const initFFmpeg = () => {
  ffmpeg = createFFmpeg({ log: true })
}

export const doTranscode = async (videoPath: string) => {
  await ffmpeg.load()
  ffmpeg.FS("writeFile", "test.ts", await fetchFile(videoPath))
  await ffmpeg.run("-i", "test.ts", "test.mp4")
  const data = ffmpeg.FS("readFile", "test.mp4")
  return URL.createObjectURL(new Blob([data.buffer], { type: "video/mp4" }))
}
