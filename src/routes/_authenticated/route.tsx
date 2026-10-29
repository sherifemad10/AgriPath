import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { getCurrentUser } from "@/lib/auth.functions";

const PUBLIC_PATHS = new Set(["/research", "/latest-research"]);

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async ({ location }) => {
    if (PUBLIC_PATHS.has(location.pathname)) return { user: null };
    const user = await getCurrentUser();
    if (!user) throw redirect({ to: "/auth", search: { redirect: location.href } });
    return { user };
  },
  component: () => <Outlet />,
});
