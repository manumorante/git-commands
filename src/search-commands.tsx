import { List } from "@raycast/api";
import { Alias } from "./types";
import AliasItem from "./components/alias-item";
import { AppProvider, useApp } from "./lib/context";
import { maxPins, maxRecent } from "./lib/preferences";

function AliasList() {
  const { showDetails, isLoading, aliases, pins, recent } = useApp();

  return (
    <List isLoading={isLoading} isShowingDetail={showDetails}>
      <List.Section title="Pinned" subtitle={`${pins.length}`}>
        {pins.slice(0, maxPins).map((alias: Alias) => (
          <AliasItem key={alias.name} alias={alias} />
        ))}
      </List.Section>

      <List.Section title="Recent" subtitle={`${recent.length}`}>
        {recent
          .reverse()
          .slice(0, maxRecent)
          .map((alias: Alias) => (
            <AliasItem key={alias.name} alias={alias} />
          ))}
      </List.Section>

      <List.Section title="Aliases" subtitle={`${aliases.length}`}>
        {aliases.map((alias: Alias) => (
          <AliasItem key={alias.name} alias={alias} />
        ))}
      </List.Section>
    </List>
  );
}

export default function Command() {
  return (
    <AppProvider>
      <AliasList />
    </AppProvider>
  );
}
