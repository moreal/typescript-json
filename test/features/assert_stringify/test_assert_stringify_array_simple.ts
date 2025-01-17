import TSON from "../../../src";
import { ArraySimple } from "../../structures/ArraySimple";
import { _test_assert_stringify } from "./_test_assert_stringify";

export const test_assert_stringify_array_simple = _test_assert_stringify(
    "simple array",
    ArraySimple.generate,
    (input) => TSON.assertStringify(input),
    ArraySimple.SPOILERS,
);
