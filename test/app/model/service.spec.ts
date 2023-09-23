import { describe, expect, it } from "vitest";
import { Env } from "../../../src/app/model/config";
import { Service } from "../../../src/app/model/service";
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
});