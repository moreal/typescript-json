import TSON from "../../../src";
import { ObjectGenericAlias } from "../../structures/ObjectGenericAlias";
import { _test_assert_stringify } from "./../assert_stringify/_test_assert_stringify";

export const test_create_assert_stringify_object_generic_alias =
    _test_assert_stringify(
        "generic aliased object",
        ObjectGenericAlias.generate,
        TSON.createAssertStringify<ObjectGenericAlias>(),
        ObjectGenericAlias.SPOILERS,
    );
