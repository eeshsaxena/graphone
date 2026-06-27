import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="page flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-7xl font-extrabold text-accent">404</p>
      <h1 className="mt-4 text-2xl font-bold">This node isn’t in the graph</h1>
      <p className="mt-2 max-w-sm text-muted">The company, investor or page you’re looking for doesn’t exist or has moved.</p>
      <Link href="/" className="btn-accent mt-6">Back to GraphOne</Link>
    </div>
  );
}
