import React, { useRef, useState } from 'react'
import useKeyboardSound from '../hooks/useKeyboardSound'
import { useChatStore } from '../store/useChatStore';
import toast from 'react-hot-toast';
import { XIcon } from 'lucide-react';
function MessageInput() {
   const { playRandomKeyStrokeSound } = useKeyboardSound();
   const {text,setText} = useState("");
   const {imagePreview,setImagePreview} = useState(null);

   const fileInputRef = useRef(null);

   const { sendMessage, isSoundEnabled } = useChatStore();

   const handleSendMessage =(e)=>{
    e.preventDefault();
    if(!text.trim() && !imagePreview) return;
    if(isSoundEnabled) playRandomKeyStrokeSound();

    sendMessage({
        text: text.trim(),
        image: imagePreview,
    });
    setText("");
    setImagePreview("");
    if(fileInputRef.current) fileInputRef.current.value = "";
   };

   const handleImageChange = (e)=>{
    const file = e.target.files[0];
    if(!file.type.startWith("/image/")) {
        toast.error("Please select an image file");
        return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
   }

   const removeImage =()=>{
    setImagePreview(null);
    if(fileInputRef.current) fileInputRef.current.value = "";
   }
  return (
    <div className='p-4 border-t border-slate-700/50'>
        {imagePreview && (
            <div className='max-w-3xl mx-auto mb-3 flex items-center'>
                <div className='relative'>
                    <img src={imagePreview} alt='Preview' className='w-20 h-20 object-cover rounded-lg border border-slate-700'/>
                    <button onClick={removeImage} className='absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-slate-200 hover:bg-slate-700'>
                        <XIcon className='w-4 h-4'/>
                    </button>
                </div>
            </div>
        )}
        <form onSubmit={handleSendMessage} className='max-w-3xl mx-auto flex space-x-4'></form>
    </div>
  )
}

export default MessageInput;