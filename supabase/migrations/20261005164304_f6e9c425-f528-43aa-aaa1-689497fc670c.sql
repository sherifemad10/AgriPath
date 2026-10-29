CREATE TABLE public.research_summaries (
  work_id text PRIMARY KEY,
  data jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.research_summaries TO authenticated;
GRANT ALL ON public.research_summaries TO service_role;
ALTER TABLE public.research_summaries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "auth read summaries" ON public.research_summaries FOR SELECT TO authenticated USING (true);
CREATE POLICY "auth insert summaries" ON public.research_summaries FOR INSERT TO authenticated WITH CHECK (true);