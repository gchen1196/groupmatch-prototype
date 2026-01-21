export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      groups: {
        Row: {
          id: string;
          name: string;
          bio: string;
          avatar_url: string | null;
          member_count: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          bio: string;
          avatar_url?: string | null;
          member_count?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          bio?: string;
          avatar_url?: string | null;
          member_count?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      swipes: {
        Row: {
          id: string;
          swiper_id: string;
          receiver_id: string;
          is_like: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          swiper_id: string;
          receiver_id: string;
          is_like: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          swiper_id?: string;
          receiver_id?: string;
          is_like?: boolean;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'swipes_swiper_id_fkey';
            columns: ['swiper_id'];
            referencedRelation: 'groups';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'swipes_receiver_id_fkey';
            columns: ['receiver_id'];
            referencedRelation: 'groups';
            referencedColumns: ['id'];
          }
        ];
      };
      matches: {
        Row: {
          id: string;
          group_one_id: string;
          group_two_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          group_one_id: string;
          group_two_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          group_one_id?: string;
          group_two_id?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'matches_group_one_id_fkey';
            columns: ['group_one_id'];
            referencedRelation: 'groups';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'matches_group_two_id_fkey';
            columns: ['group_two_id'];
            referencedRelation: 'groups';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

// Convenience types
export type Group = Database['public']['Tables']['groups']['Row'];
export type Swipe = Database['public']['Tables']['swipes']['Row'];
export type Match = Database['public']['Tables']['matches']['Row'];
