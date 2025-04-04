import { LocalStorage } from "@raycast/api";
import { Alias } from "./types";
import DATA from "./aliases.json";

const STORAGE_KEY = "aliases";

export async function getAliases(): Promise<Alias[]> {
  const stored = await LocalStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored as string) : DATA.aliases;
}

export async function setAliases(aliases: Alias[]): Promise<void> {
  await LocalStorage.setItem(STORAGE_KEY, JSON.stringify(aliases));
}

export async function updateAlias(aliases: Alias[], name: string, updates: Partial<Alias>): Promise<Alias[]> {
  const updated = aliases.map((a) => (a.name === name ? { ...a, ...updates } : a));
  await setAliases(updated);
  return updated;
}

export async function pinAlias(aliases: Alias[], name: string): Promise<Alias[]> {
  return updateAlias(aliases, name, { pin: true });
}

export async function unpinAlias(aliases: Alias[], name: string): Promise<Alias[]> {
  return updateAlias(aliases, name, { pin: false });
}

export async function addRecent(aliases: Alias[], name: string): Promise<Alias[]> {
  return updateAlias(aliases, name, { recent: true });
}

export async function removeRecent(aliases: Alias[], name: string): Promise<Alias[]> {
  return updateAlias(aliases, name, { recent: false });
}

export async function clearAllRecent(aliases: Alias[]): Promise<Alias[]> {
  const updated = aliases.map((a) => ({ ...a, recent: false }));
  await setAliases(updated);
  return updated;
}
