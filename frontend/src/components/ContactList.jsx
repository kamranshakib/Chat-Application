import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";

function ContactList() {
  const { getAllContacts, allContacts, setSelectedUser, isUsersLoading } =
    useChatStore();

  // وقتی کامپوننت mount شد، لیست کاربران را بگیر
  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  // اگر هنوز در حال لود هستیم
  if (isUsersLoading) return <UsersLoadingSkeleton />;

  // محافظت: اگر allContacts آرایه نیست یا خالی است
  if (!Array.isArray(allContacts) || allContacts.length === 0) {
    return (
      <div className="text-slate-400 text-center py-6">
        No contacts found.
      </div>
    );
  }

  return (
    <>
      {allContacts.map((contact) => (
        <div
          key={contact._id}
          className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
          onClick={() => setSelectedUser(contact)}
        >
          <div className="flex items-center gap-3">
            <div className="avatar online">
              <div className="size-12 rounded-full">
                <img
                  src={contact.profilePic || "/me.png"}
                  alt={contact.fullName}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <h4 className="text-slate-200 font-medium truncate">
              {contact.fullName}
            </h4>
          </div>
        </div>
      ))}
    </>
  );
}

export default ContactList;
