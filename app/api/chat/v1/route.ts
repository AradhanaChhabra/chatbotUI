import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const data = await req.json();
		console.log(data);

		// Hardcoded response
		const botResponse = "Hello! I'm a chatbot. How can I assist you today?";

		return NextResponse.json({ response: botResponse });
	} catch (error) {
		console.error("Error in chat API:", error);

		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
