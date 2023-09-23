import { describe, expect, it } from "vitest";
import { Config } from "../../../src/app/model/config";
import { Yamler } from "../../../src/app/presentation/yamler";

describe("Test config", () => {
    const config = new Config("key", "value");
    const yamler = new Yamler();

    it("Test buildServiceConfig", () => {
        const expectedString = yamler.stringify([{
            name: "key",
            value: "value",
        }]);

        expect(config.buildServiceConfig()).toBe(expectedString);
    });

    it("Test buildSystemConfig", () => {
        const expectedString = yamler.stringify([{
            name: "key",
            value: "value",
        }]);

        expect(config.buildSystemConfig()).toBe(expectedString);
    });
});