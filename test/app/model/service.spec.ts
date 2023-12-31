import { describe, expect, it } from "vitest";
import { Config, Env } from "../../../src/app/model/config";
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
                    environments:
                    {
                        "env1": "envValue1"
                    }
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


    describe("Test service [name, image, config]", () => {

        it("Should return right string format, without command -> empty", () => {
            const service = new Service("service_name").withImage("service_image").withConfigs([]);
            const expectString = yamler.stringify({
                service_name: {
                    image: "service_image"
                }
            });

            expect(service.buildSystemConfig()).toBe(expectString);
        });

        it("Should return right string format with config -- list of name", () => {
            const service = new Service("service_name").withImage("service_image").withConfigs([
                new Config('config_1').withFile('/file1'),
                new Config('config_2').withExternal(true),
            ])

            const expectString = yamler.stringify({
                service_name: {
                    image: "service_image",
                    configs: ['config_1', 'config_2']
                }
            });

            expect(service.buildSystemConfig()).toBe(expectString);
        });
    });

    describe("Test service [name, image, container_name]", () => {

        it("Should return right string format, without command -> empty", () => {
            const service = new Service("service_name").withImage("service_image").withContainerName("");
            const expectString = yamler.stringify({
                service_name: {
                    image: "service_image"
                }
            });

            expect(service.buildSystemConfig()).toBe(expectString);
        });

        it("Should return right string format with config -- list of name", () => {
            const service = new Service("service_name").withImage("service_image").withContainerName("container_name")

            const expectString = yamler.stringify({
                service_name: {
                    image: "service_image",
                    container_name: "container_name"
                }
            });

            expect(service.buildSystemConfig()).toBe(expectString);
        });
    });

    describe("Test service [name, image, depend_on]", () => {

        it("Should return right string format, without command -> empty", () => {
            const service = new Service("service_name").withImage("service_image").withDependsOn([]);
            const expectString = yamler.stringify({
                service_name: {
                    image: "service_image"
                }
            });

            expect(service.buildSystemConfig()).toBe(expectString);
        });

        it("Should return right string format with depends_on -- list of name", () => {
            const service = new Service("service_name").withImage("service_image").withDependsOn(["app1", "app2"])

            const expectString = yamler.stringify({
                service_name: {
                    image: "service_image",
                    depends_on: ["app1", "app2"]
                }
            });

            expect(service.buildSystemConfig()).toBe(expectString);
        });
    });

    describe("Test service [name, image, entrypoint]", () => {

        it("Should return right string format, without command -> empty", () => {
            const service = new Service("service_name").withImage("service_image").withEntrypoint([]);
            const expectString = yamler.stringify({
                service_name: {
                    image: "service_image"
                }
            });

            expect(service.buildSystemConfig()).toBe(expectString);
        });

        it("Should return right string format with entrypoint -> list string", () => {
            const service = new Service("service_name").withImage("service_image").withEntrypoint(["rm", "-rf"])

            const expectString = yamler.stringify({
                service_name: {
                    image: "service_image",
                    entrypoint: ["rm", "-rf"]
                }
            });

            expect(service.buildSystemConfig()).toBe(expectString);
        });
    });

    describe("Test service [name, image, entrypoint]", () => {

        it("Should return right string format, without env_file -> empty", () => {
            const service = new Service("service_name").withImage("service_image").withEnvFile([]);
            const expectString = yamler.stringify({
                service_name: {
                    image: "service_image"
                }
            });

            expect(service.buildSystemConfig()).toBe(expectString);
        });

        it("Should return right string format with env_file -> list string", () => {
            const service = new Service("service_name").withImage("service_image").withEnvFile(["./file1", "./file2"])

            const expectString = yamler.stringify({
                service_name: {
                    image: "service_image",
                    env_file: ["./file1", "./file2"]
                }
            });

            expect(service.buildSystemConfig()).toBe(expectString);
        });

        it("Should return right string format with env_file -> list string -- ADD", () => {
            const service = new Service("service_name").withImage("service_image").withEnvFile(["./file1", "./file2"])
            service.addEnvFile('./file3');

            const expectString = yamler.stringify({
                service_name: {
                    image: "service_image",
                    env_file: ["./file1", "./file2", "./file3"]
                }
            });

            expect(service.buildSystemConfig()).toBe(expectString);
        });
    });

    describe("Test service [name, image, expose]", () => {

        it("Should return right string format, without expose -> empty", () => {
            const service = new Service("service_name").withImage("service_image").withExpose([]);
            const expectString = yamler.stringify({
                service_name: {
                    image: "service_image"
                }
            });

            expect(service.buildSystemConfig()).toBe(expectString);
        });

        it("Should return right string format with expose -> list string", () => {
            const service = new Service("service_name").withImage("service_image").withExpose(["3000", "4321"])

            const expectString = yamler.stringify({
                service_name: {
                    image: "service_image",
                    expose: ["3000", "4321"]
                }
            });

            expect(service.buildSystemConfig()).toBe(expectString);
        });

        it("Should return right string format with env_file -> list string -- ADD", () => {
            const service = new Service("service_name").withImage("service_image").withEnvFile(["3000"])
            service.addEnvFile('4321');

            const expectString = yamler.stringify({
                service_name: {
                    image: "service_image",
                    env_file: ["3000", "4321"]
                }
            });

            expect(service.buildSystemConfig()).toBe(expectString);
        });
    });
});