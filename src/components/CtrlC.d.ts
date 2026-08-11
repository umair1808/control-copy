import type { DefineComponent, Directive } from "vue";

declare const CtrlC: DefineComponent<
  {
    copyIcon?: string;
    text?: string | null;
    showIcon?: boolean;
  },
  {},
  {}
>;

export default CtrlC;

export declare const vCtrlC: Directive;
