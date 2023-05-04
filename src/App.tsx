import { Grid, Container, Input, FormElement } from "@nextui-org/react"
import { useEffect, useState } from "react"
import { initFFmpeg } from "./features/ffmpeg"
import ArtPlayer from "./features/artplayer"
import { getVideoUrl } from "./features/artplayer/hooks"

export default function Home() {
  useEffect(() => {
    initFFmpeg()
  }, [])

  const [file, setFile] = useState("")
  const [videoUrl, setVideoUrl] = useState("")
  const handleFileChange = (e: React.ChangeEvent<FormElement>) => {
    const file = (e.target as any).files[0]
    setFile(file)
  }
  useEffect(() => {
    if (!file) return
    getVideoUrl(file).then((videoUrl) => setVideoUrl(videoUrl))
  }, [file])
  return (
    <Grid.Container justify="center" className="h-screen">
      <Grid xs={9} md={10}>
        <Container gap={0}>
          <ArtPlayer
            option={{
              url: videoUrl,
              subtitle: {
                url: "./01.srt",
              },
            }}
          />
        </Container>
      </Grid>
      <Grid xs={3} md={2}>
        <Container className="bg-green">
          <Input type="file" onChange={handleFileChange} label="" />
        </Container>
      </Grid>
    </Grid.Container>
  )
}
