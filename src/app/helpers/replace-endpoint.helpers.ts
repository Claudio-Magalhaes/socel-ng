import * as objEndpoints from '../_core/endpoints';

/**
 * Função destinada a facilitar a adição de informações nos endpoints.
 * Essa função consegue reconhecer os endpoints já cadastrados para diminuir
 * a necessidade de escrita.
 * @param endpoint
 * @param data
 */
export function replaceEndpointParams(
  endpoint: string,
  data: string | number | boolean | {[key: string]: number | string | boolean} | (string | number | boolean)[]
): string {

  if (endpoint in objEndpoints) {
    // @ts-ignore
    endpoint = objEndpoints[endpoint];
  }

  if (typeof data == 'string' || typeof data == 'number') {
    return endpoint.replace(/\$(.*?)\$/g, String(data));
  }

  if (Array.isArray(data)) {
    let currentIndex = 0;
    return endpoint.replace(/\$(.*?)\$/g, (_, match) => {
      const replacement = String(data[currentIndex++]);
      return replacement !== undefined ? replacement : match;
    });
  }

  if (typeof data == "object") {
    return Object.keys(data).reduce((result, key) => {
      // @ts-ignore
      return result.replace(new RegExp(`\\$${key}\\$`, 'g'), String(data[key]));
    }, endpoint);
  }

  return endpoint;
}
