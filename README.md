## bbterm

A web terminal

## Install

```
yarn add @bbbottle/bbterm
```

## Usage

```javascript
import { startShell } from "@bbbottle/bbterm"
const $wrapper = document.getElementById('wrapper');
startShell($wrapper);
```

## API

**startShell**
```javascript
function startShell(
  wrapper: HTMLElement,
  commands?: Command[],
  options?: Options
)
```
