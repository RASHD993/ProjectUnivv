import { Link } from 'wouter';

  export default function NotFound() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 text-center px-4">
        <h1 className="text-6xl font-serif font-medium mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">Page not found</p>
        <Link href="/" className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
          Go Home
        </Link>
      </div>
    );
  }