"use client"

import { Player } from "@/components/player"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"

export default function Home() {
	const [isPlaying, setIsPlaying] = useState(false)
	const [isReady, setIsReady] = useState(false)

	return (
		<div className={cn("w-full", "flex", "flex-col", "gap-4")}>
			<Button
				disabled={!isReady}
				onClick={() => setIsPlaying((prev) => !prev)}
				className={cn("w-24")}
			>
				{isPlaying ? "Pause" : "Play"}
			</Button>
			<div className={cn("grid", "grid-cols-2", "gap-2", "max-h-96")}>
				<Player
					src={"/1.mp4"}
					startPosition="left"
					isPlaying={isPlaying}
					setIsPlaying={setIsPlaying}
					setIsReady={setIsReady}
				/>
				<Player
					src={"/2.mp4"}
					startPosition="right"
					isPlaying={isPlaying}
					setIsPlaying={setIsPlaying}
					setIsReady={setIsReady}
				/>
			</div>
		</div>
	)
}
