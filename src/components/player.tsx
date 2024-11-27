"use client"

import { use, useEffect, useState } from "react"
import ReactPlayer from "react-player/youtube"

export const Player = () => {
	const [hasWindow, setHasWindow] = useState(false)

	useEffect(() => {
		if (typeof window !== "undefined") {
			setHasWindow(true)
		}
	}, [])

	if (!hasWindow) return null

	return <ReactPlayer url="https://www.youtube.com/watch?v=LXb3EKWsInQ" />
}
