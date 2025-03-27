import { createContext, useContext, useState } from "react";
import { useCachedPromise } from "@raycast/utils";
import { getAliases, addRecent, clearRecent, pinAlias, unpinAlias, removeRecent } from "./aliases";
import { Alias } from "../types";

interface AppContextType {
  showDetails: boolean;
  toggleDetails: () => void;
  isLoading: boolean;
  aliases: Alias[];
  pins: Alias[];
  recent: Alias[];
  addRecent: (alias: Alias) => void;
  clearRecent: () => void;
  pinAlias: (alias: Alias) => void;
  unpinAlias: (alias: Alias) => void;
  removeRecent: (alias: Alias) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [showDetails, setShowDetails] = useState(true);

  const toggleDetails = () => setShowDetails(!showDetails);

  // TODO: maybe not needed, use local storage instead
  const { isLoading, data, revalidate } = useCachedPromise(getAliases, [], {
    initialData: { aliases: [] },
  });

  const handleAddRecent = async (alias: Alias) => {
    await addRecent(alias);
    revalidate();
  };

  const handleClearRecent = async () => {
    await clearRecent();
    revalidate();
  };

  const handlePinAlias = async (alias: Alias) => {
    await pinAlias(alias);
    revalidate();
  };

  const handleUnpinAlias = async (alias: Alias) => {
    await unpinAlias(alias);
    revalidate();
  };

  const handleRemoveRecent = async (alias: Alias) => {
    await removeRecent(alias);
    revalidate();
  };

  // Full alias list
  const aliases = data.aliases;
  // Pinned alias list (may be recent)
  const pins = data.aliases.filter((alias: Alias) => alias.pin);
  // Recent alias list (not pinned)
  const recent = data.aliases.filter((alias: Alias) => alias.recent && !alias.pin);

  const value = {
    showDetails,
    toggleDetails,
    isLoading,
    aliases,
    pins,
    recent,
    addRecent: handleAddRecent,
    clearRecent: handleClearRecent,
    pinAlias: handlePinAlias,
    unpinAlias: handleUnpinAlias,
    removeRecent: handleRemoveRecent,
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
