import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";

function ChatsList() {
  const { getMyChatPartners, chats, isUsersLoading, setSelectedUser } =
    useChatStore();

  // هنگام mount کامپوننت، لیست چت‌ها را بگیر
  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  // اگر هنوز در حال لود هستیم
  if (isUsersLoading) return <UsersLoadingSkeleton />;

  // اگر chats آرایه نیست یا خالی است
  if (!Array.isArray(chats) || chats.length === 0) return <NoChatsFound />;

  return (
    <>
      {chats.map((chat) => (
        <div
          key={chat._id}
          className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
          onClick={() => setSelectedUser(chat)}
        >
          <div className="flex items-center gap-3">
            {/* TODO: FIX ONLINE STATUS WITH SOCKET */}
            <div className={`avatar online`}>
              <div className="size-12 rounded-full">
                <img
                  src={chat.profilePic || "/me.png"}
                  alt={chat.fullName}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <h4 className="text-slate-200 font-medium truncate">
              {chat.fullName}
            </h4>
          </div>
        </div>
      ))}
    </>
  );
}

export default ChatsList;
