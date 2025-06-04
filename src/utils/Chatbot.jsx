import { useEffect, useRef, useState } from "react";
import ChatbotIcon from "./chatbot/ChatbotIcon.jsx";
import ChatForm from "./chatbot/ChatForm.jsx";
import ChatMessage from "./chatbot/ChatMessage.jsx";
import { mastercutzInfo } from "./chatbot/DummyChatbotInfo.jsx";

const Chatbox = () => {
	const chatBodyRef = useRef();
	const [showChatbot, setShowChatbot] = useState(false);
	const [chatHistory, setChatHistory] = useState([
		{
			hideInChat: true,
			role: "model",
			text: mastercutzInfo,
		},
	]);
	const generateBotResponse = async (history) => {
		// Helper function to update chat history
		const updateHistory = (text, isError = false) => {
			setChatHistory((prev) => [...prev.filter((msg) => msg.text !== "Thinking..."), { role: "model", text, isError }]);
		};
		// Format chat history for API request
		history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ contents: history }),
		};
		try {
			// Make the API call to get the bot's response
			const response = await fetch(import.meta.env.VITE_CHAT_API_URL, requestOptions);
			const data = await response.json();
			if (!response.ok) throw new Error(data?.error.message || "Something went wrong!");
			// Clean and update chat history with bot's response
			const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
			updateHistory(apiResponseText);
		} catch (error) {
			// Update chat history with the error message
			updateHistory(error.message, true);
		}
	};
	useEffect(() => {
		// Auto-scroll whenever chat history updates
		chatBodyRef.current.scrollTo({ top: chatBodyRef.current.scrollHeight, behavior: "smooth" });
	}, [chatHistory]);

	return (
		<div className={`container text-black ${showChatbot ? "show-chatbot" : ""}`}>
			<button onClick={() => setShowChatbot((prev) => !prev)} id="chatbot-toggler">
				<span className="bg-white rounded-full hover:bg-gray-600 transition-opacity duration-300"><ChatbotIcon/></span>
				<span className="material-symbols-rounded">X</span>
			</button>
			<div className="chatbot-popup">
				{/* Chatbot Header */}
				<div className="chat-header border-b-4 border-black">
					<div className="header-info">
						<ChatbotIcon />
						<h2 className="logo-text">Z</h2>
					</div>
				</div>
				{/* Chatbot Body */}
				<div ref={chatBodyRef} className="chat-body">
					<div className="message bot-message">
						<ChatbotIcon />
						<p className="message-text">
							Hey there! I'm Z, the Mastercutz's chatbot, how can I help you today?
						</p>
					</div>
					{/* Render the chat history dynamically */}
					{chatHistory.map((chat, index) => (
						<ChatMessage key={index} chat={chat} />
					))}
				</div>
				{/* Chatbot Footer */}
				<div className="chat-footer border-t-2 border-black">
					<ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse} />
				</div>
			</div>
		</div>
	);
};
export default Chatbox;