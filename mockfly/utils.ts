import fs from 'node:fs'
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// ES 模块
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function responseFile(filePath: string) {
  return () => {
    const file = path.join(__dirname, filePath)
    return fs.readFileSync(file, 'utf-8')
  }
}