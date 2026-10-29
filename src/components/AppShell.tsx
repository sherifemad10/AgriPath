import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { ShieldCheck,
  BookMarked,
  Bot,
  FlaskConical,
  Gauge,
  Home,
  LayoutDashboard,
  Languages,
  Leaf,
  Library,
  Menu,
  Notebook,
  Search,
  Settings,
  Sprout,
  User,
  Wrench,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useI18n, type DictKey } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { specializations, allTopics } from "@/data/specializations";
import { cn } from "@/lib/utils";

const NAV: { to: string; key: DictKey; icon: typeof Home; highlight?: boolean }[] = [
  { to: "/", key: "nav_home", icon: Home },
  { to: "/dashboard", key: "nav_dashboard", icon: LayoutDashboard },
  { to: "/specializations", key: "nav_specializations", icon: Sprout },
  { to: "/research", key: "nav_research", icon: FlaskConical, highlight: true },
  { to: "/mentor", key: "nav_mentor", icon: Bot },
  { to: "/projects", key: "nav_projects", icon: Wrench },
  { to: "/notes", key: "nav_notes", icon: Notebook },
  { to: "/resources", key: "nav_resources", icon: Library },
  { to: "/readiness", key: "nav_readiness", icon: Gauge },
];

export function AppShell({ children }: { children: ReactNode }) {
  const { t, L, toggleLang, lang } = useI18n();
  const { authenticated, profile, signOut, isAdmin } = useStore();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const topics = useMemo(() => allTopics.slice(0, 120), []);

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-lg">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-3 px-4">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-soft">
              <Leaf className="size-5" />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-base font-bold text-foreground">
                {t("brand")}
              </span>
              <span className="block text-[11px] text-muted-foreground">{t("brandSub")}</span>
            </span>
          </Link>

          <nav className="mx-2 hidden flex-1 items-center gap-1 xl:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "bg-secondary text-secondary-foreground font-semibold" }}
                className={cn(
                  "rounded-lg px-2.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-secondary/70 hover:text-foreground",
                  item.highlight
                    ? "text-primary hover:text-primary font-semibold flex items-center gap-1"
                    : "text-muted-foreground"
                )}
              >
                {item.highlight && <FlaskConical className="size-3.5" />}
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div className="ms-auto flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setOpen(true)}
              className="hidden items-center gap-2 text-muted-foreground sm:flex"
            >
              <Search className="size-4" />
              <span className="text-xs">{t("search")}</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleLang} aria-label="language">
              <Languages className="size-4" />
            </Button>
            {authenticated ? (
              <div className="flex items-center gap-1">
                {isAdmin ? (
                  <a href="/admin">
                    <Button size="sm" className="gap-1.5">
                      <ShieldCheck className="size-4" /> {lang === "ar" ? "لوحة التحكم" : "Admin"}
                    </Button>
                  </a>
                ) : null}
                <Link to="/profile">
                  <Button variant="ghost" size="icon" aria-label="profile">
                    <User className="size-4" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    signOut();
                    navigate({ to: "/" });
                  }}
                  className="hidden sm:inline-flex"
                >
                  {t("signOut")}
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button size="sm">{t("signIn")}</Button>
              </Link>
            )}

            <Sheet open={menu} onOpenChange={setMenu}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden" aria-label="menu">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side={lang === "ar" ? "right" : "left"} className="w-72 p-6">
                <div className="mt-6 flex flex-col gap-1">
                  {NAV.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setMenu(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-secondary"
                    >
                      <item.icon className="size-4 text-primary" />
                      {t(item.key)}
                    </Link>
                  ))}
                  <Link
                    to="/profile"
                    onClick={() => setMenu(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-secondary"
                  >
                    <Settings className="size-4 text-primary" />
                    {t("nav_profile")}
                  </Link>
                </div>
                {authenticated && profile.name ? (
                  <p className="mt-6 text-xs text-muted-foreground">{profile.name}</p>
                ) : null}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border/70 bg-secondary/40">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <BookMarked className="size-4 text-primary" />
            {t("brand")} — {t("brandSub")}
          </div>
          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
            <a href="/#about" className="hover:text-primary transition-colors">
              {lang === "ar" ? "عن المنصة" : "About Us"}
            </a>
            <Link to="/specializations">{t("nav_specializations")}</Link>
            <Link to="/research">{t("nav_research")}</Link>
            <Link to="/readiness">{t("nav_readiness")}</Link>
            <Link to="/profile">{t("nav_profile")}</Link>
          </div>
        </div>
      </footer>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder={t("search")} />
        <CommandList>
          <CommandEmpty>{lang === "ar" ? "لا نتائج" : "No results"}</CommandEmpty>
          <CommandGroup heading={t("nav_specializations")}>
            {specializations.map((s) => (
              <CommandItem
                key={s.id}
                value={`${s.name.ar} ${s.name.en}`}
                onSelect={() => {
                  setOpen(false);
                  navigate({ to: "/specializations/$specId", params: { specId: s.id } });
                }}
              >
                <Sprout className="size-4" />
                {L(s.name)}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading={t("roadmap")}>
            {topics.map(({ topic, spec }) => (
              <CommandItem
                key={`${spec.id}-${topic.id}`}
                value={`${topic.title.ar} ${topic.title.en}`}
                onSelect={() => {
                  setOpen(false);
                  navigate({
                    to: "/learn/$specId/$topicId",
                    params: { specId: spec.id, topicId: topic.id },
                  });
                }}
              >
                <BookMarked className="size-4" />
                <span className={cn("truncate")}>{L(topic.title)}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}

