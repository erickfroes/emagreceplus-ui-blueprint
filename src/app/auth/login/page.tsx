import { LoginView } from "@/components/auth/LoginView";
import { signInWithPassword } from "./actions";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const params = await searchParams;
  const state = params.error ? "error" : "ready";

  return <main className="ep-page grid min-h-screen place-items-center p-6"><form action={signInWithPassword}><LoginView state={state} /></form></main>;
}
