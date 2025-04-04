import * as actions from "../actions";

type Input = {
  /**
   * List of git aliases to pin to your favorites
   */
  aliases: string[];
};

export default async function tool({ aliases }: Input) {
  const allAliases = await actions.getAliases();

  for (const alias of aliases) {
    await actions.pinAlias(allAliases, alias);
  }
}
