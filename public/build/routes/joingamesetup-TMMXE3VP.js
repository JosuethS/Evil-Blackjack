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

// app/routes/joingamesetup.jsx
var import_react = __toESM(require_react(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\joingamesetup.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\joingamesetup.jsx"
  );
}
function JoinGameSetup() {
  _s();
  const [roomId, setRoomId] = (0, import_react.useState)("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Joining room:", roomId);
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "settingsTitle", children: "Join Game" }, void 0, false, {
      fileName: "app/routes/joingamesetup.jsx",
      lineNumber: 34,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", { onSubmit: handleSubmit, className: "formContainer", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", placeholder: "Enter Room ID", value: roomId, onChange: (e) => setRoomId(e.target.value), className: "roomInput" }, void 0, false, {
        fileName: "app/routes/joingamesetup.jsx",
        lineNumber: 37,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", className: "submitButton", children: "Submit" }, void 0, false, {
        fileName: "app/routes/joingamesetup.jsx",
        lineNumber: 39,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/joingamesetup.jsx",
      lineNumber: 36,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
      marginTop: "12rem"
    }, className: "settingsText", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "/playsetup", className: "titleButton", children: "Back" }, void 0, false, {
      fileName: "app/routes/joingamesetup.jsx",
      lineNumber: 45,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/joingamesetup.jsx",
      lineNumber: 42,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/joingamesetup.jsx",
    lineNumber: 33,
    columnNumber: 10
  }, this);
}
_s(JoinGameSetup, "7rRd7ryFXdanXC6PGPRYufpFY7Y=");
_c = JoinGameSetup;
var _c;
$RefreshReg$(_c, "JoinGameSetup");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  JoinGameSetup as default
};
//# sourceMappingURL=/build/routes/joingamesetup-TMMXE3VP.js.map
