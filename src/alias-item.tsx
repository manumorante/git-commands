import { List, ActionPanel, Action, Keyboard, openExtensionPreferences, Icon, Color } from "@raycast/api";

import ItemDetail from "./alias-detail";
import { useApp } from "./context";
import { getPreferenceValues } from "@raycast/api";

const pref = getPreferenceValues();

import { Alias } from "./types";

export default function AliasItem({ alias }: { alias: Alias }) {
  const { name, command, description, type, pin, recent } = alias;
  const { addRecent, pinAlias, unpinAlias, removeRecent, clearAllRecent, toggleDetails } = useApp();
  const pinIcon = { source: Icon.Tack, tintColor: pref.IconPinColored && Color.Yellow };
  const typeIcon = { show: Color.Green, default: Color.Blue, delete: Color.Red }[type];

  // Keywords
  const cleanCommand = command.replace(/[^a-zA-Z0-9]/g, " ").replace(/-/g, " ");
  const keywords = [...new Set(`${cleanCommand} ${description}`.split(" "))];

  return (
    <List.Item
      key={name}
      icon={pref.ShowTypeIcon && { source: Icon.Dot, tintColor: typeIcon }}
      title={name}
      subtitle={{ value: command, tooltip: command }}
      keywords={[command, ...keywords]}
      accessories={pin ? [{ icon: pinIcon }] : []}
      actions={
        <ActionPanel>
          <ActionPanel.Section>
            <Action.CopyToClipboard title="Copy Alias" content={name} onCopy={() => addRecent(name)} />
            <Action.Paste title="Paste Alias" content={name} onPaste={() => addRecent(name)} />
          </ActionPanel.Section>

          <ActionPanel.Section>
            {pin ? (
              <Action
                icon={Icon.Pin}
                title="Unpin"
                onAction={() => unpinAlias(name)}
                shortcut={Keyboard.Shortcut.Common.Remove}
              />
            ) : (
              <Action
                icon={Icon.Pin}
                title="Pin"
                onAction={() => pinAlias(name)}
                shortcut={Keyboard.Shortcut.Common.Pin}
              />
            )}

            {recent && !pin && (
              <Action
                icon={Icon.XMarkCircle}
                title="Remove Recent"
                onAction={() => removeRecent(name)}
                shortcut={Keyboard.Shortcut.Common.Remove}
              />
            )}
          </ActionPanel.Section>

          <ActionPanel.Section>
            <Action
              icon={Icon.AppWindowSidebarRight}
              title="Toggle Details"
              onAction={toggleDetails}
              shortcut={Keyboard.Shortcut.Common.ToggleQuickLook}
            />
          </ActionPanel.Section>

          <ActionPanel.Section>
            <Action
              icon={Icon.XMarkCircle}
              title="Clear All Recent"
              onAction={clearAllRecent}
              shortcut={Keyboard.Shortcut.Common.RemoveAll}
            />

            <Action icon={Icon.Gear} title="Change Colors in Preferences" onAction={openExtensionPreferences} />
          </ActionPanel.Section>
        </ActionPanel>
      }
      detail={<ItemDetail name={name} command={command} description={description} />}
    />
  );
}
