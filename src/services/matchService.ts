import { supabase } from '../lib/supabase';
import type { Match, Group } from '../types/database.types';

export interface MatchWithGroup extends Match {
  matchedGroup: Group;
}

export const matchService = {
  /**
   * Records a swipe and checks for a mutual match.
   * Returns the match if one was created, null otherwise.
   */
  async recordSwipe(
    swiperId: string,
    receiverId: string,
    isLike: boolean
  ): Promise<Match | null> {
    // 1. Record the swipe
    const { error: swipeError } = await supabase.from('swipes').insert({
      swiper_id: swiperId,
      receiver_id: receiverId,
      is_like: isLike,
    });

    if (swipeError) throw swipeError;

    // 2. If not a like, no match possible
    if (!isLike) return null;

    // 3. Check for reciprocal like (does receiver like swiper?)
    const { data: reciprocal } = await supabase
      .from('swipes')
      .select('id')
      .eq('swiper_id', receiverId)
      .eq('receiver_id', swiperId)
      .eq('is_like', true)
      .single();

    if (!reciprocal) return null;

    // 4. Mutual like found - create match
    // Order IDs to ensure consistent storage
    const [groupOneId, groupTwoId] = [swiperId, receiverId].sort();

    const { data: match, error: matchError } = await supabase
      .from('matches')
      .insert({
        group_one_id: groupOneId,
        group_two_id: groupTwoId,
      })
      .select()
      .single();

    if (matchError) throw matchError;
    return match;
  },

  async getMatchesForGroup(groupId: string): Promise<MatchWithGroup[]> {
    const { data, error } = await supabase
      .from('matches')
      .select('*')
      .or(`group_one_id.eq.${groupId},group_two_id.eq.${groupId}`)
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Fetch the matched group details
    const matchesWithGroups: MatchWithGroup[] = [];
    for (const match of data || []) {
      const matchedGroupId =
        match.group_one_id === groupId ? match.group_two_id : match.group_one_id;

      const { data: matchedGroup } = await supabase
        .from('groups')
        .select('*')
        .eq('id', matchedGroupId)
        .single();

      if (matchedGroup) {
        matchesWithGroups.push({ ...match, matchedGroup });
      }
    }

    return matchesWithGroups;
  },
};
