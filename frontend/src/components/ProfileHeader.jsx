import React, {useState, useRef} from 'react'
import { LogOutIcon, VolumeOffIcon, Volume2Icon } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useChatStore } from '../store/useChatStore';

const mouseClickSound = new Audio("/sound/sound2.mp3");

function ProfileHeader() {
  const { authUser, logout, updateProfile} = useAuthStore();
  const { toggleSound, isSoundEnabled } = useChatStore();
  const { selectedImg, setSelectedImg } = useState(null);
   const fileInputRef = useRef(null);

   const handleImageUpload = (e)=>{}
  return (
    <div className="p-6 border-b border-slate-700/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* AVATAR */}
          <div className="avatar online">
            <button
              className="size-14 rounded-full overflow-hidden relative group"
              onClick={() => fileInputRef.current.click()}
            >
              <img src={selectedImg || authUser.profilePic || "/me.png"} alt='User image' className='size-full object-cover'/>
              {/* <img
                src={selectedImg || "/me.png"}
                alt="User image"
                className="size-full object-cover"
              /> */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-white text-xs">Change</span>
              </div>
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
          {/* USERNAME & ONLINE TEXT */}
          <div>
            <h3 className="text-slate-200 font-medium text-base max-w-[180px] truncate">
              {authUser.fullName}
              {/* Khaled Saifee */}
            </h3>
            <p className="text-slate-400 text-xs">Online</p>
          </div>
        </div>
        {/* BUTTONS */}
        <div className="flex gap-4 items-center">
          <button
            className="text-slate-400 hover:text-slate-200 transition-colors"
            onClick={logout}
          >
            <LogOutIcon className="size-5" />
          </button>
          {/* SOUND TOGGLE BTN */}
          <button className="text-slate-400 hover:text-slate-200 transition-colors" onClick={()=>{
            mouseClickSound.currentTime = 0;
            mouseClickSound.play().catch((error)=> console.log("Audio play failed:", error));
            toggleSound();
          }}>
            {isSoundEnabled ? (
              <Volume2Icon className='size-5'/>
            ):(
              <VolumeOffIcon className='size-5'/>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader