"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChat } from "@/hooks/useChat";
import { useState } from "react";
// import Markdown from "react-markdown";

const ChatInterface = () => {
	const [inputMessage, setInputMessage] = useState("");
	const { messages, isLoading, sendMessage } = useChat();

	const [hide, setHide] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!inputMessage.trim()) return;

		await sendMessage(inputMessage);
		setInputMessage("");
	};
	return (
		<div className="flex flex-col h-[600px] max-w-[1000px] w-[1000px] border rounded-lg overflow-hidden">
			<ScrollArea className="flex-grow p-4">
				{messages.map((message, index) => (
					<div
						key={index}
						className={`mb-4 ${message.role === "assistant" ? "text-left mr-12" : "text-right ml-12"}`}
					>
						<div
							className={`inline-block p-3 px-4 rounded-lg text-xs transition-all !delay-150 fade-in-50 ease-in-out ${
								message.role === "assistant"
									? "bg-gray-200 text-gray-800"
									: "bg-blue-500 text-white"
							} ${hide ? "scale-75" : "opacity-85"}`}
							onClick={() => {
								setHide((prev) => !prev);
							}}
						>
							{message.role === "assistant"
								? // <Markdown className="max-w-[600px] text-wrap">
									message.content
								: // </Markdown>
									message.content}
						</div>
					</div>
				))}
			</ScrollArea>
			<form onSubmit={handleSubmit} className="p-4 border-t">
				<div className="flex space-x-2">
					<Input
						type="text"
						placeholder="Type your message..."
						value={inputMessage}
						onChange={(e) => setInputMessage(e.target.value)}
						disabled={isLoading}
					/>
					<Button type="submit" disabled={isLoading}>
						{isLoading ? "Loading..." : "Send"}
					</Button>
				</div>
			</form>
		</div>
	);
};

export { ChatInterface };
