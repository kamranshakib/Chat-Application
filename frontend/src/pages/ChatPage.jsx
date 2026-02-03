import { useChatStore } from "../store/useChatStore";

import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";

function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();

  return (
    <div className="relative w-full max-w-6xl h-screen">
      <BorderAnimatedContainer>
        <div className="w-full h-full flex flex-col md:flex-row">
          {/* LEFT SIDE (sidebar) - mobile: full width stacked, desktop: fixed sidebar */}
          <aside className="w-full md:w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col">
            <ProfileHeader />
            <ActiveTabSwitch />

            <div className="flex-1 overflow-y-auto p-4 space-y-2" aria-label="Chat list">
              {activeTab === "chats" ? <ChatsList /> : <ContactList />}
            </div>
          </aside>

          {/* RIGHT SIDE (main chat) */}
          <main className="flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm">
            {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
          </main>
        </div>
      </BorderAnimatedContainer>
    </div>
  );
}
export default ChatPage;
