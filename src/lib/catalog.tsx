import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";

import { deleteCatalogRow, listCatalog, trackPageView, upsertCatalogRow } from "@/lib/catalog.functions";
import { specializations } from "@/data/specializations";
import type { Specialization } from "@/types";

const BUILTIN: Specialization[] = [...specializations];
export const BUILTIN_IDS = new Set(BUILTIN.map((s) => s.id));

export interface CatalogRow {
  id: string;
  data: Specialization | null;
  hidden: boolean;
}

function apply(rows: CatalogRow[]) {
  const hidden = new Set(rows.filter((r) => r.hidden).map((r) => r.id));
  const overrides = new Map(
    rows.filter((r) => !r.hidden && r.data && BUILTIN_IDS.has(r.id)).map((r) => [r.id, r.data as Specialization]),
  );
  const custom = rows
    .filter((r) => !r.hidden && r.data && !BUILTIN_IDS.has(r.id))
    .map((r) => r.data as Specialization);
  specializations.splice(
    0,
    specializations.length,
    ...BUILTIN.filter((s) => !hidden.has(s.id)).map((s) => overrides.get(s.id) ?? s),
    ...custom,
  );
}

export function getBuiltin(id: string) {
  return BUILTIN.find((s) => s.id === id);
}

interface CatalogValue {
  rows: CatalogRow[];
  version: number;
  refresh: () => Promise<void>;
  saveRow: (row: CatalogRow) => Promise<void>;
  removeRow: (id: string) => Promise<void>;
}

const Ctx = createContext<CatalogValue | null>(null);

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [rows, setRows] = useState<CatalogRow[]>([]);
  const [version, setVersion] = useState(0);

  const refresh = useCallback(async () => {
    const list = (await listCatalog()) as CatalogRow[];
    apply(list);
    setRows(list);
    setVersion((v) => v + 1);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    let sid = sessionStorage.getItem("agripath.sid");
    if (!sid) {
      sid = crypto.randomUUID();
      sessionStorage.setItem("agripath.sid", sid);
    }
    void trackPageView({
      data: {
        path: pathname.slice(0, 300),
        sessionId: sid,
        referrer: document.referrer ? document.referrer.slice(0, 300) : null,
        lang: document.documentElement.lang,
      },
    });
  }, [pathname]);

  const saveRow = useCallback(
    async (row: CatalogRow) => {
      await upsertCatalogRow({ data: { id: row.id, hidden: row.hidden, data: row.data } });
      await refresh();
    },
    [refresh],
  );

  const removeRow = useCallback(
    async (id: string) => {
      await deleteCatalogRow({ data: { id } });
      await refresh();
    },
    [refresh],
  );

  return (
    <Ctx.Provider value={{ rows, version, refresh, saveRow, removeRow }}>
      <div key={version} className="contents">
        {children}
      </div>
    </Ctx.Provider>
  );
}

export function useCatalog() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCatalog must be used inside CatalogProvider");
  return c;
}
