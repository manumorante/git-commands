import { createContext, useContext } from "react";
import { useCachedState } from "@raycast/utils";
import DATA from "./aliases.json";
import { Alias } from "./types";

interface AppContextType {
  aliases: Alias[];
  pins: Alias[];
  recent: Alias[];
  showDetails: boolean;
  toggleDetails: () => void;
  addRecent: (name: string) => void;
  clearAllRecent: () => void;
  pinAlias: (name: string) => void;
  unpinAlias: (name: string) => void;
  removeRecent: (name: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const initialValue = DATA.aliases as Alias[];
  const [aliases, setAliases] = useCachedState<Alias[]>("aliases", initialValue);
  const [showDetails, setShowDetails] = useCachedState<boolean>("showDetails", true);

  const setProperty = (name: string, prop: keyof Alias, value: Alias[keyof Alias]) => {
    setAliases(aliases.map((a: Alias) => (a.name === name ? { ...a, [prop]: value } : a)));
  };

  const pinAlias = (name: string) => setProperty(name, "pin", true);
  const unpinAlias = (name: string) => setProperty(name, "pin", false);
  const addRecent = (name: string) => setProperty(name, "recent", true);
  const removeRecent = (name: string) => setProperty(name, "recent", false);
  const clearAllRecent = () => setAliases(aliases.map((a: Alias) => ({ ...a, recent: false })));
  const toggleDetails = () => setShowDetails(!showDetails);

  const pins = aliases.filter((alias: Alias) => alias.pin);
  const recent = aliases.filter((alias: Alias) => alias.recent && !alias.pin);

  const value = {
    showDetails,
    toggleDetails,
    aliases,
    pins,
    recent,
    addRecent,
    clearAllRecent,
    pinAlias,
    unpinAlias,
    removeRecent,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
