import { environment } from '@environments/environment';
import { RxState } from '@rx-angular/state';

declare type Constructor = new (...args: any[]) => any;
const STATE_VAR_NAME_KEY = '__stateName';
const DEFAULT_STATE_VAR_NAME = '_state';

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function RxStateRegister(): PropertyDecorator {
  // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
  return function(target: Constructor, key: string) {
    // DEBUG
    //console.debug(`${target.constructor?.name} @State() ${key}`);

    if (!!target[STATE_VAR_NAME_KEY]) throw new Error('Cannot define more than one @State() in class hierarchy');

    Object.defineProperty(target, STATE_VAR_NAME_KEY, {
      value: key,
      writable: false,
      enumerable: false,
      configurable: false
    });

    // Create if not exists
    if (!target[key]) {
      console.debug(`${target.constructor?.name} @State() ${key} => getter()`);

      // Add a createState() function
      // This is a workaround to be able to create the state dynamically, without import in the getter function bellow
      if (!target['createState']) {
        Object.defineProperty(target, 'createState', {
          value: () => new RxState<any>(),
          writable: false,
          enumerable: false,
          configurable: false
        });
      }

      const _key = '_' + key;

      // DEBUG
      const getMethodName = 'get' + key.charAt(0).toUpperCase() + key.slice(1);
      const getter = new Function(`return function ${getMethodName}(){\n if (!this.${_key}) this.${_key} = this.createState();\n  return this.${_key};\n}`)();

      target[getMethodName] = getter;

      Object.defineProperty(target, key, {
        get: getter,
        enumerable: true,
        configurable: true
      });
    }
  }
}

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function RxStateProperty<T = any>(statePropertyName?: string|keyof T, opts?: {stateName?: string}): PropertyDecorator {


  // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
  return function(target: Constructor, key: string) {
    // DEBUG
    //console.debug(`${target.constructor?.name} @StateProperty() ${key}`);

    statePropertyName = statePropertyName as string || key;
    const state = target[STATE_VAR_NAME_KEY] || opts?.stateName || DEFAULT_STATE_VAR_NAME;

    // property getter
    const getMethodName = 'get' + key.charAt(0).toUpperCase() + key.slice(1);
    const setMethodName = 'set' + key.charAt(0).toUpperCase() + key.slice(1);

    const checkStateExists = !environment.production ? `  if (!this.${state}) throw new Error('Missing state! Please add a RxState in class: ' + this.constructor.name);\n` : "";
    const getter = new Function(`return function ${getMethodName}(){\n  return this.${state}.get('${statePropertyName}');\n}`)();
    const setter = new Function(`return function ${setMethodName}(value){\n${checkStateExists}  this.${state}.set('${statePropertyName}', _ => value);\n}`)()

    target[getMethodName] = getter;
    target[setMethodName] = setter;

    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    });
  }
}


// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function RxStateSelect<T = any>(statePropertyName?: string|keyof T, opts?: {stateName?: string}): PropertyDecorator {

  // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
  return function(target: Constructor, key: string) {
    // DEBUG
    //console.debug(`${target.constructor?.name} @RxStateSelect() ${key}`);

    const state = target[STATE_VAR_NAME_KEY] || opts?.stateName || DEFAULT_STATE_VAR_NAME;

    statePropertyName = statePropertyName as string || key.replace(/\$?$/, '');
    const _key = '_' + key;

    // property getter
    const getMethodName = 'get' + statePropertyName.charAt(0).toUpperCase() + statePropertyName.slice(1);

    // DEBUG
    const getter = new Function(`return function ${getMethodName}(){\n if (!this.${_key}) this.${_key} = this.${state}.select('${statePropertyName}');\n  return this.${_key};\n}`)();

    target[getMethodName] = getter;

    Object.defineProperty(target, key, {
      get: getter,
      enumerable: true,
      configurable: false
    });
  }
}
