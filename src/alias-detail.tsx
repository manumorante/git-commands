import { List } from "@raycast/api";

export default function ItemDetail({
  name,
  command,
  description,
}: {
  name: string;
  command: string;
  description: string;
}) {
  const detail = `## ${name}
  ####
  \`\`\`
  ${command}
  \`\`\`
  ${description}`;

  return <List.Item.Detail markdown={detail} />;
}
