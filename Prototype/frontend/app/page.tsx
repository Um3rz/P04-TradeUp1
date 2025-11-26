import { AuthForm } from "@/components/auth/auth-form";
import { Tagline } from "@/components/auth/tagline";

export default function AuthPage() {
  return (
    <main className="grid place-items-center min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 w-[980px] h-[640px] rounded-3xl shadow-2xl overflow-hidden">
        <AuthForm />
        <Tagline />
      </div>
    </main>
  );
}


