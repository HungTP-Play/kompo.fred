import { Yamler } from "../presentation/yamler";

export abstract class Resource {
    protected yamler: Yamler = new Yamler();
    /**
     * Build configuration for service in YAML string, like JSON string but YAML
     */
    abstract buildServiceConfig(): string;

    /**
     * Build configuration for system (global scope) in YAML string, like JSON string but YAML
     */
    abstract buildSystemConfig(): string;

    /**
     * Return the pure object
     */
    abstract getObject(): { [key: string]: any };
}