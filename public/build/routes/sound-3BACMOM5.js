import "/build/_shared/chunk-2YAGQO5N.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XGOTYLZ5.js";
import {
  Link
} from "/build/_shared/chunk-NAM5H6GN.js";
import {
  createHotContext
} from "/build/_shared/chunk-V7EFKXUS.js";
import "/build/_shared/chunk-UWV35TSL.js";
import "/build/_shared/chunk-U4FRFQSK.js";
import {
  require_react
} from "/build/_shared/chunk-7M6SC7J5.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/routes/sound.jsx
var import_react = __toESM(require_react(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\sound.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\sound.jsx"
  );
}
function Sound() {
  _s();
  const [isMuted, setIsMuted] = (0, import_react.useState)(false);
  const handleMuteChange = () => {
    setIsMuted((prev) => !prev);
    console.log();
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "settingsDiv", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "settingsTitle", children: "Sound" }, void 0, false, {
      fileName: "app/routes/sound.jsx",
      lineNumber: 34,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "settingsSubTitle", children: "Adjust audio settings here:" }, void 0, false, {
      fileName: "app/routes/sound.jsx",
      lineNumber: 35,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
      marginTop: "27rem"
    }, className: "settingsText", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "/settings", className: "titleButton", children: "Back to Settings" }, void 0, false, {
      fileName: "app/routes/sound.jsx",
      lineNumber: 41,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/sound.jsx",
      lineNumber: 38,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/sound.jsx",
    lineNumber: 33,
    columnNumber: 10
  }, this);
}
_s(Sound, "X5OQ1lfso32t+hl9x/r7wjVuwPw=");
_c = Sound;
var _c;
$RefreshReg$(_c, "Sound");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Sound as default
};
//# sourceMappingURL=/build/routes/sound-3BACMOM5.js.map
