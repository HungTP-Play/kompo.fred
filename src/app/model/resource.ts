import { Yamler } from "../presentation/yamler";

export abstract class Resource {
    protected yamler: Yamler = new Yamler();

    abstract isValid(): boolean;
    /**
     * Build configuration for service in YAML string, like JSON string but YAML
     */
    abstract buildServiceConfig(): string;

    /**
     * Build configuration for system (global scope) in YAML string, like JSON string but YAML
     */
    abstract buildSystemConfig(): string;

    /**
     * Return the pure object for service
     */
    abstract getObject(): { [key: string]: any } | string;

    /**
     * Return the pure object for system
     */
    abstract getSystemObject(): { [key: string]: any } | string;
}