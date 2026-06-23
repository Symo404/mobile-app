import { create } from 'zustand';
export const useSessionStore=create<{unlocked:boolean;unlock:()=>void;lock:()=>void}>((set)=>({unlocked:false,unlock:()=>set({unlocked:true}),lock:()=>set({unlocked:false})}));
