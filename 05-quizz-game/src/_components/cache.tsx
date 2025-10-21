

type CacheCallable<T> = (id:string)=>Promise<T[]>;

export function cache<T>(callback:CacheCallable<T>):CacheCallable<T> {
  return  async (id:string) => {
    try {
      const cached = sessionStorage.getItem(id);
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (e){console.error(e)}
    const results =  await callback(id);
    try {
      sessionStorage.setItem(id, JSON.stringify(results));
    } catch (e){console.error(e)}
    return results;
  }
}
