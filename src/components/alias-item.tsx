import { List, ActionPanel, Action, Keyboard, openExtensionPreferences } from "@raycast/api";

import { Alias } from "../types";
import ItemDetail from "./alias-detail";
import { useApp } from "../lib/context";
import { getPinIcon, getTypeIcon, icons } from "../lib/icons";
import { toKeyword } from "../lib/utils";

export default function AliasItem({ alias }: { alias: Alias }) {
  const { toggleDetails, addRecent, clearRecent, pinAlias, unpinAlias, removeRecent } = useApp();
  const accessories = alias.pin ? [getPinIcon()] : [];
  return (
    <List.Item
      key={alias.name}
      icon={getTypeIcon(alias.type)}
      title={alias.name}
      subtitle={{ value: alias.command, tooltip: alias.command }}
      keywords={[...alias.description.split(" "), ...alias.command.split(" ").map(toKeyword).flat()]}
      accessories={accessories}
      actions={
        <ActionPanel>
          <ActionPanel.Section>
            <Action.CopyToClipboard title="Copy Alias" content={alias.name} onCopy={() => addRecent(alias)} />
            <Action.Paste title="Paste Alias" content={alias.name} onPaste={() => addRecent(alias)} />
          </ActionPanel.Section>

          <ActionPanel.Section>
            {alias.pin ? (
              <Action
                icon={icons.pin}
                title="Unpin"
                onAction={() => unpinAlias(alias)}
                shortcut={Keyboard.Shortcut.Common.Remove}
              />
            ) : (
              <Action
                icon={icons.pin}
                title="Pin"
                onAction={() => pinAlias(alias)}
                shortcut={Keyboard.Shortcut.Common.Pin}
              />
            )}

            {alias.recent && !alias.pin && (
              <Action
                icon={icons.remove}
                title="Remove Recent"
                onAction={() => removeRecent(alias)}
                shortcut={Keyboard.Shortcut.Common.Remove}
              />
            )}
          </ActionPanel.Section>

          <ActionPanel.Section>
            <Action
              icon={icons.details}
              title="Toggle Details"
              onAction={toggleDetails}
              shortcut={Keyboard.Shortcut.Common.ToggleQuickLook}
            />
          </ActionPanel.Section>

          <ActionPanel.Section>
            <Action
              icon={icons.remove}
              title="Clear All Recent"
              onAction={clearRecent}
              shortcut={Keyboard.Shortcut.Common.RemoveAll}
            />

            <Action icon={icons.settings} title="Change Colors in Preferences" onAction={openExtensionPreferences} />
          </ActionPanel.Section>
        </ActionPanel>
      }
      detail={<ItemDetail alias={alias} />}
    />
  );
}
