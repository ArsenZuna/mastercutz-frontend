import {useRef} from "react";

const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse }) => {
	const inputRef = useRef();

	const handleFormSubmit = (e) => {
		e.preventDefault();
		const userMessage = inputRef.current.value.trim();
		if (!userMessage) return;
		inputRef.current.value = "";

		setChatHistory((history) => [...history, {role: "user", text: userMessage}]);

		setTimeout(() => {
			setChatHistory((history) => [...history, {role: "model", text: "Typing..."}]);
			generateBotResponse([...chatHistory, {role: "user",
				text: `Using the details provided above, please address this query: ${userMessage}`}])
		}, 600);
	};

	return (
		<form onSubmit={handleFormSubmit} className="chat-form">
			<input ref={inputRef} placeholder="Message..." className="message-input" required />
			<button type="submit" id="send-message" className="material-symbols-rounded">
				⮝
			</button>
		</form>
	)
}

export default ChatForm;