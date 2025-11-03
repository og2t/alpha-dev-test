import { createClient } from '@supabase/supabase-js';

// Database types
export interface ReversedText {
  id: string;
  original_text: string;
  reversed_text: string;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      reversed_texts: {
        Row: ReversedText;
        Insert: Omit<ReversedText, 'id' | 'created_at'>;
        Update: Partial<Omit<ReversedText, 'id' | 'created_at'>>;
      };
    };
  };
}

// Create a single supabase client for interacting with your database
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Helper functions
export async function saveReversedText(
  originalText: string,
  reversedText: string
): Promise<ReversedText | null> {
  const { data, error } = await supabase
    .from('reversed_texts')
    .insert({ original_text: originalText, reversed_text: reversedText })
    .select()
    .single();

  if (error) {
    console.error('Error saving reversed text:', error);
    return null;
  }

  return data;
}

export async function getRecentReversedTexts(
  limit: number = 10
): Promise<ReversedText[]> {
  const { data, error } = await supabase
    .from('reversed_texts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching reversed texts:', error);
    return [];
  }

  return data || [];
}

export async function deleteReversedText(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('reversed_texts')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting reversed text:', error);
    return false;
  }

  return true;
}
