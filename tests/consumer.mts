import { validateLei } from '@lp-labs/lei-checksum';
if (!validateLei('529900T8BM49AURSDO55')) throw new Error('LEI');
// @ts-expect-error invalid argument must be rejected by declarations
validateLei(123);
