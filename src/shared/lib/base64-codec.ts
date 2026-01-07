/**
 * Base64 编码
 */
export function encodeBase64(str: string): string {
  const bytes = new TextEncoder().encode(str)
  const binary = Array.from(bytes, byte => String.fromCharCode(byte)).join('')
  return btoa(binary)
}

/**
 * Base64 解码
 */
export function decodeBase64(base64Str: string): string {
  const binary = atob(base64Str)
  // 使用 Array.from 和映射函数
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}