"use client";

import { useState } from "react";
import { useToast } from "./use-toast";

export type Message = {
	content: string;
	role: "assistant" | "user";
};

export function useChat() {
	const [messages, setMessages] = useState<Message[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const { toast } = useToast();

	const sendMessage = async (message: string) => {
		if (!message.trim()) return;

		setIsLoading(true);
		setMessages((prev) => [...prev, { content: message, role: "user" }]);

		try {
			const response = await fetch("/api/chat/v1", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message }),
			});

			if (!response.ok) {
				throw new Error("Failed to get response");
			}

			const data = await response.json();
			console.log(data);
			setMessages((prev) => [...prev, data]);
		} catch (error) {
			console.error("Error:", error);

			toast({
				title: "Error",
				description: "Failed to get response from the chatbot.",
				variant: "destructive",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return {
		messages,
		isLoading,
		sendMessage,
	};
}
