import { createContext, useContext } from "react";
import { useCachedState } from "@raycast/utils";
import { Alias } from "./types";
import DATA from "./aliases.json";
import * as actions from "./actions";

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
  const [aliases, setAliases] = useCachedState<Alias[]>("aliases", DATA.aliases as Alias[]);
  const [showDetails, setShowDetails] = useCachedState<boolean>("showDetails", true);

  const pinAlias = (name: string) => actions.pinAlias(aliases, name).then(setAliases);
  const unpinAlias = (name: string) => actions.unpinAlias(aliases, name).then(setAliases);
  const addRecent = (name: string) => actions.addRecent(aliases, name).then(setAliases);
  const removeRecent = (name: string) => actions.removeRecent(aliases, name).then(setAliases);
  const clearAllRecent = () => actions.clearAllRecent(aliases).then(setAliases);
  const toggleDetails = () => setShowDetails(!showDetails);

  const pins = aliases.filter((alias) => alias.pin);
  const recent = aliases.filter((alias) => alias.recent && !alias.pin);

  const value = {
    aliases,
    showDetails,
    pins,
    recent,
    toggleDetails,
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
