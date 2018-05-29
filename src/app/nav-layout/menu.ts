export class Menu {
  id: number;
  parentId: number;
  icon: string;
  label: string;
  path: string;
  level: number;
  leaf: boolean;
  items: Menu[];
}
