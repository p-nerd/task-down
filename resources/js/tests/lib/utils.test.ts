import { add } from "@/lib/utils";
import { describe, expect, test } from "vitest";

describe("add()", () => {
    test("adds 1 + 2 to equal 3", () => {
        expect(add(1, 2)).toBe(3);
    });
});
