/**
 * Just for typing, this could be enahnced in many ways, passing headers etc...
 * some error handling and passing it back
 */

export async function emberHTTP<T>(
  input: string | URL | Request,
  init?: RequestInit | undefined
) {
  const data = await fetch(input, init);
  return (await data.json()) as T;
}
