export function cloneJSON<T>(source: T): T | void {
  if(!source) return
  // structuredClone API（Node 17+，现代浏览器）
  // if (typeof window.structuredClone === 'function') {
  //   return window.structuredClone?.(source);
  // }
  
  // 回退到 JSON 方法
  return JSON.parse(JSON.stringify(source));
}