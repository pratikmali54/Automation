import { redirect } from 'next/navigation';

export default function RootPage() {
  // The root page should redirect to a default authenticated route.
  // The actual protection and redirect logic will be handled by middleware or the dashboard page itself.
  redirect('/dashboard');
}