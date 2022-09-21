import { inputTyping } from "./input";
import { textareaTyping } from "./textarea";
import { switchTyping } from "./switch";
import { inputNumberTyping } from "./input-number";
import { radioTyping } from "./radio";
import { checkboxTyping } from "./checkbox";
import { selectTyping } from "./select";
import { dateTyping } from "./date";
import { rateTyping } from "./rate";
import { colorPickerTyping } from "./color-picker";
import { StaticTextTyping } from "./static-text";
import { HtmlTextTyping } from "./html-text";
import { ImageTyping } from './image';
/**
 * 普通组件options
 */
export type IBsicElementOption =
  & inputTyping
  & textareaTyping
  & switchTyping
  & inputNumberTyping
  & radioTyping
  & checkboxTyping
  & selectTyping
  & dateTyping
  & rateTyping
  & colorPickerTyping
  & StaticTextTyping
  & HtmlTextTyping
  & ImageTyping;