import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/latest-research")({
  beforeLoad: () => {
    throw redirect({ to: "/research" });
  },
});
