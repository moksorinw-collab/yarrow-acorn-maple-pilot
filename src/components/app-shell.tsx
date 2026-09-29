import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ClipboardPlus, Inbox, LayoutGrid, ScrollText } from "lucide-react";
import { WarrantMark } from "./mark";
import { WORKSPACE } from "@/lib/seed";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "데스크", icon: LayoutGrid },
  { to: "/queue", label: "재확인 큐", icon: Inbox },
  { to: "/new", label: "새 검증", icon: ClipboardPlus },
  { to: "/playbook", label: "로드맵", icon: ScrollText },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-surface focus:px-3 focus:py-2"
      >
        본문으로
      </a>
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-[15.5rem] flex-col border-r border-border bg-surface px-4 py-5 md:flex">
        <Link to="/" className="flex items-center gap-2.5 px-1">
          <WarrantMark className="size-8" />
          <span className="font-display text-xl leading-none tracking-tight">Warrant</span>
        </Link>
        <p className="mt-5 px-1 text-[11px] font-medium uppercase tracking-[0.14em] text-subtle">
          {WORKSPACE.org}
        </p>
        <p className="px-1 text-sm text-muted">{WORKSPACE.desk}</p>
        <nav className="mt-8 flex flex-1 flex-col gap-1">
          {NAV.map((item) => {
            const active =
              item.to === "/"
                ? pathname === "/" || pathname.startsWith("/audits/")
                : pathname === item.to;
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex h-11 items-center gap-2.5 rounded-[var(--radius-md)] px-3 text-sm transition-colors duration-[var(--motion-quick)]",
                  active ? "bg-bg-subtle text-fg" : "text-muted hover:bg-bg-subtle hover:text-fg",
                )}
              >
                <Icon className="size-4" strokeWidth={1.75} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="rounded-[var(--radius-lg)] bg-bg px-3 py-3">
          <p className="text-sm font-medium">{WORKSPACE.user}</p>
          <p className="text-xs text-muted">{WORKSPACE.role}</p>
        </div>
      </aside>

      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-surface/90 px-4 py-3 backdrop-blur-sm md:hidden">
        <Link to="/" className="flex items-center gap-2">
          <WarrantMark className="size-7" />
          <span className="font-display text-lg leading-none">Warrant</span>
        </Link>
        <span className="text-xs text-muted">{WORKSPACE.org}</span>
      </header>

      <div className="md:pl-[15.5rem]">
        <main id="main" className="mx-auto w-full max-w-[72rem] px-4 pb-28 pt-6 md:px-8 md:pb-16 md:pt-8">
          {children}
        </main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-20 grid grid-cols-4 border-t border-border bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm md:hidden">
        {NAV.map((item) => {
          const active =
            item.to === "/"
              ? pathname === "/" || pathname.startsWith("/audits/")
              : pathname === item.to;
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex min-h-14 flex-col items-center justify-center gap-1 text-[11px]",
                active ? "text-fg" : "text-muted",
              )}
            >
              <Icon className="size-5" strokeWidth={1.75} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
