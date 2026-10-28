import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'

const resolveModule = createRequire(import.meta.url)
const projectRoot = fileURLToPath(new URL('../../', import.meta.url))

export function loadServerModule(file, { mocks = {}, env = {}, globals = {} } = {}) {
  const source = fs.readFileSync(path.join(projectRoot, file), 'utf8')
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
  })
  const serverModule = { exports: {} }
  vm.runInNewContext(outputText, {
    module: serverModule,
    exports: serverModule.exports,
    require: (id) => id === 'server-only' ? {} : (id in mocks ? mocks[id] : resolveModule(id)),
    process: { env, cwd: process.cwd.bind(process) },
    console: { warn() {}, error() {} },
    Buffer, TextDecoder, AbortSignal, URL, ...globals,
  }, { filename: file })
  return serverModule.exports
}
