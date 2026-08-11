import CtrlC from "./components/CtrlC.vue";
import vCtrlC from "./directives/vCtrlC.js";

CtrlC.install = (app) => {
  app.component("CtrlC", CtrlC);
  app.directive("ctrl-c", vCtrlC);
};

export default CtrlC;
export { CtrlC, vCtrlC };
