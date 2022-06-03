export function devLogger(...args: unknown[]) {
  if (process.env.NODE_ENV !== 'development') return
  console.log(JSON.stringify({ devLogger: [...args] }, null, 2))
}
