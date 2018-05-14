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

  // Create observables for each argument, halting execution
  // for single requests and resuming for concurrent requests
  const join = uris.map(endpoint => {
    const req = fetch(`${API_ROOT}${endpoint}`);
    if (uris.length < 2) return req;
    return req.catch(err => Observable.of({}));
  });

  return Observable.forkJoin(join);
}
