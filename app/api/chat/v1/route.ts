import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const data = await req.json();
		console.log(data);

		// Hardcoded response
		const response = `# Understanding Modern JavaScript Development

		JavaScript has evolved significantly since its inception in 1995. Today, it's not just a language for adding interactivity to websites, but a robust platform for building complex applications.
		
		## Core Concepts
		
		Modern JavaScript development encompasses several key areas that every developer should understand:
		
		### 1. Asynchronous Programming
		Modern JavaScript heavily relies on asynchronous programming patterns. The introduction of Promises and async/await syntax has revolutionized how we handle operations like API calls, file operations, and other time-consuming tasks.
		
		### 2. Modern Tooling
		The JavaScript ecosystem includes various tools that enhance development:
		* Bundlers like webpack and Vite
		* Transpilers like Babel
		* Type checkers like TypeScript
		* Package managers like npm and yarn
		
		### 3. Performance Optimization
		When building JavaScript applications, performance is crucial. This includes:
		* Bundle size optimization
		* Code splitting strategies
		* Tree shaking unused code
		* Implementing lazy loading
		* Proper memory management
		
		## Best Practices
		Following established best practices helps maintain code quality:
		1. Always use strict mode to catch common mistakes
		2. Implement comprehensive error handling
		3. Write unit tests for critical functionality
		4. Follow consistent coding standards
		5. Use modern language features appropriately

		Remember that JavaScript is constantly evolving, with new features being added through the TC39 proposal process. Staying updated with these changes while maintaining backward compatibility is crucial for modern web development.
		`;

		return NextResponse.json({ role: "assistant", content: response });
	} catch (error) {
		console.error("Error in chat API:", error);

		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
