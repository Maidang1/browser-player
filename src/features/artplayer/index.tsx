import { useEffect, useRef } from "react"
import Artplayer from "artplayer"
import { type Option } from "artplayer/types/option"

interface PlayerProps {
  option: Required<Pick<Option, "url" | "subtitle">>
  getInstance?: <T>(art: Artplayer) => T
}

export default function ArtPlayer({ option, getInstance }: PlayerProps) {
  const artRef = useRef<Artplayer>() as React.MutableRefObject<Artplayer>
  useEffect(() => {
    artRef.current = new Artplayer({
      ...option,
      container: document.getElementById("art-player") as HTMLDivElement,
      fullscreen: true,
      fullscreenWeb: true,
      setting: true,
      playbackRate: true,
    })

    if (getInstance && typeof getInstance === "function") {
      getInstance(artRef.current)
    }

    return () => {
      if (artRef.current && artRef.current.destroy) {
        artRef.current.destroy(false)
      }
    }
  }, [])

  useEffect(() => {
    artRef.current.switchUrl(option.url)
  }, [option.url])
  useEffect(() => {
    artRef.current.subtitle.switch(option.subtitle.url || "", {
      type: option.subtitle?.type || "srt",
    })
  }, [option.subtitle])

  return <div id="art-player" className="h-full w-full"></div>
}
