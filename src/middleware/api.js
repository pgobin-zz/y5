import { Observable } from 'rxjs/Observable';
import fetch from 'observable-fetch';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

const API_ROOT = 'https://appsheettest1.azurewebsites.net/sample/';

/**
 * Call graph endpoint(s).
 *
 * @param reqs One or more observables to execute. Can be passed in
 * as a string or an array. Requests will execute concurrently.
 *
 * @return Observable
 */
export function call(...reqs) {
  const uris = []
    .concat
    // Flatten arguments
    .apply([], reqs)
    // Create observables for each argument
    .map(endpoint => fetch(`${API_ROOT}${endpoint}`)
      .catch(err => Observable.of({})) // Resume execution on error
    );
  return Observable.forkJoin(uris);
}
