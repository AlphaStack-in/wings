"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  // Deliberately generic — never confirms whether the email exists
  // (spec section 49).
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setStatus("error");
      setErrorMessage("Incorrect email or password. Please try again.");
      return;
    }

    router.push(next);
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4">
      <div className="w-full max-w-sm rounded-xl2 bg-white p-8 shadow-lg">
        <h1 className="font-heading text-2xl font-bold text-ink">Admin Sign In</h1>
        <p className="mt-1 text-sm text-muted">
          Wings Foundation School — staff access only
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-semibold text-ink">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="focus-ring w-full rounded-lg border border-ink/15 px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-semibold text-ink">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="focus-ring w-full rounded-lg border border-ink/15 px-3 py-2 pr-10 text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="focus-ring absolute right-2 top-1/2 -translate-y-1/2 text-muted"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Eye className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {status === "error" && (
            <p role="alert" className="text-sm text-coral">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="focus-ring flex w-full items-center justify-center gap-2 rounded-full bg-coral px-4 py-2.5 font-heading font-semibold text-white transition-opacity hover:bg-coral/90 disabled:opacity-60"
          >
            {status === "submitting" && (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            )}
            Sign In
          </button>

          {/* Password reset requires Supabase's resetPasswordForEmail flow +
              a /admin/reset-password route to land the recovery link; not
              wired yet, so this only appears as a stated TODO for the next
              admin-auth pass rather than a dead link. */}
          <p className="text-center text-xs text-muted">
            Forgot your password? Contact a super admin to reset it.
          </p>
        </form>
      </div>
    </div>
  );
}
