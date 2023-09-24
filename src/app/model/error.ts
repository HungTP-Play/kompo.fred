export class ServiceWrongCallException extends Error {
    message: string = "Wrong call on service";
    name: string = "ServiceWrongCallException";
    cause?: unknown = "Properly, you called to an unhandled or SHOULD NOT CALL METHOD"
}

export class ServiceInvalidError extends Error {
    name: string = "ServiceInvalidError";
    message: string = "Invalid service";
    cause?: unknown = "Name and image are empty. You need to set both name and image."
}

/** CONFIG */
export class ConfigInvalidError extends Error {
    name: string = "ConfigInvalidError";
    message: string = "Invalid config";
    cause?: unknown = "file or external is not provided. Or name is empty."
}

/** ENV */

export class EnvInvalidError extends Error {
    name: string = "EnvInvalidError";
    message: string = "Invalid environment";
    cause?: unknown = "Key and value are empty, these fields are all required."
}

/** SECRET */
export class SecretInvalidError extends Error {
    name: string = "SecretInvalidError";
    message: string = "Invalid secret";
    cause?: unknown = "Key and value are empty, these fields are all required."
}

/** VOLUMES */
export class VolumeInvalidError extends Error {
    name: string = "VolumeInvalidError";
    message: string = "Invalid volume configuration";
    cause?: unknown = "Missing mountPath";
}