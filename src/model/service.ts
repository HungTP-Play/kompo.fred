/* eslint-disable */
import { Config } from "./config";
import { Environment } from "./environment";
import { Secret } from "./secret";
import { Volume } from "./volume";

export const protobufPackage = "kompo";

export interface Service {
  name: string;
  image: string;
  environments: Environment[];
  configs: Config[];
  secrets: Secret[];
  volumes: Volume[];
}

function createBaseService(): Service {
  return { name: "", image: "", environments: [], configs: [], secrets: [], volumes: [] };
}

export const Service = {
  fromJSON(object: any): Service {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      image: isSet(object.image) ? String(object.image) : "",
      environments: Array.isArray(object?.environments)
        ? object.environments.map((e: any) => Environment.fromJSON(e))
        : [],
      configs: Array.isArray(object?.configs) ? object.configs.map((e: any) => Config.fromJSON(e)) : [],
      secrets: Array.isArray(object?.secrets) ? object.secrets.map((e: any) => Secret.fromJSON(e)) : [],
      volumes: Array.isArray(object?.volumes) ? object.volumes.map((e: any) => Volume.fromJSON(e)) : [],
    };
  },

  toJSON(message: Service): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.image !== "") {
      obj.image = message.image;
    }
    if (message.environments?.length) {
      obj.environments = message.environments.map((e) => Environment.toJSON(e));
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

  create<I extends Exact<DeepPartial<Service>, I>>(base?: I): Service {
    return Service.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Service>, I>>(object: I): Service {
    const message = Object.create(createBaseService()) as Service;
    message.name = object.name ?? "";
    message.image = object.image ?? "";
    message.environments = object.environments?.map((e) => Environment.fromPartial(e)) || [];
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
