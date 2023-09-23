import { beforeEach, describe, expect, it } from 'vitest';
import { Yamler } from '../../../src/app/presentation/yamler';

describe('Yamler', () => {
    let yamler: Yamler;

    beforeEach(() => {
        yamler = new Yamler();
    });

    it('should stringify an object to YAML', () => {
        const object = { name: 'John Doe', age: 30 };
        const expectedYAML = 'name: John Doe\nage: 30\n';
        const result = yamler.stringify(object);
        expect(result).toEqual(expectedYAML);
    });

    it('should parse a YAML string to an object', () => {
        const yamlString = 'name: John Doe\nage: 30\n';
        const expectedObject = { name: 'John Doe', age: 30 };
        const result = yamler.parse<{ name: string; age: number }>(yamlString);
        expect(result).toEqual(expectedObject);
    });

    it('should stringify an empty list to YAML', () => {
        const emptyList: any[] = [];
        const expectedYAML = '[]\n';
        const result = yamler.stringify(emptyList);
        expect(result).toEqual(expectedYAML);
    });

    it('should parse an empty YAML list to an empty array', () => {
        const emptyYAML = '[]\n';
        const expectedArray: any[] = [];
        const result = yamler.parse<any[]>(emptyYAML);
        expect(result).toEqual(expectedArray);
    });

    it('should stringify a list object to YAML', () => {
        const listObject = { fruits: ['apple', 'banana', 'orange'] };
        const expectedYAML = 'fruits:\n  - apple\n  - banana\n  - orange\n';
        const result = yamler.stringify(listObject);
        expect(result).toEqual(expectedYAML);
    });

    it('should parse a YAML string with a list object to the corresponding object', () => {
        const yamlString = 'fruits:\n  - apple\n  - banana\n  - orange\n';
        const expectedObject = { fruits: ['apple', 'banana', 'orange'] };
        const result = yamler.parse<{ fruits: string[] }>(yamlString);
        expect(result).toEqual(expectedObject);
    });

    it('should stringify a list with nested objects to YAML', () => {
        const nestedList = [
            { name: 'item1', value: 'value1' },
            { name: 'item2', value: 'value2' },
            { name: 'item3', value: 'value3' },
        ];
        const result = yamler.stringify({ list: nestedList });
        expect(typeof result).toBe("string");
    });

    it('should parse a YAML string with a list of nested objects to the corresponding object', () => {
        const yamlString = `list:
      - name: item1
        value: value1
      - name: item2
        value: value2
      - name: item3
        value: value3\n`;
        const expectedObject = {
            list: [
                { name: 'item1', value: 'value1' },
                { name: 'item2', value: 'value2' },
                { name: 'item3', value: 'value3' },
            ],
        };
        const result = yamler.parse<{ list: { name: string; value: string }[] }>(yamlString);
        expect(result).toEqual(expectedObject);
    });
});