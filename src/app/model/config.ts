import { Resource } from "./resource";

export class Config extends Resource {
    constructor(
        protected key: string,
        protected value: string
    ) {
        super();
    }

    /**
     * Return YAML string for a list of single config object
     * 
     * Example
     * 
     * ```yaml
     * - name: key
     *   value: value
     * ```
     * @returns 
     */
    buildServiceConfig(): string {
        return this.yamler.stringify([this.getObject()]);
    }

    /**
     * Return YAML string for a list of single config object
     * 
     * Example
     * 
     * ```yaml
     * - name: key
     *   value: value
     * ```
     * @returns 
     */
    buildSystemConfig(): string {
        return this.yamler.stringify([this.getObject()]);
    }

    /**
     * Return pure configuration object **NOT LIST**
     * 
     * Example:
     * 
     * ```js
     * {
     *    name: key,
     *    value: value,
     * }
     * ```
     * @returns 
     */
    getObject(): { [key: string]: any; } {
        return {
            name: this.key,
            value: this.value,
        }
    }
}

export class Env extends Config {
    constructor(key: string, value: string) {
        super(key, value);
    }

    buildServiceConfig(): string {
        return super.buildServiceConfig();
    }

    buildSystemConfig(): string {
        return super.buildSystemConfig();
    }
}

export class Secret extends Config {
    constructor(key: string, value: string) {
        super(key, value);
    }

    buildServiceConfig(): string {
        return super.buildServiceConfig();
    }

    buildSystemConfig(): string {
        return super.buildSystemConfig();
    }
}