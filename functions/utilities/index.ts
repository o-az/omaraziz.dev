export const jsonResponse = <V>(value: V, init: ResponseInit = {}) =>
  new Response(JSON.stringify(value), { headers: { 'Content-Type': 'application/json', ...init.headers }, ...init })

export function devLogger(...args: unknown[]) {
  if (process.env.NODE_ENV !== 'development') return
  console.log(JSON.stringify({ devLogger: [...args] }, null, 2))
}
