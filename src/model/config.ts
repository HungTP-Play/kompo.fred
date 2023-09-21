/* eslint-disable */
import { Environment } from "./environment";

export const protobufPackage = "kompo";

export interface Config {
  name: string;
  path: string;
  environments: Environment[];
}

function createBaseConfig(): Config {
  return { name: "", path: "", environments: [] };
}

export const Config = {
  fromJSON(object: any): Config {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      path: isSet(object.path) ? String(object.path) : "",
      environments: Array.isArray(object?.environments)
        ? object.environments.map((e: any) => Environment.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Config): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.path !== "") {
      obj.path = message.path;
    }
    if (message.environments?.length) {
      obj.environments = message.environments.map((e) => Environment.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Config>, I>>(base?: I): Config {
    return Config.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Config>, I>>(object: I): Config {
    const message = Object.create(createBaseConfig()) as Config;
    message.name = object.name ?? "";
    message.path = object.path ?? "";
    message.environments = object.environments?.map((e) => Environment.fromPartial(e)) || [];
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends { $case: string } ? { [K in keyof Omit<T, "$case">]?: DeepPartial<T[K]> } & { $case: T["$case"] }
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
