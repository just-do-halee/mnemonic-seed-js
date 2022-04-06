# **_`MNEMONIC-SEED-JS`_**

_mnemonic and seed generator according to BIP39_

<br>

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![License][license-image]][license-url]
[[changelog]](CHANGELOG.md)

```bash
npm install mnemonic-seed-js
```

```bash
yarn add mnemonic-seed-js
```

---

## **_`Examples`_**

```typescript
import Seed from 'mnemonic-seed-js';

const seed = Seed.new();

// === Seed.new({ bitsSize: '128', language: 'english', passphrase: '' });
```

```typescript
seed.buffer; // Bytes
seed.entropy; // Binary
seed.mnemonic; // Mnemonic

seed.kill(); // clear all datas
```

## **License**<br>

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/mnemonic-seed-js.svg
[npm-url]: https://npmjs.org/package/mnemonic-seed-js
[downloads-image]: https://img.shields.io/npm/dm/mnemonic-seed-js.svg
[downloads-url]: https://npmcharts.com/compare/mnemonic-seed-js?minimal=true
[license-url]: https://opensource.org/licenses/MIT
[license-image]: https://img.shields.io/npm/l/mnemonic-seed-js
