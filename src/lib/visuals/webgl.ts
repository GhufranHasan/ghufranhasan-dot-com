export const optionalWebGLAttributes: WebGLContextAttributes = {
  alpha: true,
  antialias: true,
  depth: true,
  stencil: false,
  premultipliedAlpha: true,
  preserveDrawingBuffer: false,
  powerPreference: 'low-power',
  failIfMajorPerformanceCaveat: false,
}

let unavailable = false

export function createOptionalWebGLContext(canvas: HTMLCanvasElement): WebGL2RenderingContext | null {
  if (unavailable) return null
  const handleCreationError = (event: Event) => event.preventDefault()
  canvas.addEventListener('webglcontextcreationerror', handleCreationError)
  try {
    const context = canvas.getContext('webgl2', optionalWebGLAttributes)
    if (context && !context.isContextLost()) return context
  } catch {
    // Sandboxed browsers can expose the API while denying an actual GPU context.
  } finally {
    canvas.removeEventListener('webglcontextcreationerror', handleCreationError)
  }
  unavailable = true
  return null
}

export function releaseOptionalWebGLContext(context: WebGL2RenderingContext) {
  if (!context.isContextLost()) context.getExtension('WEBGL_lose_context')?.loseContext()
}
