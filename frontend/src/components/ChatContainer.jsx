import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton.jsx";

function ChatContainer() {
  const {
    selectedUser,
    getMessagesByUserId,
    messages,
    isMessagesLoading,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessagesByUserId(selectedUser._id);
    subscribeToMessages();

    // clean up
    return () => unsubscribeFromMessages();
  }, [selectedUser, getMessagesByUserId, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      <ChatHeader />
      <div className="flex-1 px-4 sm:px-6 overflow-y-auto py-6 md:py-8">
        {messages.length > 0 && !isMessagesLoading ? (
          <div className="max-w-3xl mx-auto space-y-4">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`w-full flex ${msg.senderId === authUser._id ? "justify-end" : "justify-start"}`}
              >
                <div
                  role="article"
                  aria-label={`message from ${msg.senderId === authUser._id ? 'you' : 'them'}`}
                  className={`relative break-words whitespace-pre-wrap overflow-hidden px-3 py-2 rounded-lg shadow-sm ${
                    msg.senderId === authUser._id
                      ? "bg-cyan-600 text-white text-sm md:text-base"
                      : "bg-slate-800 text-slate-200 text-sm md:text-base"
                  } max-w-[80%] md:max-w-[65%]`}
                >
                  {msg.image && (
                    <img src={msg.image} alt="Shared" className="rounded-lg w-full max-h-80 object-cover mb-2" />
                  )}
                  {msg.text && <p className="leading-relaxed">{msg.text}</p>}
                  <p className="text-xs mt-2 opacity-75 flex items-center gap-1 justify-end">
                    {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            {/* 👇 scroll target */}
            <div ref={messageEndRef} />
          </div>
        ) : isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : (
          <NoChatHistoryPlaceholder name={selectedUser.fullName} />
        )}
      </div>

      <MessageInput />
    </>
  );
}

export default ChatContainer;
