import { rowTyping } from "./grid/row";
import { colTyping } from "./grid/col";
import { cardTyping } from "./card/card";
import { tabsTyping } from "./tabs/tabs";
import { tabPaneTyping } from "./tabs/tab-pane";
import { collapseTyping } from "./collapse/collapse";
import { collapsePanelTyping } from "./collapse/collapse-panel";
/** 容器组件Option */
export type IContainerElementOption =
  & rowTyping
  & colTyping
  & cardTyping
  & tabsTyping
  & tabPaneTyping
  & collapseTyping
  & collapsePanelTyping;
