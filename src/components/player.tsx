"use client"
import { useEffect, useRef, useState } from "react"
import ReactPlayer from "react-player"

interface PlayerProps {
	src: string
}

export const Player = ({ src }: PlayerProps) => {
	const [hasWindow, setHasWindow] = useState(false)
	const playerRef = useRef<ReactPlayer | null>(null)
	const audioContextRef = useRef<AudioContext | null>(null)
	const pannerRef = useRef<PannerNode | null>(null)
	const sourceRef = useRef<MediaElementAudioSourceNode | null>(null)

	useEffect(() => {
		if (typeof window !== "undefined") {
			setHasWindow(true)
			audioContextRef.current = new AudioContext()
			pannerRef.current = audioContextRef.current.createPanner()
			pannerRef.current.panningModel = "HRTF"
			pannerRef.current.distanceModel = "inverse"
		}

		return () => {
			audioContextRef.current?.close()
		}
	}, [])

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

			// Start rotating 3D sound effect
			let angle = 0
			const radius = 1 // Radius of the circle
			const interval = setInterval(() => {
				if (pannerRef.current && audioContextRef.current) {
					const x = radius * Math.cos(angle)
					const z = radius * Math.sin(angle)
					pannerRef.current.positionX.setValueAtTime(
						x,
						audioContextRef.current.currentTime
					)
					pannerRef.current.positionY.setValueAtTime(
						0,
						audioContextRef.current.currentTime
					)
					pannerRef.current.positionZ.setValueAtTime(
						z,
						audioContextRef.current.currentTime
					)
					angle += 0.05
				}
			}, 100)

			return () => clearInterval(interval)
		}
	}

	if (!hasWindow) return null

	return <ReactPlayer ref={playerRef} url={src} controls onPlay={handlePlay} />
}
