# @lp-labs/lei-checksum

ISO-style Legal Entity Identifier mod97 checksum arithmetic.

Original, standalone MIT TypeScript implementation with **zero runtime or peer dependencies**. ESM/CommonJS exports and separate declarations; Node18+ and compatible ES2022 browsers. No service, filesystem, network, clock or browser globals accessed on import. Compiler/formatter dependencies are development-only.

## Install

```sh
npm install @lp-labs/lei-checksum
```

## Working example

```js
import { validateLei } from '@lp-labs/lei-checksum';
if (!validateLei('529900T8BM49AURSDO55')) throw new Error('LEI');
```

CommonJS: `const api = require('@lp-labs/lei-checksum')`.

## Behavior, customization and limits

leiCheckDigits(body18) requires18 uppercase ASCII alphanumeric chars, positions5/6 exactly00; returns2decimal check digits using expanded lettersA10..Z35 and mod97 of body+00. validateLei requires20 chars, final2digits and same reserved positions; false checksum mismatch only, malformed throws. No LOU prefix registration, entity identity, status or regulatory assurance. O(40digits), streaming remainder avoids precision loss.

Use the explicit function arguments and public types below to customize the documented behavior. There are no hidden environment settings or sibling-library requirements. Array inputs must be dense; sparse entries are invalid. Inputs are validated before a successful result is returned. Outputs do not mutate caller-owned inputs. Hostile proxies/getters and concurrent mutation are outside the contract.

## Errors and integration

Invalid data never produces an empty success-shaped substitute. TypeError reports incompatible runtime types/nonfinite numbers; RangeError reports unsupported ranges, invalid syntax, inconsistent states and exceeded budgets. Functions that explicitly return null, false or empty arrays describe those legitimate outcomes above. Errors propagate to callers; UI applications should catch at their boundary and visibly notify users. Numerical calculations use JavaScript IEEE754 unless the API explicitly uses bigint; compare approximate numerical results with application-appropriate tolerances.

## Complete public API

```ts
export declare function leiCheckDigits(text: string): string;
export declare function validateLei(text: string): boolean;
```

## Performance and portability

Complexity and resource ceilings are specified above. Buffered synchronous algorithms do not create workers or timers; callers can move expensive work to their own worker. Limits are enforced, not silently truncated. No runtime imports from any other library. No compatibility or completeness claims beyond the stated scope.

## Support

If this library is useful to you, consider supporting its maintenance with a [donation via PayPal](https://www.paypal.me/LibinPrasanth).

## Author

Created by [Libin Prasanth](https://www.linkedin.com/in/libinprasanth/). Connect on LinkedIn for updates and discussion.
