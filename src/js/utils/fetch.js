// ==========================================================================
// Fetch wrapper
// Using XHR to avoid issues with older browsers
// ==========================================================================

export default function fetch(url, responseType = 'text', withCredentials = false) {
  return new Promise((resolve, reject) => {
    try {
      const request = new XMLHttpRequest();

      // Check for CORS support
      if (!('withCredentials' in request)) {
        return;
      }

      // Set to true if needed for CORS
      if (withCredentials) {
        request.withCredentials = true;
      }

      request.addEventListener('load', () => {
        if (responseType === 'text') {
          try {
            resolve(JSON.parse(request.responseText));
          } catch (_) {
            resolve(request.responseText);
          }
        } else {
          resolve(request.response);
        }
      });

      request.addEventListener('error', () => {
        throw new Error(request.status);
      });

      request.open('GET', url, true);

      // Set the required response type
      request.responseType = responseType;

      request.send();
    } catch (error) {
      reject(error);
    }
  });
}
