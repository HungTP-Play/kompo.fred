import { VolumeInvalidError } from "./error";
import { Resource } from "./resource";

export class Volume extends Resource {
    private name = "";
    private path = "";
    private mountPath = "";

    constructor() {
        super();
    }

    withName(name: string): Volume {
        this.name = name;
        return this;
    }

    /**
     * Set the path, path is the path in the **HOST** of the volume
     * can be absolute, relative or user relative path.
     * 
     * @param path 
     * @returns 
     */
    withPath(path: string): Volume {
        this.path = path;
        return this;
    }

    /**
     * Set the mountPath to the container, the path should be absolute path.
     * @param mountPath 
     * @returns 
     */
    withMountPath(mountPath: string): Volume {
        this.mountPath = mountPath;
        return this;
    }

    isValid(): boolean {
        if (this.mountPath === "") {
            throw new VolumeInvalidError();
        }

        return true;
    }

    isValidInSystem(): boolean {
        throw new Error("Method not implemented.");
    }

    /**
     * Return the short-hand volume configuration for a service
     * 
     * 
     */
    buildServiceConfig(): string {
        this.isValid();

        return this.yamler.stringify(this.getObject());
    }

    buildSystemConfig(): string {
        this.isValid();

        return this.yamler.stringify(this.getSystemObject());
    }

    getObject(): string | { [key: string]: any; } {
        this.isValid();

        if (this.name === "" && this.path === "") {
            return this.mountPath;
        }

        return `${this.name || this.path}:${this.mountPath}`;
    }

    getSystemObject(): string | { [key: string]: any; } {
        this.isValidInSystem();
        
        throw new Error("Method not implemented.");
    }
}