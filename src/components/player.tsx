"use client"
import { useEffect, useRef, useState } from "react"
import ReactPlayer from "react-player"

interface PlayerProps {
	src: string
	direction: "left" | "right"
}

export const Player = ({ src, direction }: PlayerProps) => {
	const [hasWindow, setHasWindow] = useState(false)
	const playerRef = useRef<ReactPlayer | null>(null)
	const audioContextRef = useRef<AudioContext | null>(null)
	const pannerRef = useRef<StereoPannerNode | null>(null)
	const sourceRef = useRef<MediaElementAudioSourceNode | null>(null)

	useEffect(() => {
		if (typeof window !== "undefined") {
			setHasWindow(true)
			audioContextRef.current = new AudioContext()
			pannerRef.current = audioContextRef.current.createStereoPanner()
			pannerRef.current.pan.value = direction === "left" ? -1 : 1
		}

		return () => {
			audioContextRef.current?.close()
		}
	}, [direction])

	const handlePlay = async () => {
		if (audioContextRef.current?.state === "suspended") {
			await audioContextRef.current.resume()
		}

		if (playerRef.current && audioContextRef.current && pannerRef.current) {
			const audioElement =
				playerRef.current.getInternalPlayer() as HTMLMediaElement
			if (audioElement && !sourceRef.current) {
				sourceRef.current =
					audioContextRef.current.createMediaElementSource(audioElement)
				sourceRef.current
					.connect(pannerRef.current)
					.connect(audioContextRef.current.destination)
			}
		}
	}

	if (!hasWindow) return null

	return <ReactPlayer ref={playerRef} url={src} controls onPlay={handlePlay} />
}
