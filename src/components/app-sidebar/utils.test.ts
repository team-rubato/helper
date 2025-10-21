import { test, expect } from "vitest";
import { getMenu, isSegmentInMenu } from "./utils";
import { MENU, NOT_FOUND } from "./constants";

test("Test: isSegmentInMenu", () => {
  expect(isSegmentInMenu(null)).toBe(false);
  expect(isSegmentInMenu("")).toBe(false);
  expect(isSegmentInMenu("invalid")).toBe(false);

  expect(isSegmentInMenu("trading")).toBe(true);
  expect(isSegmentInMenu("procurement")).toBe(true);
});

test("Test: getMenu", () => {
  expect(getMenu(null)).toStrictEqual(NOT_FOUND);
  expect(getMenu("")).toStrictEqual(NOT_FOUND);
  expect(getMenu("invalid")).toStrictEqual(NOT_FOUND);

  expect(getMenu("trading")).toStrictEqual(MENU["trading"]);
  expect(getMenu("procurement")).toStrictEqual(MENU["procurement"]);
});
