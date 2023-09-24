import { describe, expect, it } from "vitest";
import { Env } from "../../../src/app/model/config";
import { Service } from "../../../src/app/model/service";
import { Volume } from "../../../src/app/model/volume";
import { Yamler } from "../../../src/app/presentation/yamler";

describe("Test service", () => {
    const yamler = new Yamler();

    describe("Test service [name, image]", () => {
        const service = new Service("service_name").withImage("service_image");
        it("Should return right string format", () => {
            const expectString = yamler.stringify({
                service_name: {
                    image: "service_image"
                }
            });

            expect(service.buildSystemConfig()).toBe(expectString);
        });
    });

    describe("Test service [name, image, environments]", () => {

        it("Should return right string format, without environment -> empty", () => {
            const service = new Service("service_name").withImage("service_image").withEnvironments([]);
            const expectString = yamler.stringify({
                service_name: {
                    image: "service_image"
                }
            });

            expect(service.buildSystemConfig()).toBe(expectString);
        });

        it("Should return right string format with envs", () => {
            const service = new Service("service_name").withImage("service_image").withEnvironments([]);
            service.addEnv(new Env("env1", "envValue1"));

            const expectString = yamler.stringify({
                service_name: {
                    image: "service_image",
                    environments: [
                        {
                            name: "env1",
                            value: "envValue1"
                        }
                    ],
                }
            });

            expect(service.buildSystemConfig()).toBe(expectString);
        });
    });

    describe("Test service [name, image, volumes]", () => {

        it("Should return right string format, without volumes -> empty", () => {
            const service = new Service("service_name").withImage("service_image");
            const expectString = yamler.stringify({
                service_name: {
                    image: "service_image"
                }
            });

            expect(service.buildSystemConfig()).toBe(expectString);
        });

        it("Should return right string format with volumes", () => {
            const service = new Service("service_name").withImage("service_image").withVolumes(
                [
                    new Volume().withMountPath('/app/data'),
                    new Volume().withMountPath('/app/data2').withName('named'),
                    new Volume().withMountPath('/app/data3').withPath('host/path')
                ]
            );

            const expectString = yamler.stringify({
                service_name: {
                    image: "service_image",
                    volumes: [
                        '/app/data',
                        'named:/app/data2',
                        'host/path:/app/data3'
                    ],
                }
            });

            expect(service.buildSystemConfig()).toBe(expectString);
        });
    });

    describe("Test service [name, image, command]", () => {

        it("Should return right string format, without command -> empty", () => {
            const service = new Service("service_name").withImage("service_image").withCommand("");
            const expectString = yamler.stringify({
                service_name: {
                    image: "service_image"
                }
            });

            expect(service.buildSystemConfig()).toBe(expectString);
        });

        it("Should return right string format with command -- string", () => {
            const service = new Service("service_name").withImage("service_image").withCommand('ls')

            const expectString = yamler.stringify({
                service_name: {
                    image: "service_image",
                    command: 'ls'
                }
            });

            expect(service.buildSystemConfig()).toBe(expectString);
        });

        it("Should return right string format with command -- list string", () => {
            const service = new Service("service_name").withImage("service_image").withCommand(['rm', '-rf', '.'])

            const expectString = yamler.stringify({
                service_name: {
                    image: "service_image",
                    command: ['rm', '-rf', '.']
                }
            });

            expect(service.buildSystemConfig()).toBe(expectString);
        });
    });
});