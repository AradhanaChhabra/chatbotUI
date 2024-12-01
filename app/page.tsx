import { ChatInterface } from "@/components/ui/chatInterface";

export default function Home() {
	return (
		<main className="flex flex-col items-center justify-center bg-[#2B2A27] py-[18px]">
			<h1 className="text-2xl font-bold mb-4 text-white">Claude AI</h1>
			<ChatInterface />
		</main>
	);
}
