import { helper } from '@ember/component/helper';

export function getValue(params/*, hash*/) {
  if (params && params.length === 2) {
    var val = params[0];
    var key = params[1];
    return val[key];
  } else {
    return 'undefined';
  }
}

export default helper(getValue);
