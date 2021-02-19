# react-use-a2hs

[![All Contributors](https://img.shields.io/badge/all_contributors-6-orange.svg?style=flat-square)](#contributors)

![version](https://img.shields.io/npm/v/react-use-a2hs.svg?style=flat-square)
![size](https://img.shields.io/bundlephobia/min/react-use-a2hs.svg?style=flat-square)
![minzippedsize](https://img.shields.io/bundlephobia/minzip/react-use-a2hs.svg?style=flat-square)

Access [Before Install Prompt Event](https://developer.mozilla.org/en-US/docs/Web/API/BeforeInstallPromptEvent) using [React hooks](https://reactjs.org/docs/hooks-intro.html).

Support Only Chrome and Edge.

## How to use it

```javascript
import React from "react";
import ReactDOM from "react-dom";
import { useA2HS } from "react-use-a2hs";

function App() {
  const [promptEvent, promptToInstall] = useA2HS();

  return (
    <div className="App">
      {promptEvent && (
        <button onClick={promptToInstall}>{"please install PWA"}</button>
      )}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```
