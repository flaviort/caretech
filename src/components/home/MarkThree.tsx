'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { MARK_SIZE, markCrossSvg, markSquaresSvg } from '@/components/brand/markSvg'

type MarkThreeProps = {
	/** index of the active challenge; its square pulses */
	active: number
	/** live scroll velocity (Lenis, px per frame), read every frame */
	velocity: React.MutableRefObject<number>
	className?: string
}

const BLUE = new THREE.Color('#0367d7')
const BLUE_2 = new THREE.Color('#3885df')
const LIT = new THREE.Color('#8fbdf4')

function extrude(svg: string, depth: number) {
	const data = new SVGLoader().parse(svg)
	return data.paths.map(path => {
		const geometry = new THREE.ExtrudeGeometry(SVGLoader.createShapes(path), {
			depth,
			bevelEnabled: true,
			bevelThickness: 7,
			bevelSize: 5,
			bevelSegments: 6,
			curveSegments: 32
		})
		// centre on the mark's middle and on its own depth
		geometry.translate(-MARK_SIZE / 2, -MARK_SIZE / 2, -depth / 2)
		return geometry
	})
}

// The CareTech mark, extruded from its own vector paths. Its only motion is a horizontal spin:
// scroll speed drives it with inertia, and when the page rests it settles face-on.
// The square for the active challenge pulses in a lighter blue.
export default function MarkThree({ active, velocity, className }: MarkThreeProps) {
	const host = useRef<HTMLDivElement>(null)
	const activeRef = useRef(active)

	useEffect(() => {
		activeRef.current = active
	}, [active])

	useEffect(() => {
		const el = host.current
		if (!el) return

		const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
		renderer.outputColorSpace = THREE.SRGBColorSpace
		renderer.toneMapping = THREE.ACESFilmicToneMapping
		renderer.toneMappingExposure = 0.92
		el.appendChild(renderer.domElement)

		const scene = new THREE.Scene()
		const pmrem = new THREE.PMREMGenerator(renderer)
		const envMap = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
		scene.environment = envMap
		scene.environmentIntensity = 0.5

		const camera = new THREE.PerspectiveCamera(28, 1, 10, 6000)
		camera.position.set(0, 0, 1500)

		const key = new THREE.DirectionalLight(0xffffff, 1.4)
		key.position.set(-500, 700, 900)
		const rim = new THREE.DirectionalLight(0xa9cbff, 1.6)
		rim.position.set(600, -400, -500)
		scene.add(key, rim)

		const spin = new THREE.Group()
		const flip = new THREE.Group()
		flip.scale.y = -1 // SVG y runs down
		scene.add(spin)
		spin.add(flip)

		const crossMaterial = new THREE.MeshPhysicalMaterial({
			color: BLUE,
			roughness: 0.26,
			metalness: 0.18,
			clearcoat: 1,
			clearcoatRoughness: 0.12
		})
		const squareMaterials: THREE.MeshPhysicalMaterial[] = []
		const squares: THREE.Mesh[] = []

		const crossGeometries = extrude(markCrossSvg, 46)
		crossGeometries.forEach(g => flip.add(new THREE.Mesh(g, crossMaterial)))

		const squareGeometries = extrude(markSquaresSvg, 30)
		squareGeometries.forEach(g => {
			const material = new THREE.MeshPhysicalMaterial({
				color: BLUE_2.clone(),
				roughness: 0.38,
				metalness: 0.05,
				clearcoat: 0.8,
				clearcoatRoughness: 0.2,
				emissive: new THREE.Color('#0a3f86'),
				emissiveIntensity: 0
			})
			const mesh = new THREE.Mesh(g, material)
			squareMaterials.push(material)
			squares.push(mesh)
			flip.add(mesh)
		})

		const resize = () => {
			const { width, height } = el.getBoundingClientRect()
			if (!width || !height) return
			renderer.setSize(width, height, false)
			renderer.domElement.style.width = '100%'
			renderer.domElement.style.height = '100%'
			camera.aspect = width / height
			camera.updateProjectionMatrix()
		}
		resize()
		const ro = new ResizeObserver(resize)
		ro.observe(el)

		let visible = false
		const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), { rootMargin: '100px' })
		io.observe(el)

		// spin state
		let angle = 0 // around Y
		let angularVelocity = 0
		let frame = 0
		let last = performance.now()
		const clock = { t: 0 }
		const target = new THREE.Color()

		const tick = (now: number) => {
			frame = requestAnimationFrame(tick)
			const dt = Math.min(0.05, (now - last) / 1000)
			last = now
			clock.t += dt
			if (!visible || document.hidden) return

			// scroll speed feeds the spin, friction bleeds it off
			const v = velocity.current || 0
			angularVelocity += v * 0.00055 // scroll-to-spin gain; raise for more turn per scroll
			angularVelocity *= Math.pow(0.92, dt * 60)
			angle += angularVelocity * dt * 60

			// at rest, settle to the nearest face-on angle (the mark reads the same front and back)
			if (Math.abs(angularVelocity) < 0.004) {
				const rest = Math.round(angle / Math.PI) * Math.PI
				angle += (rest - angle) * (1 - Math.pow(0.0025, dt))
			}
			spin.rotation.y = angle

			// the active challenge's square pulses; the last challenge pulses all four, softer
			const step = activeRef.current
			const pulse = (Math.sin(clock.t * 3.2) + 1) / 2
			squares.forEach((_, i) => {
				const on = step >= 4 ? 0.6 : i === step % 4 ? 1 : 0
				const material = squareMaterials[i]
				target.copy(BLUE_2)
				if (on) target.lerp(LIT, 0.35 + pulse * 0.65)
				material.color.lerp(target, 1 - Math.pow(0.002, dt))
				const glow = on * (0.15 + pulse * 0.45)
				material.emissiveIntensity += (glow - material.emissiveIntensity) * (1 - Math.pow(0.002, dt))
			})

			renderer.render(scene, camera)
		}
		frame = requestAnimationFrame(tick)

		return () => {
			cancelAnimationFrame(frame)
			ro.disconnect()
			io.disconnect()
			crossGeometries.forEach(g => g.dispose())
			squareGeometries.forEach(g => g.dispose())
			crossMaterial.dispose()
			squareMaterials.forEach(m => m.dispose())
			envMap.dispose()
			pmrem.dispose()
			renderer.dispose()
			renderer.domElement.remove()
		}
	}, [velocity])

	return <div ref={host} className={className} aria-hidden='true' />
}
