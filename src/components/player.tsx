"use client"
import { cn } from "@/lib/utils"
import {
	type Dispatch,
	type SetStateAction,
	useEffect,
	useRef,
	useState
} from "react"
import ReactPlayer from "react-player"

interface PlayerProps {
	src: string
	startPosition: "left" | "right"
	isPlaying: boolean
	setIsPlaying: Dispatch<SetStateAction<boolean>>
	setIsReady: Dispatch<SetStateAction<boolean>>
}

export const Player = ({
	src,
	startPosition,
	isPlaying,
	setIsPlaying,
	setIsReady
}: PlayerProps) => {
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

			// Determine initial angle based on startPosition
			let angle = startPosition === "left" ? Math.PI : 0 // Left starts at 180 degrees, right at 0
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
					angle += 0.05 // Adjust this value for speed of rotation
				}
			}, 100)

			return () => clearInterval(interval)
		}
	}

	if (!hasWindow) return null

	return (
		<div className={cn("flex", "flex-col", "items-start", "justify-start")}>
			<span className={cn("font-semibold", "ml-1")}>
				{startPosition.toLocaleUpperCase()}
			</span>
			<div
				className={cn(
					"flex",
					"justify-center",
					"items-center",
					"border",
					"p-2",
					"rounded-md"
				)}
			>
				<ReactPlayer
					width={"auto"}
					height={"100%"}
					ref={playerRef}
					url={src}
					controls
					onPlay={() => {
						handlePlay()
						setIsPlaying(true)
					}}
					onPause={() => setIsPlaying(false)}
					onReady={() => setIsReady(true)}
					playing={isPlaying}
					loop
				/>
			</div>
		</div>
	)
}
