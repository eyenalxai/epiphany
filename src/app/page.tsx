import { Player } from "@/components/player"
import ReactPlayer from "react-player"

export default function Home() {
	return (
		<main>
			<Player src={"/1.mp4"} direction="left" />{" "}
			<Player src={"/2.mp4"} direction="right" />
		</main>
	)
}
