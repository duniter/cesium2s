export declare type KeyType = string | number;
export declare type KeyValueType<T> = {[key in KeyType]: T};

export declare type KeysEnum<T> = { [P in keyof Required<T>]: boolean };

export declare interface ObjectMap<O = any> {
  [key: string]: O;
}

export declare interface ObjectMapEntry<O = any> {
  key: string;
  value?: O;
}

export declare type PropertiesMap = ObjectMap<string>;

export declare type Property = ObjectMapEntry<string>;

export declare type PropertiesArray = Property[];

export declare interface IconRef {
  icon?: string; // An ion-icon name
  matIcon?: string; // A mat icon
  matSvgIcon?: string; // A mat SVG icon
}
