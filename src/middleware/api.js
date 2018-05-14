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
  // Flatten arguments
  const uris = [].concat.apply([], reqs);

  // Create observables for each argument
  return Observable.forkJoin(
    uris.map(endpoint => {
      const req = fetch(`${API_ROOT}${endpoint}`);

      // Stop execution and show error for single request
      if (uris.length < 2) return req;

      // Resume execution on error for concurrect requests
      return fetch(`${API_ROOT}${endpoint}`)
        .catch(err => Observable.of({}));
    })
  );
}
