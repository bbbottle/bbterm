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

### startShell

**Type Signature**
```javascript
function startShell(
  $dom: HTMLElement,
  commands?: Command[],
  options?: Options
)
```