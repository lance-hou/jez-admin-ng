export class Menu {
  id: number;
  parent: Menu;
  icon: string;
  text: string;
  path: string;
  level: number;
  selected: boolean;
  expanded: boolean;
  leaf: boolean;
  children: Menu[];
}
