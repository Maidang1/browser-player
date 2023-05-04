import { useEffect, useState } from "react"
import { doTranscode } from "../ffmpeg"

export const DEFAULT_VIDEO_URL = "/01.ts"
export const DEFAULT_SUBTITLE_OPTION = {
  url: "./01.srt",
  type: "srt",
}

export const getVideoUrl = async (url: any) => {
  let videoUrl = url
  if (!videoUrl.name.endsWith(".mp4")) {
    videoUrl = await doTranscode(videoUrl)
  } else {
    videoUrl = URL.createObjectURL(url)
  }

  return videoUrl
}
