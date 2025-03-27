import { aliases } from "./aliases.json";
import { showToast, Toast } from "@raycast/api";
import { Cache } from "@raycast/api";
import { Alias } from "../types";

const cache = new Cache();

function saveAliases(aliases: Alias[]) {
  const data = { aliases };
  cache.set("data", JSON.stringify(data));
  return data;
}

export async function getAliases(): Promise<{ aliases: Alias[] }> {
  const data = cache.get("data");
  if (data) return JSON.parse(data);

  return saveAliases(aliases as Alias[]);
}

async function setProperty(alias: Alias, prop: keyof Alias, value: Alias[keyof Alias]): Promise<boolean> {
  try {
    const { aliases } = await getAliases();
    const updatedAliases = aliases.map((a: Alias) => {
      if (a.name === alias.name) {
        return { ...a, [prop]: value };
      }
      return a;
    });
    saveAliases(updatedAliases);

    return true;
  } catch (error) {
    showToast({
      style: Toast.Style.Failure,
      title: "Error updating alias",
      message: `${error instanceof Error ? error.message : "An unexpected error occurred."} If the problem persists, clear the cache.`,
    });
    return false;
  }
}

export async function pinAlias(alias: Alias): Promise<void> {
  const success = await setProperty(alias, "pin", true);
  if (!success) return;
  showToast({ title: "Pinned", message: alias.name + " is now pinned" });
}

export async function unpinAlias(alias: Alias): Promise<void> {
  const success = await setProperty(alias, "pin", false);
  if (!success) return;
  showToast({ title: "Unpin", message: alias.name + " is no longer pinned" });
}

export async function addRecent(alias: Alias): Promise<void> {
  await setProperty(alias, "recent", true);
}

export async function removeRecent(alias: Alias): Promise<void> {
  const success = setProperty(alias, "recent", false);
  if (!success) return;
  showToast({ title: "Recent removed", message: alias.name + " is no longer in recent" });
}

export async function clearRecent(): Promise<void> {
  const { aliases } = await getAliases();
  const updatedAliases = aliases.map((alias: Alias) => ({ ...alias, recent: false }));
  saveAliases(updatedAliases);
}
