import { isNil } from '../functions';

// @dynamic
export abstract class EntityUtils {
  static equals<T>(o1: T, o2: T, checkAttribute?: keyof T): boolean {
    checkAttribute = checkAttribute || ('id' as keyof T);
    return o1 === o2 || (isNil(o1) && isNil(o2)) || (o1 && o2 && o1[checkAttribute] === o2[checkAttribute]);
  }
}
