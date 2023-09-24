import { ConfigInvalidError } from "./error";
import { Resource } from "./resource";

export class Config extends Resource {
    private file: string = '';
    private external: boolean = false;

    constructor(
        private name: string,
    ) {
        super();
    }

    withFile(filePath: string): Config {
        this.file = filePath;
        return this;
    }

    withExternal(isUseExternal: boolean): Config {
        this.external = isUseExternal;
        return this;
    }

    isValid(): boolean {
        if (this.name === "") {
            throw new ConfigInvalidError();
        }

        if (this.file === "" && this.external === false) {
            throw new ConfigInvalidError();
        }

        return true;
    }


    isValidInSystem(): boolean {
        return this.isValid();
    }

    buildServiceConfig(): string {
        this.isValid();

        return this.yamler.stringify(this.getObject());
    }

    buildSystemConfig(): string {
        this.isValidInSystem();

        return this.yamler.stringify(this.getSystemObject());
    }

    /**
     * Simply return the name of the config
     */
    getObject(): string | { [key: string]: any; } {
        this.isValid();

        return this.name;
    }

    /**
     * Return the config object for system
     * 
     * Example with config file
     * 
     * ```yaml
     * configs:
     *   config_name:
     *     file: /file/path
     * ```
     * 
     * Example with config external
     * ```yaml
     * configs:
     *   config_name:
     *     external: true
     * ```
     * 
     * Note that, only one way will be generate, if both external and file are provided, file will be picked.
     */
    getSystemObject(): string | { [key: string]: any; } {
        this.isValidInSystem();

        if (this.file) {
            return {
                [this.name]: {
                    file: this.file
                }
            }
        }

        return {
            [this.name]: {
                external: this.external
            }
        }
    }
}

export class Env extends Resource {
    constructor(
        protected key: string,
        protected value: string
    ) {
        super();
    }

    isValid(): boolean {
        if (this.key === "" || this.value === "") {
            throw new ConfigInvalidError();
        }

        return true;
    }

    isValidInSystem(): boolean {
        return this.isValid();
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
        this.isValid();

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
        this.isValidInSystem();

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
        this.isValid();

        return {
            name: this.key,
            value: this.value,
        }
    }

    /**
     * Return empty
     */
    getSystemObject(): string | { [key: string]: any; } {
        throw new Error("Method not implemented.");
    }
}
