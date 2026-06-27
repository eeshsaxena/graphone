import { Bookmark, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { companies } from '@/lib/data';

const roles = ['Software Engineer', 'Research Scientist', 'Product Manager', 'ML Engineer', 'Forward Deployed Engineer', 'Founding Engineer'];
const types = ['Full-time', 'Full-time', 'Full-time', 'Full-time', 'Full-time', 'Full-time'];

export default function JobsPage() {
  const jobs = companies.slice(0, 10).map((c, i) => ({
    company: c,
    role: roles[i % roles.length],
    type: types[i % types.length],
    location: i % 2 ? 'Remote' : c.hq,
    salary: `$${150 + (i % 5) * 20}k – $${200 + (i % 5) * 20}k`,
  }));

  return (
    <div className="page pb-12 pt-10">
      <h1 className="text-[36px] font-extrabold tracking-tight">AI Jobs at the companies building the future</h1>
      <p className="mt-2 text-[15px] text-muted">Discover roles at the most innovative AI startups, labs and infrastructure companies.</p>

      <div className="mt-8 space-y-3">
        {jobs.map((j, i) => (
          <div key={i} className="card flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
            <Image src={j.company.logo} alt="" width={48} height={48} className="h-12 w-12 rounded-xl border border-line object-contain p-1" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-bold">{j.company.name}</p>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Actively Hiring</span>
              </div>
              <p className="text-sm font-semibold">{j.role}</p>
              <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
                <span>{j.type}</span>
                <span>{j.salary}</span>
                <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> {j.location}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="btn-ghost"><Bookmark className="h-4 w-4" /> Save</button>
              <Link href={`/companies/${j.company.slug}`} className="btn-accent">Apply</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
