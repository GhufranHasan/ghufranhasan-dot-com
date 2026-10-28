'use client'

import { useEffect, useRef } from 'react'
import { createOptionalWebGLContext, releaseOptionalWebGLContext } from '@/lib/visuals/webgl'
import type {
  BufferGeometry,
  Group,
  Material,
  Mesh,
  Points,
  Scene,
  WebGLRenderer,
} from 'three'

type DisposableObject = Mesh | Points

export default function HeroJourneyScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const sceneRoot = sceneRootRef.current

    if (!canvas || !sceneRoot) return

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const desktopPreference = window.matchMedia('(min-width: 768px) and (pointer: fine)')
    const device = navigator as Navigator & {
      deviceMemory?: number
      connection?: EventTarget & { saveData?: boolean; effectiveType?: string }
    }
    const canLoadScene = () => !motionPreference.matches
      && desktopPreference.matches
      && !device.connection?.saveData
      && !['slow-2g', '2g', '3g'].includes(device.connection?.effectiveType ?? '')
      && (device.hardwareConcurrency === undefined || device.hardwareConcurrency > 4)
      && (device.deviceMemory === undefined || device.deviceMemory > 4)
      && 'WebGL2RenderingContext' in window

    // Keep the CSS background; do not even download Three.js on constrained devices.
    if (!canLoadScene()) {
      sceneRoot.dataset.webgl = 'skipped'
      return
    }

    let cancelled = false
    let idleId: number | null = null
    let timeoutId: number | null = null
    let disposeScene = () => {}

    const initializeScene = async () => {
      if (cancelled || !canLoadScene()) return

      // Probe first: Three.js logs an error before throwing if it creates a missing context.
      const context = createOptionalWebGLContext(canvas)
      if (!context) {
        sceneRoot.dataset.webgl = 'unavailable'
        return
      }
      disposeScene = () => releaseOptionalWebGLContext(context)
      const THREE = await import('three').catch(() => null)
      if (!THREE || cancelled || !canLoadScene() || context.isContextLost()) {
        disposeScene()
        sceneRoot.dataset.webgl = cancelled ? 'skipped' : 'unavailable'
        return
      }

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const isCompact = window.matchMedia('(max-width: 767px)').matches

      let renderer: WebGLRenderer

      try {
        renderer = new THREE.WebGLRenderer({
          canvas,
          context,
          alpha: true,
          antialias: !isCompact,
          powerPreference: 'low-power',
        })
      } catch {
        disposeScene()
        sceneRoot.dataset.webgl = 'unavailable'
        return
      }

      renderer.setClearColor(0x000000, 0)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isCompact ? 1.15 : 1.5))
      renderer.outputColorSpace = THREE.SRGBColorSpace

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
      camera.position.set(0, 0, 8.5)

      const journey = new THREE.Group()
      scene.add(journey)

      const pathPoints = [
        new THREE.Vector3(-2.4, 1.05, 0.15),
        new THREE.Vector3(-0.55, 0.2, 0.75),
        new THREE.Vector3(1.2, 0.45, 0.1),
        new THREE.Vector3(2.55, -0.95, 0.45),
      ]
      const path = new THREE.CatmullRomCurve3(pathPoints, false, 'catmullrom', 0.42)

      const pathGlow = new THREE.Mesh(
        new THREE.TubeGeometry(path, 80, 0.055, 8, false),
        new THREE.MeshBasicMaterial({
          color: 0xff8403,
          transparent: true,
          opacity: 0.08,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      )
      const pathCore = new THREE.Mesh(
        new THREE.TubeGeometry(path, 80, 0.014, 6, false),
        new THREE.MeshBasicMaterial({
          color: 0xffa33f,
          transparent: true,
          opacity: 0.72,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      )
      journey.add(pathGlow, pathCore)

      const nodeGroup = new THREE.Group()
      const nodeProgress = [0, 0.52, 1]
      const nodeColors = [0xff8403, 0xd54bba, 0xfefefe]
      const nodeRings: Mesh[] = []

      nodeProgress.forEach((progress, index) => {
        const point = path.getPointAt(progress)
        const node = new THREE.Mesh(
          new THREE.IcosahedronGeometry(index === 1 ? 0.37 : 0.3, 1),
          new THREE.MeshStandardMaterial({
            color: nodeColors[index],
            emissive: nodeColors[index],
            emissiveIntensity: index === 2 ? 0.18 : 0.32,
            metalness: 0.58,
            roughness: 0.3,
            transparent: true,
            opacity: index === 2 ? 0.72 : 0.84,
          }),
        )
        node.position.copy(point)
        node.rotation.set(index * 0.35, index * 0.52, 0)

        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(index === 1 ? 0.7 : 0.58, 0.018, 8, 48),
          new THREE.MeshBasicMaterial({
            color: nodeColors[index],
            transparent: true,
            opacity: 0.32,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          }),
        )
        ring.position.copy(point)
        ring.rotation.set(Math.PI / 2.7, index * 0.55, index * 0.2)
        ring.userData.speed = 0.12 + index * 0.045

        nodeGroup.add(node, ring)
        nodeRings.push(ring)
      })
      journey.add(nodeGroup)

      const signal = new THREE.Mesh(
        new THREE.SphereGeometry(0.095, 16, 16),
        new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.9,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      )
      journey.add(signal)

      const particleCount = isCompact || (navigator.hardwareConcurrency ?? 8) <= 4 ? 52 : 120
      const particlePositions = new Float32Array(particleCount * 3)

      for (let index = 0; index < particleCount; index += 1) {
        const offset = index * 3
        const angle = index * 2.399963
        const radius = 1.2 + ((index * 17) % 19) * 0.17
        particlePositions[offset] = Math.cos(angle) * radius
        particlePositions[offset + 1] = Math.sin(angle * 0.7) * 1.9
        particlePositions[offset + 2] = -1.8 + ((index * 13) % 29) * 0.12
      }

      const particleGeometry = new THREE.BufferGeometry()
      particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
      const particles = new THREE.Points(
        particleGeometry,
        new THREE.PointsMaterial({
          color: 0xffb15a,
          size: isCompact ? 0.024 : 0.032,
          transparent: true,
          opacity: 0.34,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          sizeAttenuation: true,
        }),
      )
      journey.add(particles)

      const grid = new THREE.GridHelper(9, 14, 0xff8403, 0x71365f)
      grid.position.set(0, -2.2, -0.8)
      grid.rotation.x = Math.PI * 0.06
      const gridMaterials = Array.isArray(grid.material) ? grid.material : [grid.material]
      gridMaterials.forEach((material) => {
        material.transparent = true
        material.opacity = 0.08
        material.depthWrite = false
      })
      journey.add(grid)

      scene.add(new THREE.AmbientLight(0xffffff, 0.7))
      const orangeLight = new THREE.PointLight(0xff8403, 12, 13)
      orangeLight.position.set(-2, 2.6, 4)
      scene.add(orangeLight)
      const magentaLight = new THREE.PointLight(0xb3309f, 8, 12)
      magentaLight.position.set(2.8, -1.2, 3)
      scene.add(magentaLight)

      const timer = new THREE.Timer()
      timer.connect(document)
      const pointerTarget = { x: 0, y: 0 }
      let isIntersecting = true
      let isDocumentVisible = document.visibilityState === 'visible'
      let animationFrame = 0
      let lastFrameTime = 0
      let disposed = false

      const applyResponsiveLayout = () => {
        const compact = sceneRoot.clientWidth < 700
        journey.position.set(compact ? 0.15 : 2.65, compact ? -1.85 : -0.1, compact ? -0.8 : 0)
        journey.scale.setScalar(compact ? 0.72 : 0.95)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, compact ? 1.15 : 1.5))
      }

      const renderScene = () => {
        if (disposed || context.isContextLost()) return
        const width = Math.max(sceneRoot.clientWidth, 1)
        const height = Math.max(sceneRoot.clientHeight, 1)
        renderer.setSize(width, height, false)
        camera.aspect = width / height
        camera.updateProjectionMatrix()
        applyResponsiveLayout()
        renderer.render(scene, camera)
      }

      const animate = (now: number) => {
        if (disposed || context.isContextLost() || !isIntersecting || !isDocumentVisible) {
          animationFrame = 0
          return
        }

        // Decorative motion does not need a full-rate GPU render loop.
        const frameInterval = 1000 / 30
        if (now - lastFrameTime < frameInterval) {
          animationFrame = window.requestAnimationFrame(animate)
          return
        }
        lastFrameTime = now - ((now - lastFrameTime) % frameInterval)

        timer.update()
        const elapsed = timer.getElapsed()
        const signalProgress = ((elapsed * 0.09) % 1 + 1) % 1
        signal.position.copy(path.getPointAt(signalProgress))
        const signalScale = 0.82 + Math.sin(elapsed * 4) * 0.18
        signal.scale.setScalar(signalScale)

        journey.rotation.y += (pointerTarget.x * 0.12 - journey.rotation.y) * 0.025
        journey.rotation.x += (pointerTarget.y * 0.06 - journey.rotation.x) * 0.025
        particles.rotation.z = elapsed * 0.012
        particles.rotation.y = Math.sin(elapsed * 0.1) * 0.08
        nodeGroup.children.forEach((child, index) => {
          if (index % 2 === 0) {
            child.rotation.y += 0.003 + index * 0.0002
            child.rotation.x += 0.0015
          }
        })
        nodeRings.forEach((ring) => {
          ring.rotation.z = elapsed * Number(ring.userData.speed)
        })

        renderer.render(scene, camera)
        animationFrame = window.requestAnimationFrame(animate)
      }

      const startAnimation = () => {
        if (disposed || context.isContextLost()) return
        if (prefersReducedMotion) {
          renderScene()
          return
        }
        if (!animationFrame && isIntersecting && isDocumentVisible) {
          timer.reset()
          animationFrame = window.requestAnimationFrame(animate)
        }
      }

      const handlePointerMove = (event: PointerEvent) => {
        pointerTarget.x = (event.clientX / window.innerWidth - 0.5) * 2
        pointerTarget.y = (event.clientY / window.innerHeight - 0.5) * 2
      }

      const handleVisibilityChange = () => {
        isDocumentVisible = document.visibilityState === 'visible'
        startAnimation()
      }
      const handleContextLost = (event: Event) => {
        event.preventDefault()
        sceneRoot.dataset.webgl = 'unavailable'
        disposeScene()
      }

      const resizeObserver = new ResizeObserver(renderScene)
      resizeObserver.observe(sceneRoot)

      const intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          isIntersecting = entry.isIntersecting
          startAnimation()
        },
        { rootMargin: '120px' },
      )
      intersectionObserver.observe(sceneRoot)

      if (!prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
        window.addEventListener('pointermove', handlePointerMove, { passive: true })
      }
      document.addEventListener('visibilitychange', handleVisibilityChange)

      disposeScene = () => {
        if (disposed) return
        disposed = true
        window.cancelAnimationFrame(animationFrame)
        resizeObserver.disconnect()
        intersectionObserver.disconnect()
        window.removeEventListener('pointermove', handlePointerMove)
        document.removeEventListener('visibilitychange', handleVisibilityChange)
        canvas.removeEventListener('webglcontextlost', handleContextLost)
        timer.dispose()

        scene.traverse((object) => {
          const disposable = object as DisposableObject
          const geometry = disposable.geometry as BufferGeometry | undefined
          const material = disposable.material as Material | Material[] | undefined
          geometry?.dispose()
          if (Array.isArray(material)) {
            material.forEach((item) => item.dispose())
          } else {
            material?.dispose()
          }
        })
        renderer.dispose()
        releaseOptionalWebGLContext(context)
        clearScene(scene, journey)
      }
      canvas.addEventListener('webglcontextlost', handleContextLost)
      renderScene()
      sceneRoot.dataset.webgl = 'ready'
      startAnimation()
    }

    const idleWindow = window as unknown as {
      requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number
      cancelIdleCallback?: (handle: number) => void
    }

    const scheduleScene = () => {
      if (cancelled || !canLoadScene()) return
      if (idleWindow.requestIdleCallback) {
        idleId = idleWindow.requestIdleCallback(() => void initializeScene().catch(handleSceneFailure), { timeout: 3000 })
      } else {
        timeoutId = window.setTimeout(() => void initializeScene().catch(handleSceneFailure), 1500)
      }
    }
    const handlePreferenceChange = () => {
      if (!canLoadScene()) {
        cancelled = true
        disposeScene()
        disposeScene = () => {}
        sceneRoot.dataset.webgl = 'skipped'
      }
    }
    const handleSceneFailure = () => {
      disposeScene()
      sceneRoot.dataset.webgl = 'unavailable'
    }

    // Page-critical assets and the first paint take priority over decoration.
    if (document.readyState === 'complete') scheduleScene()
    else window.addEventListener('load', scheduleScene, { once: true })
    motionPreference.addEventListener('change', handlePreferenceChange)
    desktopPreference.addEventListener('change', handlePreferenceChange)
    device.connection?.addEventListener('change', handlePreferenceChange)

    return () => {
      cancelled = true
      window.removeEventListener('load', scheduleScene)
      motionPreference.removeEventListener('change', handlePreferenceChange)
      desktopPreference.removeEventListener('change', handlePreferenceChange)
      device.connection?.removeEventListener('change', handlePreferenceChange)
      if (idleId !== null) idleWindow.cancelIdleCallback?.(idleId)
      if (timeoutId !== null) window.clearTimeout(timeoutId)
      disposeScene()
    }
  }, [])

  return (
    <div
      ref={sceneRootRef}
      className="pointer-events-none absolute inset-0 z-[2] overflow-hidden opacity-0 transition-opacity duration-1000 [mask-image:linear-gradient(to_bottom,transparent_2%,black_18%,black_82%,transparent_100%)] data-[webgl=ready]:opacity-[0.42] motion-reduce:data-[webgl=ready]:opacity-[0.58] sm:data-[webgl=ready]:opacity-[0.55] lg:data-[webgl=ready]:opacity-[0.82] max-sm:[mask-image:linear-gradient(to_bottom,transparent_28%,black_52%,black_90%,transparent_100%)]"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block h-full w-full" data-hero-3d />
    </div>
  )
}

function clearScene(scene: Scene, journey: Group) {
  journey.clear()
  scene.clear()
}
