export class ServiceWrongCallException extends Error {
    message: string = "Wrong call on service";
    name: string = "ServiceWrongCallException";
    cause?: unknown = "Properly, you called to an unhandled or no-logic method"
}