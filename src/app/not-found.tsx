import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <p className="eyebrow">404</p>
      <h1 className="page-title mt-3">Page not found</h1>
      <p className="mt-3 max-w-md text-sm text-text-1">This route is not part of the portfolio.</p>
      <Link href="/" className="btn-primary mt-8">
        Back home
      </Link>
    </div>
  );
}
