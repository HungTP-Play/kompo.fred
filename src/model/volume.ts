/* eslint-disable */

export const protobufPackage = "kompo";

export interface Volume {
  /** The name of the volume */
  name: string;
  /** The path of the volume (actual on the file system) */
  actualPath: string;
  /** The path that the volume will be mount to */
  mountPath: string;
}

function createBaseVolume(): Volume {
  return { name: "", actualPath: "", mountPath: "" };
}

export const Volume = {
  fromJSON(object: any): Volume {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      actualPath: isSet(object.actualPath) ? String(object.actualPath) : "",
      mountPath: isSet(object.mountPath) ? String(object.mountPath) : "",
    };
  },

  toJSON(message: Volume): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.actualPath !== "") {
      obj.actualPath = message.actualPath;
    }
    if (message.mountPath !== "") {
      obj.mountPath = message.mountPath;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Volume>, I>>(base?: I): Volume {
    return Volume.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Volume>, I>>(object: I): Volume {
    const message = Object.create(createBaseVolume()) as Volume;
    message.name = object.name ?? "";
    message.actualPath = object.actualPath ?? "";
    message.mountPath = object.mountPath ?? "";
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
