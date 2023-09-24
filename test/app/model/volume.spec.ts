import { beforeEach, describe, expect, it } from "vitest";
import { VolumeInvalidError } from "../../../src/app/model/error";
import { Volume } from "../../../src/app/model/volume";


describe('Volume', () => {
    let volume: Volume;

    beforeEach(() => {
        volume = new Volume();
    });

    it('should set the name of the volume', () => {
        const name = 'my-volume';
        const result = volume.withName(name);
        expect(volume['name']).toEqual(name);
        expect(result).toBeInstanceOf(Volume);
    });

    it('should set the path of the volume', () => {
        const path = '/data/volume';
        const result = volume.withPath(path);
        expect(volume['path']).toEqual(path);
        expect(result).toBeInstanceOf(Volume);
    });

    it('should set the mount path of the volume', () => {
        const mountPath = '/var/www/html';
        const result = volume.withMountPath(mountPath);
        expect(volume['mountPath']).toEqual(mountPath);
        expect(result).toBeInstanceOf(Volume);
    });

    it('should throw an error if mount path is not set', () => {
        expect(() => volume.isValid()).toThrow(VolumeInvalidError);
    });

    it('should return true for a valid volume', () => {
        volume.withMountPath('/var/www/html');
        const result = volume.isValid();
        expect(result).toBeTruthy();
    });

    it('should build the service configuration for a volume', () => {
        volume.withName('my-volume').withPath('/data/volume').withMountPath('/var/www/html');
        const expectedConfig = 'my-volume:/var/www/html\n';
        const result = volume.buildServiceConfig();
        expect(result).toEqual(expectedConfig);
    });

    it('should build the system configuration for a volume', () => {
        volume.withName('my-volume').withPath('/data/volume').withMountPath('/var/www/html');
        expect(() => volume.buildSystemConfig()).toThrow(Error);
    });

    it('should return the object representation of the volume', () => {
        volume.withName('my-volume').withPath('/data/volume').withMountPath('/var/www/html');
        const expectedObject = "my-volume:/var/www/html";
        const result = volume.getObject();
        expect(result).toEqual(expectedObject);
    });
});