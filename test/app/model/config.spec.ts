import { beforeEach, describe, expect, it } from "vitest";
import { Config } from "../../../src/app/model/config";
import { ConfigInvalidError } from "../../../src/app/model/error";
import { Yamler } from "../../../src/app/presentation/yamler";

describe('Config', () => {
    let config: Config;

    beforeEach(() => {
        config = new Config('my-config');
    });

    it('should set the file path of the config', () => {
        const filePath = '/path/to/config/file';
        const result = config.withFile(filePath);
        expect(config['file']).toEqual(filePath);
        expect(result).toBeInstanceOf(Config);
    });

    it('should set the external flag of the config', () => {
        const isUseExternal = true;
        const result = config.withExternal(isUseExternal);
        expect(config['external']).toEqual(isUseExternal);
        expect(result).toBeInstanceOf(Config);
    });

    it('should throw an error if name is not set', () => {
        const invalidConfig = new Config(''); // Create a config with an empty name
        expect(() => invalidConfig.isValid()).toThrow(ConfigInvalidError);
    });

    it('should throw an error if both file and external flag are not set', () => {
        expect(() => config.isValid()).toThrow(ConfigInvalidError);
    });

    it('should return true for a valid config', () => {
        config.withFile('/path/to/config/file').withExternal(false);
        const result = config.isValid();
        expect(result).toBeTruthy();
    });

    it('should validate the config for the system', () => {
        config.withFile('/path/to/config/file').withExternal(false);
        const result = config.isValidInSystem();
        expect(result).toBeTruthy();
    });

    it('should return the name of the config', () => {
        const expectedName = 'my-config';
        const result = config.withFile('/file').getObject();
        expect(result).toEqual(expectedName);
    });

    it('should build the system configuration for a file-based config', () => {
        config.withFile('/path/to/config/file').withExternal(false);
        const expectedConfig = {
            'my-config': {
                file: '/path/to/config/file',
            },
        };
        const result = config.getSystemObject();
        expect(result).toEqual(expectedConfig);
    });

    it('should build the system configuration for an external config', () => {
        config.withFile('').withExternal(true);
        const expectedConfig = {
            'my-config': {
                external: true,
            },
        };
        const result = config.getSystemObject();
        expect(result).toEqual(expectedConfig);
    });

    it('should build the system configuration for a file-based config -- YAML', () => {
        config.withFile('/path/to/config/file').withExternal(false);
        const expectedConfig = {
            'my-config': {
                file: '/path/to/config/file',
            },
        };
        const yamler = new Yamler();
        const expectedString = yamler.stringify(expectedConfig);
        const result = config.buildSystemConfig();
        expect(result).toEqual(expectedString);
    });

    it('should build the system configuration for an external config', () => {
        config.withFile('').withExternal(true);
        const expectedConfig = {
            'my-config': {
                external: true,
            },
        };
        const yamler = new Yamler();
        const expectedString = yamler.stringify(expectedConfig);
        const result = config.buildSystemConfig();
        expect(result).toEqual(expectedString);
    });
});