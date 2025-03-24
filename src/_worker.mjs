/// <reference types="@cloudflare/workers-types" />

/**
 * @typedef {Object} Env
 * @property {Fetcher} ASSETS
 * @property {"1"} CF_PAGES
 * @property {string} CF_PAGES_BRANCH
 * @property {string} CF_PAGES_COMMIT_SHA
 * @property {string} CF_PAGES_URL
 * @property {string} LOG_KEY 
 * @property {string} LOG_ORIGIN
 * @property {"true" | "false"} [TESTING_LOGS]
 */

/**
 * @type {ExportedHandler<Env, unknown, unknown>}
 */
export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        const response = await env.ASSETS.fetch(request);
        if (env.TESTING_LOGS === 'true') {
            pushLogs(request, response, url, env, ctx);
        }
        return response;
    }
}

/**
 * @param {Request<unknown>} request
 * @param {Response} response
 * @param {URL} url
 * @param {Env} env
 * @param {ExecutionContext} ctx
 */
function pushLogs(request, response, url, env, ctx) {
    try {
        pushLogsInner({
            url: request.url,
            urlPathname: url.pathname,
            urlSearchParams: Array.from(url.searchParams.entries()),
            method: request.method,
            headers: Array.from(request.headers.entries())
        }, {
            status: `${response.status} ${response.statusText}`.trim(),
            headers: Array.from(response.headers.entries())
        }, env, ctx);
    } catch (e) { }
}

/**
 * @typedef {Object} MyLogRequest
 * @property {string} url
 * @property {string} urlPathname
 * @property {[string, string][]} urlSearchParams
 * @property {string} method
 * @property {[string, string][]} headers
 */

/**
 * @typedef {Object} MyLogResponse
 * @property {string} status
 * @property {[string, string][]} headers
 */

/**
 * @param {MyLogRequest} request
 * @param {MyLogResponse} response
 * @param {Env} env
 * @param {ExecutionContext} ctx
 */
function pushLogsInner(request, response, env, ctx) {
    const time = Date.now();
    /** @type {[string, string | number][]} */
    const general = request.urlSearchParams;
    for (const key in env) {
        if (key.startsWith('CF_')) {
            const value = env[key];
            if (typeof value !== 'string' && typeof value !== 'number') {
                continue;
            }
            general.unshift([key, value]);
        }
    }
    general.unshift(['rqTime', time]);
    general.unshift(['fullUrl', request.url]);

    const body = {
        time, url: request.urlPathname, method: request.method, addInfo: {
            status: response.status, general,
            headers: request.headers,
            responseHeaders: response.headers,
        }
    };

    ctx.waitUntil(postLogs(body, env));
}

/**
 * @typedef {Object} MyLogAddInfo
 * @property {string} status
 * @property {[string, string | number][]} general
 * @property {[string, string][]} headers
 * @property {[string, string][]} responseHeaders
 */

/**
 * @typedef {Object} MyLogBody
 * @property {number} time
 * @property {string} url
 * @property {string} method
 * @property {MyLogAddInfo} addInfo
 */

/**
 * @param {MyLogBody} body
 * @param {Env} env
 */
async function postLogs(body, env) {
    try {
        await fetch(`${env.LOG_ORIGIN}/${env.LOG_KEY}/addlog`, { method: 'POST', body: JSON.stringify(body) });
    }
    catch (e) { }
}