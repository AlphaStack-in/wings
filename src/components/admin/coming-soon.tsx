export function AdminComingSoon({ title }: { title: string }) {
  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-ink">{title}</h1>
      <div className="mt-6 rounded-xl2 border-2 border-dashed border-ink/15 bg-white p-10 text-center text-muted">
        This admin module isn't built yet — it's next in the build queue.
        The database table and RLS policies for it already exist
        (see supabase/migrations/0001_init.sql), so this page just needs its
        CRUD UI, following the same pattern as Admin → Programs.
      </div>
    </div>
  );
}
