import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Note, Resource, UserProfile } from "@/types";
import { getCurrentUser, saveProgress, signOutAccount } from "@/lib/auth.functions";

const KEY = "agripath.state.v1";

interface AppState {
  authenticated: boolean;
  profile: UserProfile;
  completedTopics: string[];
  completedProjects: string[];
  notes: Note[];
  resources: Resource[];
  streak: number;
  weeklyMinutes: number;
  dailyDone: string[];
}

const emptyProfile: UserProfile = {
  name: "",
  email: "",
  stage: "student",
  background: "",
  level: "beginner",
  interests: [],
  careerGoal: "",
  weeklyHours: 6,
  knownTools: [],
  primarySpecialization: null,
  onboarded: false,
};

const initialState: AppState = {
  authenticated: false,
  profile: emptyProfile,
  completedTopics: [],
  completedProjects: [],
  notes: [],
  resources: [],
  streak: 0,
  weeklyMinutes: 0,
  dailyDone: [],
};

interface StoreValue extends AppState {
  ready: boolean;
  isAdmin: boolean;
  signIn: (name: string, email: string) => void;
  signOut: () => void;
  updateProfile: (patch: Partial<UserProfile>) => void;
  toggleTopic: (topicId: string, minutes?: number) => void;
  isTopicDone: (topicId: string) => boolean;
  toggleProject: (projectId: string) => void;
  addNote: (note: Omit<Note, "id" | "createdAt">) => void;
  updateNote: (id: string, patch: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  addResource: (resource: Omit<Resource, "id" | "createdAt">) => void;
  setResourceStatus: (id: string, status: Resource["status"]) => void;
  deleteResource: (id: string) => void;
  toggleMission: (missionId: string) => void;
}

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(initialState);
  const [ready, setReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setState({ ...initialState, ...(JSON.parse(raw) as AppState) });
    } catch {
      /* corrupted local state: start fresh */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(KEY, JSON.stringify(state));
  }, [state, ready]);

  useEffect(() => {
    if (!ready) return;
    void getCurrentUser().then((user) => {
      setIsAdmin(user?.role === "admin");
      setState((s) => ({
        ...s,
        authenticated: !!user,
        profile: user
          ? {
              ...s.profile,
              email: user.email,
              name: s.profile.name || user.name,
            }
          : s.profile,
      }));
    });
  }, [ready]);

  useEffect(() => {
    if (!ready || !state.authenticated) return;
    const t = setTimeout(() => {
      void saveProgress({
        data: {
          primarySpecialization: state.profile.primarySpecialization,
          level: state.profile.level,
          careerGoal: state.profile.careerGoal,
          interests: state.profile.interests,
          completedTopics: state.completedTopics,
          completedProjects: state.completedProjects,
        },
      });
    }, 1500);
    return () => clearTimeout(t);
  }, [ready, state.authenticated, state.profile, state.completedTopics, state.completedProjects]);

  const patch = useCallback((fn: (s: AppState) => AppState) => setState((s) => fn(s)), []);

  const value = useMemo<StoreValue>(
    () => ({
      ...state,
      ready,
      isAdmin,
      signIn: (name, email) =>
        patch((s) => ({
          ...s,
          authenticated: true,
          streak: Math.max(s.streak, 1),
          profile: { ...s.profile, name: name || s.profile.name, email },
        })),
      signOut: () => {
        void signOutAccount().then(() => {
          window.location.href = "/";
        });
      },
      updateProfile: (p) => patch((s) => ({ ...s, profile: { ...s.profile, ...p } })),
      toggleTopic: (topicId, minutes = 30) =>
        patch((s) => {
          const done = s.completedTopics.includes(topicId);
          return {
            ...s,
            completedTopics: done
              ? s.completedTopics.filter((t) => t !== topicId)
              : [...s.completedTopics, topicId],
            weeklyMinutes: Math.max(0, s.weeklyMinutes + (done ? -minutes : minutes)),
            streak: done ? s.streak : Math.max(1, s.streak + 1),
          };
        }),
      isTopicDone: (topicId) => state.completedTopics.includes(topicId),
      toggleProject: (projectId) =>
        patch((s) => ({
          ...s,
          completedProjects: s.completedProjects.includes(projectId)
            ? s.completedProjects.filter((p) => p !== projectId)
            : [...s.completedProjects, projectId],
        })),
      addNote: (note) =>
        patch((s) => ({
          ...s,
          notes: [
            { ...note, id: crypto.randomUUID(), createdAt: new Date().toISOString() },
            ...s.notes,
          ],
        })),
      updateNote: (id, p) =>
        patch((s) => ({
          ...s,
          notes: s.notes.map((n) => (n.id === id ? { ...n, ...p } : n)),
        })),
      deleteNote: (id) => patch((s) => ({ ...s, notes: s.notes.filter((n) => n.id !== id) })),
      addResource: (resource) =>
        patch((s) => ({
          ...s,
          resources: [
            { ...resource, id: crypto.randomUUID(), createdAt: new Date().toISOString() },
            ...s.resources,
          ],
        })),
      setResourceStatus: (id, status) =>
        patch((s) => ({
          ...s,
          resources: s.resources.map((r) => (r.id === id ? { ...r, status } : r)),
        })),
      deleteResource: (id) =>
        patch((s) => ({ ...s, resources: s.resources.filter((r) => r.id !== id) })),
      toggleMission: (missionId) =>
        patch((s) => ({
          ...s,
          dailyDone: s.dailyDone.includes(missionId)
            ? s.dailyDone.filter((m) => m !== missionId)
            : [...s.dailyDone, missionId],
        })),
    }),
    [state, ready, isAdmin, patch],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
