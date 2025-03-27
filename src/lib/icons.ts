import { Icon, Color } from "@raycast/api";
import { AliasType } from "../types";
import { isPinColored, showTypeIcon } from "./preferences";

export function getTypeIcon(type: AliasType) {
  if (!showTypeIcon) return undefined;

  const typeColor = {
    show: Color.Green,
    default: Color.Blue,
    delete: Color.Red,
  };

  return {
    source: Icon.Dot,
    tintColor: typeColor[type],
  };
}

export function getPinIcon() {
  return { icon: { source: Icon.Tack, ...(isPinColored && { tintColor: Color.Yellow }) } };
}

export function getPinActionIcon(pin: boolean) {
  return pin ? Icon.TackDisabled : Icon.Tack;
}

export const icons = {
  details: Icon.AppWindowSidebarRight,
  remove: Icon.XMarkCircle,
  pin: Icon.Pin,
  settings: Icon.Gear,
};
