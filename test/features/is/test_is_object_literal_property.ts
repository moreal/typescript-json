import TSON from "../../../src";
import { ObjectLiteralProperty } from "../../structures/ObjectLiteralProperty";
import { _test_is } from "./_test_is";

export const test_is_object_literal_property = _test_is(
    "literal propertized object",
    ObjectLiteralProperty.generate,
    (input) => TSON.is(input),
    ObjectLiteralProperty.SPOILERS,
);
