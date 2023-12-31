import type { Config, Env } from "./config";
import { ServiceInvalidError, ServiceWrongCallException } from "./error";
import { Resource } from "./resource";
import type { Volume } from "./volume";

export class Service extends Resource {
    private image: string = '';
    private environments: Env[] = [];
    private volumes: Volume[] = [];
    private configs: Config[] = [];
    private network: any[] = [];
    private command: string | string[] = '';
    private containerName = '';
    private dependsOn: string[] = [];
    private entrypoint: string | string[] = '';
    private envFile: string[] = [];
    private expose: string[] = [];

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

    withVolumes(volumes: Volume[]): Service {
        this.volumes = volumes;
        return this;
    }

    withCommand(command: string | string[]): Service {
        this.command = command;
        return this;
    }

    withConfigs(configs: Config[]): Service {
        this.configs = configs;
        return this;
    }

    withContainerName(name: string): Service {
        this.containerName = name;
        return this;
    }

    withDependsOn(dependsOn: string[]): Service {
        this.dependsOn = dependsOn;
        return this;
    }

    withEntrypoint(entrypoint: string | string[]): Service {
        this.entrypoint = entrypoint;
        return this;
    }

    /**
     * 
     * @param files list of file (path to files)
     */
    withEnvFile(files: string[]): Service {
        this.envFile = files;
        return this;
    }

    withExpose(ports: string[]): Service {
        this.expose = ports;
        return this;
    }

    addExpose(port: string) {
        this.expose.push(port);
    }

    addEnvFile(file: string) {
        this.envFile.push(file);
    }

    addDependsOn(dependOn: string) {
        this.dependsOn.push(dependOn);
    }

    addConfig(config: Config) {
        this.configs.push(config);
    }

    addVolume(volume: Volume) {
        this.volumes.push(volume);
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

    isValidInSystem(): boolean {
        return this.isValid();
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
        this.isValidInSystem();

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

    private envListToMap(envs: Env[]): { [key: string]: string } {
        const envMap: { [key: string]: string } = {};
        const envsObject = envs.map((e) => e.getObject());
        for (const e of envsObject) {
            const key = e['name'];
            const value = e['value'];

            envMap[key] = value;
        }

        return envMap
    }

    getSystemObject(): string | { [key: string]: any; } {
        this.isValid();

        return {
            [this.name]: this.cleanUp({
                image: this.image,
                environments: this.envListToMap(this.environments),
                volumes: this.volumes.map((v) => v.getObject()),
                command: this.command,
                configs: this.configs.map((c) => c.getObject()),
                container_name: this.containerName,
                depends_on: this.dependsOn,
                entrypoint: this.entrypoint,
                env_file: this.envFile,
                expose: this.expose,
            }),
        }
    }
}