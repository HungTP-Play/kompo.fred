import type { Env } from "./config";
import { ServiceInvalidError, ServiceWrongCallException } from "./error";
import { Resource } from "./resource";

export class Service extends Resource {
    image: string = '';
    environments: Env[] = [];
    volumes: any[] = [];
    network: any[] = [];

    constructor(
        private name: string,
    ) {
        super();
    }

    /**
     * Set image for service
     * This method is useful for build a service
     * @param image 
     * @returns 
     */
    withImage(image: string): Service {
        this.image = image;
        return this;
    }

    /**
     * Add set environments to service.
     * This method is useful for build a service.
     * @param envs 
     * @returns 
     */
    withEnvironments(envs: Env[]): Service {
        this.environments = envs;
        return this;
    }

    addEnv(env: Env) {
        this.environments.push(env);
    }

    isValid(): boolean {
        if (this.name === "" || this.image === "") {
            throw new ServiceInvalidError();
        }

        return true;
    }

    /**
     * **DO NOT CALL THIS METHOD**
     * 
     * There is no service in service => **throw Error**
     * @returns 
     */
    buildServiceConfig(): string {
        throw new ServiceWrongCallException();
    }

    /**
     * Return a single service configuration in YAML format
     * 
     * Example
     * 
     * ```yaml
     * [service.name]:
     *   image: image
     *   environments:
     *     - name: name
     *       value: value
     * ```
     * @returns 
     */
    buildSystemConfig(): string {
        return this.yamler.stringify(this.getSystemObject());
    }

    /**
     * Remove all falsy fields
     * 
     * **NOTE: Only in the 1st level**
     * 
     * @param obj 
     */
    cleanUp(obj: { [key: string]: any }) {
        // Do remove in the most outer level
        for (const k in obj) {
            if (Array.isArray(obj[k])) {
                if (Array.from(obj[k]).length === 0) {
                    console.log('Delete')
                    delete obj[k];
                }
                continue;
            }

            switch (typeof obj[k]) {
                case "object":
                    if (Object.keys(obj[k]).length === 0) {
                        delete obj[k];
                    }
                    break;
                case "string":
                    if (obj[k] === "") {
                        delete obj[k];
                    }
                    break;
                case "undefined":
                    delete obj[k];
                    break;
                default:
                    break;
            }
        }

        return obj;

    }

    getObject(): { [key: string]: any; } {
        throw new ServiceWrongCallException();
    }

    getSystemObject(): string | { [key: string]: any; } {
        this.isValid();
        
        return {
            [this.name]: this.cleanUp({
                image: this.image,
                environments: this.environments.map((e) => e.getObject()),
            }),
        }
    }
}