import { MENU, type MenuKey, NOT_FOUND } from "./constants";

/**
 * @description segment가 MenuKey에 있는지 판별하는 함수, true일 때 segment는 MenuKey임을 보장받을 수 있다.
 * @param {string | null} segment
 * @returns {boolean}
 */
export const isSegmentInMenu = (segment: string | null): segment is MenuKey => {
  if (!segment) return false;
  return segment in MENU;
};

/**
 * @description segment에 따라 다른 Menu를 리턴하는 함수
 * @param {string | null} segment
 * @returns {MenuType}
 */
export const getMenu = (segment: string | null) => {
  if (isSegmentInMenu(segment)) {
    return MENU[segment];
  }
  return NOT_FOUND;
};
