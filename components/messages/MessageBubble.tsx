"use client";
import { IMessage } from "@/types";
import { formatDistanceToNow } from "date-fns";
import ReactMarkdown from "react-markdown";
import { useState, useEffect } from "react";
import { Download, X } from "lucide-react";

interface MessageBubbleProps {
  message: IMessage;
  isAI?: boolean;
  senderImage?: string;
  currentUserImage?: string;
}

const MessageBubble = ({ message, isAI = false, senderImage, currentUserImage }: MessageBubbleProps) => {
  const isUser = message.role === "user";
  const [imageError, setImageError] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const timeAgo = formatDistanceToNow(new Date(message.createdAt), { 
    addSuffix: false 
  });

  const avatarSrc = isAI 
    ? "/assets/images/momento-ai-avatar.svg"
    : senderImage || "/assets/icons/profile-placeholder.svg";

  const handleDownloadImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!message.imageUrl) return;

    try {
      if (message.imageUrl.startsWith('data:image')) {
        const link = document.createElement('a');
        link.href = message.imageUrl;
        link.download = `momento-image-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        fetch(message.imageUrl)
          .then(res => res.blob())
          .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `momento-image-${Date.now()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
          })
          .catch(() => {
            window.open(message.imageUrl || '', '_blank');
          });
      }
    } catch (error) {
      window.open(message.imageUrl || '', '_blank');
    }
  };

  const handleImageClick = () => {
    if (message.imageUrl && !imageError) {
      setIsImageModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsImageModalOpen(false);
  };

  const handleModalBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isImageModalOpen) {
        handleCloseModal();
      }
    };

    if (isImageModalOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isImageModalOpen]);

  const currentUserAvatar = isUser ? (currentUserImage || "/assets/icons/profile-placeholder.svg") : undefined;

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div className={`flex ${isUser ? "flex-row-reverse" : "flex-row"} items-end gap-2 max-w-[85%] sm:max-w-[80%]`}>
        {!isUser && (
          <img
            src={avatarSrc}
            alt={isAI ? "AI" : "User"}
            className="w-8 h-8 rounded-full flex-shrink-0 object-cover border border-dark-4"
          />
        )}
        {isUser && (
          <img
            src={currentUserAvatar}
            alt="You"
            className="w-8 h-8 rounded-full flex-shrink-0 object-cover border border-dark-4"
          />
        )}
        <div>
          <div
            className={`px-4 py-2.5 rounded-2xl text-sm sm:text-base ${
              isUser
                ? "bg-white text-dark-1 rounded-br-md"
                : "bg-dark-4 text-light-1 rounded-bl-md"
            }`}
          >
            {message.imageUrl && !imageError && (
              <div className="mb-3 relative group">
                <img
                  src={message.imageUrl}
                  alt="Generated image"
                  className="max-w-full h-auto rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                  onError={() => setImageError(true)}
                  onClick={handleImageClick}
                  style={{ maxWidth: '400px', width: '100%' }}
                />
                <button
                  onClick={handleDownloadImage}
                  className="absolute top-2 right-2 bg-dark-1/90 hover:bg-dark-1 text-light-1 px-3 py-1.5 rounded-md text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 z-10"
                  title="Download image"
                >
                  <Download className="w-3 h-3" />
                  Download
                </button>
              </div>
            )}
            
            {message.content && (
              <div className={`text-sm max-w-none ${isUser ? "text-dark-1" : "text-light-1"}`}>
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
            )}
          </div>
          
          <div className={`flex items-center gap-2 mt-1 px-1 ${isUser ? "justify-end" : "justify-start"}`}>
            <span className="text-xs text-light-4">
              {timeAgo === "less than a minute" ? "Now" : timeAgo}
            </span>
          </div>
        </div>
      </div>

      {isImageModalOpen && message.imageUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={handleModalBackdropClick}
        >
          <div className="relative max-w-[95vw] max-h-[95vh] flex items-center justify-center">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 z-10 bg-dark-1/90 hover:bg-dark-1 text-white p-2 rounded-full transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <button
              onClick={handleDownloadImage}
              className="absolute top-4 right-16 z-10 bg-dark-1/90 hover:bg-dark-1 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
              title="Download image"
            >
              <Download className="w-4 h-4" />
              Download
            </button>

            <img
              src={message.imageUrl}
              alt="Generated image - full size"
              className="max-w-full max-h-[95vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
