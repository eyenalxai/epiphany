import { Player } from "@/components/player"
import ReactPlayer from "react-player"

export default function Home() {
	return (
		<main>
			<Player src={"/1.mp4"} startPosition="left" />
			<Player src={"/1.mp4"} startPosition="right" />
		</main>
	)
}
