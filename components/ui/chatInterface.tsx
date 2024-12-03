"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChat } from "@/hooks/useChat";
import { useState } from "react";

const UserMessage = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex max-w-max items-center gap-2 p-3 px-4 rounded-lg text-base  bg-gradient-to-b from-[hsl(60,1.8%,22%,0.75)] to-[hsl(60,1.8%,22%,0)] from-0% to-90% text-[#e5e5e1] border border-[hsla(50,5.8%,40%,0.15)] relative before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_at_left_top,hsla(60,1.8%,22%,0.5)_0,hsla(60,1.8%,22%,0.3)_60%)]">
			<span className="flex text-black font-bold items-center justify-center w-7 h-7 min-h-7 min-w-7 bg-white p-2 rounded-full">
				A
			</span>
			{children}
		</div>
	);
};

const AIMessage = ({ message }: { message: string }) => {
	return (
		<div
			className="!prose !prose-invert p-7 rounded-lg bg-[rgb(25,24,20)] text-[#e5e5e1]"
			dangerouslySetInnerHTML={{ __html: message }}
		/>
	);
};

const EmptyMessageState = () => {
	return (
		<div className="flex flex-col gap-2 w-full h-full items-center align-baseline justify-center text-white">
			<span className="text-5xl font-bold">Good Evening!</span>
			<span className="text-x font-normal">How can I help you today?</span>
		</div>
	);
};

const ChatInterface = () => {
	const [inputMessage, setInputMessage] = useState("");
	const { messages, isLoading, sendMessage } = useChat();

	const messagesContainerRef = useRef<HTMLDivElement>(null);
	const lastMessageRef = useRef<HTMLDivElement>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!inputMessage.trim()) return;

		await sendMessage(inputMessage);
		setInputMessage("");
	};

	const scrollToLatestMessage = useCallback(() => {
		if (lastMessageRef.current && messagesContainerRef.current) {
			const container = messagesContainerRef.current;
			const lastMessage = lastMessageRef.current;
			const containerRect = container.getBoundingClientRect();
			const lastMessageRect = lastMessage.getBoundingClientRect();

			const isFullyVisible =
				lastMessageRect.top >= containerRect.top &&
				lastMessageRect.bottom <= containerRect.bottom;

			if (isFullyVisible) {
				// If the message is fully visible, scroll to its bottom
				container.scrollTop = container.scrollHeight - container.clientHeight;
			} else {
				// If not fully visible, bring the top of the message to the center of the screen
				const containerHeight = container.clientHeight;
				const scrollPosition =
					lastMessage.offsetTop - container.offsetTop - containerHeight / 2;
				container.scrollTo({ top: scrollPosition, behavior: "smooth" });
			}
		}
	}, []);

	useEffect(() => {
		scrollToLatestMessage();
	}, [messages, scrollToLatestMessage]);

	return (
		<div className="flex flex-col h-full items-center max-w-3xl w-full overflow-hidden">
			<div
				className="flex-grow overflow-auto px-16 mx-auto flex flex-col items-start w-full self-center"
				ref={messagesContainerRef}
			>
				{messages.length === 0 ? (
					<EmptyMessageState />
				) : (
					messages.map((message, index) => (
						<div
							key={index}
							className="text-left mb-4 "
							ref={index === messages.length - 1 ? lastMessageRef : null}
						>
							{message.role === "assistant" ? (
								<AIMessage message={message.content} />
							) : (
								<UserMessage>{message.content.trim()}</UserMessage>
							)}
						</div>
					))
				)}
			</div>

			<div className="max-auto sticky bottom-0 w-full rounded-t-lg  p-4  bg-[#393937]">
				<form onSubmit={handleSubmit} className="p-4 ">
					<div className="flex space-x-2">
						<Input
							type="text"
							placeholder="Type your message..."
							value={inputMessage}
							onChange={(e) => setInputMessage(e.target.value)}
							disabled={isLoading}
							autoFocus
							className="flex-grow text-xl px-4 py-3 border-none rounded-full focus:border-none focus-visible:!outline-none focus-visible:ring-0"
							inputMode="text"
						/>
						<Button type="submit" disabled={isLoading}>
							{isLoading ? "Loading..." : "Send"}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export { ChatInterface };
