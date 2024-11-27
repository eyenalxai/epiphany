import { Player } from "@/components/player"
import { cn } from "@/lib/utils"
import ReactPlayer from "react-player"

export default function Home() {
	return (
		<div className={cn("grid", "grid-cols-2", "gap-2", "max-h-96")}>
			<Player src={"/1.mp4"} startPosition="left" />
			<Player src={"/2.mp4"} startPosition="right" />
		</div>
	)
}
