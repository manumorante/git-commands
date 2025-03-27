import { List } from "@raycast/api";
import { Alias } from "../types";

export default function ItemDetail({ alias }: { alias: Alias }) {
  const detail = `## ${alias.name}
  ####
  \`\`\`
  ${alias.command}
  \`\`\`
  ${alias.description}`;

  return <List.Item.Detail markdown={detail} />;
}
