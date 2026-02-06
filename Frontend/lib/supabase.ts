import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Message = {
  id: string;
  conversation_id: string;
  sender: 'user' | 'ai';
  content: string;
  language: string;
  created_at: string;
};

export type Conversation = {
  id: string;
  user_id: string;
  title: string;
  language: string;
  created_at: string;
  updated_at: string;
};

export type Profile = {
  id: string;
  username: string;
  avatar_url: string | null;
  preferred_language: string;
  created_at: string;
  updated_at: string;
};