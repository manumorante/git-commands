import { List } from "@raycast/api";
import { Alias } from "./types";
import AliasItem from "./alias-item";
import { AppProvider, useApp } from "./context";
import { getPreferenceValues } from "@raycast/api";

const preferences = getPreferenceValues();

function AliasList() {
  const { showDetails, aliases, pins, recent } = useApp();

  return (
    <List isShowingDetail={showDetails}>
      <List.Section title="Pinned" subtitle={`${pins.length}`}>
        {pins.slice(0, preferences.maxPins).map((alias: Alias) => (
          <AliasItem key={alias.name} alias={alias} />
        ))}
      </List.Section>

      <List.Section title="Recent" subtitle={`${recent.length}`}>
        {recent
          .reverse()
          .slice(0, preferences.maxRecent)
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
