"use client";
import { IMessage } from "@/types";
import { formatDistanceToNow } from "date-fns";
import ReactMarkdown from "react-markdown";

interface MessageBubbleProps {
  message: IMessage;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isUser = message.role === "user";

  const timeAgo = formatDistanceToNow(new Date(message.createdAt), { 
    addSuffix: false 
  });

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div className={`flex ${isUser ? "flex-row-reverse" : "flex-row"} items-end gap-2 max-w-[80%]`}>
        {!isUser && (
          <img
            src="/assets/images/momento-ai-avatar.svg"
            alt="AI"
            className="w-8 h-8 rounded-full flex-shrink-0"
          />
        )}
        <div>
          <div
            className={`px-4 py-3 rounded-2xl ${
              isUser
                ? "bg-[#0095F6] text-white rounded-br-md"
                : "bg-dark-4 text-light-1 rounded-bl-md"
            }`}
          >
            <div className="text-sm prose prose-invert prose-sm max-w-none">
              <ReactMarkdown
                components={{
                  a: ({ node, ...props }) => (
                    <a
                      {...props}
                      className="text-blue-400 hover:text-blue-300 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul {...props} className="list-disc list-inside space-y-1 my-2" />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol {...props} className="list-decimal list-inside space-y-1 my-2" />
                  ),
                  li: ({ node, ...props }) => (
                    <li {...props} className="ml-2" />
                  ),
                  strong: ({ node, ...props }) => (
                    <strong {...props} className="font-bold" />
                  ),
                  em: ({ node, ...props }) => (
                    <em {...props} className="italic" />
                  ),
                  p: ({ node, ...props }) => (
                    <p {...props} className="mb-2 last:mb-0" />
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          </div>
          
          <div className={`flex items-center gap-2 mt-1 ${isUser ? "justify-end" : "justify-start"}`}>
            <span className="text-xs text-light-3">
              {timeAgo === "less than a minute" ? "Now" : timeAgo}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
