export type Alias = {
  /** The alias name. */
  name: string;

  /** The full command. */
  command: string;

  /**
   * Type according to the impact the alias may have.
   * - show: Only shows information.
   * - default: Can edit, move or delete.
   * - delete: Related to information deletion.
   */
  type: "show" | "default" | "delete";

  /** The main command. E.g. `git` for `git commit`. */
  main?: string;

  /** The description of the alias. */
  description: string;

  /** Whether the alias is pinned. */
  pin?: boolean;

  /** Whether the alias is recent. */
  recent?: boolean;
};
