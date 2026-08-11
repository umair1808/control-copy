import type { DefineComponent, Directive } from "vue";

declare const CtrlC: DefineComponent<
  {
    copyIcon?: string;
    text?: string | null;
    showIcon?: boolean;
    ui?: boolean;
  },
  {},
  {},
  {},
  {},
  {},
  {},
  {
    "copy-success": [text: string];
    "copy-error": [error: Error];
    copy: [text: string, result: boolean];
  }
>;

export default CtrlC;

export declare const vCtrlC: Directive;
