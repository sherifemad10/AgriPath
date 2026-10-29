import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Leaf } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { getCurrentUser, signInAccount, signUpAccount } from "@/lib/auth.functions";

const safePath = (p: unknown) => {
  if (typeof p !== "string") return undefined;
  try {
    const u = new URL(p, "http://x");
    return u.origin === "http://x" && !u.pathname.startsWith("//") ? u.pathname + u.search : undefined;
  } catch {
    return undefined;
  }
};

export const Route = createFileRoute("/auth")({
  validateSearch: (s: Record<string, unknown>): { redirect?: string | undefined } => ({
    redirect: safePath(s["redirect"]),
  }),
  head: () => ({
    meta: [
      { title: "Sign in | AgriPath" },
      { name: "description", content: "Sign in to follow your agricultural career path." },
      { property: "og:title", content: "Sign in | AgriPath" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { t, lang } = useI18n();
  const { profile, updateProfile, signIn } = useStore();
  const { redirect } = Route.useSearch();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const ar = lang === "ar";

  const go = (role?: string) => {
    if (role === "admin") {
      window.location.href = "/admin";
      return;
    }
    if (redirect) window.location.href = redirect;
    else navigate({ to: profile.onboarded ? "/dashboard" : "/onboarding" });
  };

  useEffect(() => {
    void getCurrentUser().then((user) => {
      if (user) {
        signIn(user.name, user.email);
        go(user.role);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "in") {
        const user = await signInAccount({ data: { email, password } });
        signIn(user.name, user.email);
        go(user.role);
      } else {
        const user = await signUpAccount({ data: { name, email, password } });
        if (name) updateProfile({ name });
        signIn(user.name, user.email);
        go(user.role);
      }
    } catch (err) {
      const msg = String((err as Error).message ?? err);
      if (msg.includes("INVALID_CREDENTIALS")) toast.error(ar ? "البريد أو كلمة المرور غير صحيحة" : "Invalid email or password");
      else if (msg.includes("EMAIL_TAKEN")) toast.error(ar ? "هذا البريد مسجّل بالفعل" : "Email already registered");
      else if (msg.includes("EMAIL_CONFIRMATION_REQUIRED")) {
        toast.success(
          ar
            ? "تم إنشاء الحساب. افتح بريدك الإلكتروني وأكّد الحساب قبل تسجيل الدخول."
            : "Account created. Check your email and confirm your account before signing in.",
        );
      }
      else if (msg.includes("ACCOUNT_DISABLED")) toast.error(ar ? "تم إيقاف هذا الحساب" : "This account is disabled");
      else if (msg.includes("Too many")) toast.error(ar ? "محاولات كثيرة، انتظر قليلًا" : "Too many attempts, wait a moment");
      else if (msg.includes("Missing Supabase environment")) {
        toast.error(
          ar
            ? "إعدادات Supabase غير مكتملة في إعدادات النشر."
            : "Supabase environment variables are missing from the deployment settings.",
        );
      }
      else toast.error(ar ? "تعذر إتمام العملية" : msg);
    }
    setBusy(false);
  }

  return (
    <div className="grid min-h-screen place-items-center bg-secondary/40 px-4 py-12">
      <Card className="w-full max-w-md border-border/70 shadow-lift">
        <CardContent className="p-8">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Leaf className="size-5" />
            </span>
            <span className="font-display text-lg font-bold">{t("brand")}</span>
          </Link>
          <h1 className="mt-6 font-display text-2xl font-bold text-foreground">
            {mode === "in" ? t("signIn") : t("signUp")}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {ar
              ? "سجّل الدخول للوصول إلى خرائط الطريق والأبحاث ولوحة تقدمك."
              : "Sign in to access roadmaps, research and your progress."}
          </p>

          <form className="mt-6 space-y-4" onSubmit={submit}>
            {mode === "up" && (
              <div className="space-y-2">
                <Label htmlFor="name">{ar ? "الاسم" : "Name"}</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">{ar ? "البريد الإلكتروني" : "Email"}</Label>
              <Input id="email" type="email" autoComplete="email" dir="ltr" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pw">{ar ? "كلمة المرور" : "Password"}</Label>
              <Input
                id="pw"
                type="password"
                autoComplete={mode === "in" ? "current-password" : "new-password"}
                dir="ltr"
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={busy}>
              {mode === "in" ? t("signIn") : t("signUp")}
            </Button>
          </form>

          <button
            className="mt-4 w-full text-xs text-muted-foreground underline"
            onClick={() => setMode(mode === "in" ? "up" : "in")}
          >
            {mode === "in"
              ? ar
                ? "ليس لديك حساب؟ أنشئ حسابًا"
                : "No account? Create one"
              : ar
                ? "لديك حساب؟ سجّل الدخول"
                : "Have an account? Sign in"}
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
