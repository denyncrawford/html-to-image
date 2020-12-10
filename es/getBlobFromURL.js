/* tslint:disable:max-line-length */
import { getDataURLContent } from './util';
// KNOWN ISSUE
// -----------
// Can not handle redirect-url, such as when access 'http://something.com/avatar.png'
// will redirect to 'http://something.com/65fc2ffcc8aea7ba65a1d1feda173540'
const TIMEOUT = 30000;
const cache = [];
export function getBlobFromURL(url, options) {
    const root = url.split('?')[0];
    const found = cache.find((item) => item.url === root);
    if (found) {
        return found.promise;
    }
    // cache bypass so we dont have CORS issues with cached images
    // ref: https://developer.mozilla.org/en/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#Bypassing_the_cache
    if (options.cacheBust) {
        // tslint:disable-next-line
        url += (/\?/.test(url) ? '&' : '?') + new Date().getTime();
    }
    const failed = (reason) => {
        let placeholder = '';
        if (options.imagePlaceholder) {
            const parts = options.imagePlaceholder.split(/,/);
            if (parts && parts[1]) {
                placeholder = parts[1];
            }
        }
        let msg = `Failed to fetch resource: ${url}`;
        if (reason) {
            msg = typeof reason === 'string' ? reason : reason.message;
        }
        if (msg) {
            console.error(msg);
        }
        return placeholder;
    };
    const deferred = window.fetch
        ? window
            .fetch(url)
            .then((response) => response.blob())
            .then((blob) => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        }))
            .then(getDataURLContent)
            .catch(() => new Promise((resolve, reject) => reject()))
        : new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();
            const timeout = () => {
                reject(new Error(`Timeout of ${TIMEOUT}ms occured while fetching resource: ${url}`));
            };
            const done = () => {
                if (req.readyState !== 4) {
                    return;
                }
                if (req.status !== 200) {
                    reject(new Error(`Failed to fetch resource: ${url}, status: ${req.status}`));
                    return;
                }
                const encoder = new FileReader();
                encoder.onloadend = () => {
                    resolve(getDataURLContent(encoder.result));
                };
                encoder.readAsDataURL(req.response);
            };
            req.onreadystatechange = done;
            req.ontimeout = timeout;
            req.responseType = 'blob';
            req.timeout = TIMEOUT;
            req.open('GET', url, true);
            req.send();
        });
    const promise = deferred.catch(failed);
    cache.push({ promise, url: root });
    return promise;
}
//# sourceMappingURL=getBlobFromURL.js.map