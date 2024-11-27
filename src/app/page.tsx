"use client"

import { Player } from "@/components/player"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useState } from "react"

export default function Home() {
	const [isPlaying, setIsPlaying] = useState(false)
	const [isReady, setIsReady] = useState(false)

	const [sourceOne, setSourceOne] = useState("")
	const [sourceTwo, setSourceTwo] = useState("")

	return (
		<div className={cn("w-full", "flex", "flex-col", "gap-4")}>
			<Input
				placeholder="Link one"
				onChange={(e) => setSourceOne(e.target.value)}
			/>
			<Input
				placeholder="Link one"
				onChange={(e) => setSourceTwo(e.target.value)}
			/>
			<Button
				disabled={!isReady || !sourceOne || !sourceTwo}
				onClick={() => setIsPlaying((prev) => !prev)}
				className={cn("w-24")}
			>
				{isPlaying ? "Pause" : "Play"}
			</Button>
			<div className={cn("grid", "grid-cols-2", "gap-2", "max-h-96")}>
				<Player
					src={sourceOne}
					startPosition="left"
					isPlaying={isPlaying}
					setIsPlaying={setIsPlaying}
					setIsReady={setIsReady}
				/>
				<Player
					src={sourceTwo}
					startPosition="right"
					isPlaying={isPlaying}
					setIsPlaying={setIsPlaying}
					setIsReady={setIsReady}
				/>
			</div>
		</div>
	)
}
