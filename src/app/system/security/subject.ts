import {User} from '../users/user';
import {Group} from '../groups/group';
import {Resource} from '../resources/resource';

export class Subject {
  user: User;
  groups: Group[];
  resources: Resource[];
}
