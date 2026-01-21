import { supabase } from '../lib/supabase';
import type { Group } from '../types/database.types';

export const groupService = {
  async getDiscoverableGroups(currentGroupId: string): Promise<Group[]> {
    // Get groups the current group hasn't swiped on yet
    const { data: swipedIds } = await supabase
      .from('swipes')
      .select('receiver_id')
      .eq('swiper_id', currentGroupId);

    const excludeIds = [
      currentGroupId,
      ...(swipedIds?.map((s) => s.receiver_id) || []),
    ];

    const { data, error } = await supabase
      .from('groups')
      .select('*')
      .not('id', 'in', `(${excludeIds.join(',')})`)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getGroupById(id: string): Promise<Group | null> {
    const { data, error } = await supabase
      .from('groups')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },
};
