import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { PortfolioData } from '../types';

export function usePortfolioData() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const [profile, education, skills, projects] = await Promise.all([
        supabase.from('profile').select('*').eq('id', 1).maybeSingle(),
        supabase.from('education').select('*').order('sort_order'),
        supabase.from('skills').select('*').order('sort_order'),
        supabase.from('projects').select('*').order('sort_order'),
      ]);

      const failed = [profile, education, skills, projects].find(
        (r) => r.error
      );
      if (failed?.error) {
        setError(failed.error.message);
        return;
      }

      setData({
        profile: profile.data,
        education: education.data ?? [],
        skills: skills.data ?? [],
        projects: projects.data ?? [],
      });
    }
    load();
  }, []);

  return { data, error };
}
