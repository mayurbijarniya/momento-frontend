const TypingIndicator = () => {
  return (
    <div className="flex justify-start mb-4">
      <div className="flex items-end gap-2">
        <img
          src="/assets/images/momento-ai-avatar.svg"
          alt="AI"
          className="w-8 h-8 rounded-full"
        />
        <div className="bg-dark-4 px-4 py-3 rounded-2xl rounded-bl-md">
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-light-3 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="w-2 h-2 bg-light-3 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="w-2 h-2 bg-light-3 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
