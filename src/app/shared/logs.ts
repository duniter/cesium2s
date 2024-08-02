import { changeCaseToUnderscore } from '@app/shared/functions';
import { Constructor } from '@app/shared/types';

export function logPrefix<T extends Constructor | Function>(constructor: T, options?: { name?: string }) {
  return `[${options?.name || changeCaseToUnderscore(constructor.name).replace(/_/g, '-')}] `;
}
