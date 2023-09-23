import YAML from 'yaml';
export class Yamler {
    stringify(object: any): string {
        return YAML.stringify(object);
    }

    parse<T>(str: string): T {
        return YAML.parse(str) as T;
    }
}