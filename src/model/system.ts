/* eslint-disable */
import { Config } from "./config";
import { Secret } from "./secret";
import { Service } from "./service";
import { Volume } from "./volume";

export const protobufPackage = "kompo";

export interface System {
  services: Service[];
  configs: Config[];
  secrets: Secret[];
  volumes: Volume[];
}

function createBaseSystem(): System {
  return { services: [], configs: [], secrets: [], volumes: [] };
}

export const System = {
  fromJSON(object: any): System {
    return {
      services: Array.isArray(object?.services) ? object.services.map((e: any) => Service.fromJSON(e)) : [],
      configs: Array.isArray(object?.configs) ? object.configs.map((e: any) => Config.fromJSON(e)) : [],
      secrets: Array.isArray(object?.secrets) ? object.secrets.map((e: any) => Secret.fromJSON(e)) : [],
      volumes: Array.isArray(object?.volumes) ? object.volumes.map((e: any) => Volume.fromJSON(e)) : [],
    };
  },

  toJSON(message: System): unknown {
    const obj: any = {};
    if (message.services?.length) {
      obj.services = message.services.map((e) => Service.toJSON(e));
    }
    if (message.configs?.length) {
      obj.configs = message.configs.map((e) => Config.toJSON(e));
    }
    if (message.secrets?.length) {
      obj.secrets = message.secrets.map((e) => Secret.toJSON(e));
    }
    if (message.volumes?.length) {
      obj.volumes = message.volumes.map((e) => Volume.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<System>, I>>(base?: I): System {
    return System.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<System>, I>>(object: I): System {
    const message = Object.create(createBaseSystem()) as System;
    message.services = object.services?.map((e) => Service.fromPartial(e)) || [];
    message.configs = object.configs?.map((e) => Config.fromPartial(e)) || [];
    message.secrets = object.secrets?.map((e) => Secret.fromPartial(e)) || [];
    message.volumes = object.volumes?.map((e) => Volume.fromPartial(e)) || [];
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
