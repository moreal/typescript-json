import benchmark from "benchmark";

export namespace AssertIterateBenchmarker {
    export interface IOutput<Components extends "name" | string> {
        name: string;
        result: Record<Components, number | null>;
    }
    export type IParameters<Components extends string, T> = Record<
        Components,
        null | ((input: T) => never | T)
    >;

    export const prepare =
        <Components extends string>(components: Components[]) =>
        <T>(
            name: string,
            generator: () => T,
            parameters: IParameters<Components, T>,
            spoilers?: Array<(input: T) => string[]>,
        ): (() => IOutput<Components>) => {
            // GENERATE DATA TO ASSERT
            const data: T = generator();

            const output: IOutput<Components> = {
                name,
                result: {} as any,
            };
            const suite: benchmark.Suite = new benchmark.Suite();

            for (const key of components) {
                const assert = parameters[key];
                if (assert === null) output.result[key] = null;
                else
                    suite.add(key, () => {
                        try {
                            assert(data);
                        } catch {}
                    });
            }

            return () => {
                suite.run();
                suite.map((elem: benchmark) => {
                    (output as any).result[elem.name!]! =
                        elem.count / elem.times.elapsed;
                });

                for (const key of components) {
                    if (
                        output.result[key] === null ||
                        (true &&
                            is(generator(), parameters[key]!) &&
                            (spoilers || []).every((spoil) => {
                                const fake: T = generator();
                                spoil(fake);
                                return is(fake, parameters[key]!) === false;
                            })) ||
                        key === "zod" ||
                        key === "class-validator"
                    )
                        continue;
                    output.result[key] = null;
                }
                return output;
            };
        };

    const is = <T>(data: T, assert: (input: T) => never | T): boolean => {
        try {
            assert(data);
            return true;
        } catch {
            return false;
        }
    };
}
