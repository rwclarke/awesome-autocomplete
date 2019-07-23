import { helper } from '@ember/component/helper';

export function isEqual(params/*, hash*/) {
  if (params && params.length === 2) {
    return params[0] === params[1];
  } else {
    return false;
  }
}

export default helper(isEqual);
