import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { useScroll } from '@react-three/drei'
import { useControls } from 'leva'
import * as THREE from 'three'

export default function CameraController() {
    const scroll = useScroll()

    // Leva controls for tuning the spiral and look-at
    const {
        radiusOffset,
        radiusMultiplier,
        heightMultiplier,
        angleMultiplier,
        lerpSpeed,
        lookAtX,
        lookAtY,
        lookAtZ,
        rotationX,
        rotationY,
        rotationZ
    } = useControls('Spiral Camera', {
        radiusOffset: { value: 0, min: -10, max: 10, step: 0.1 },
        radiusMultiplier: { value: 15, min: 0, max: 20, step: 0.5 },
        heightMultiplier: { value: 20, min: 0, max: 50, step: 0.5 },
        angleMultiplier: { value: 0.38197218605 * Math.PI, min: 0, max: Math.PI * 4, step: 0.1 },
        lerpSpeed: { value: 0.05, min: 0.001, max: 0.2, step: 0.001 },
        lookAtX: { value: 0, min: -20, max: 20, step: 0.1 },
        lookAtY: { value: -2.5, min: -20, max: 20, step: 0.1 },
        lookAtZ: { value: 0, min: -20, max: 20, step: 0.1 },
        rotationX: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
        rotationY: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
        rotationZ: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 }
    })

    const basePosition = useRef(new THREE.Vector3(-6.8, -2.5, 0))
    const lookAtPoint = new THREE.Vector3(lookAtX, lookAtY, lookAtZ)

    // Initial polar coordinates derived from basePosition
    const initialRadius = 6.8
    const initialAngle = Math.PI // Starting angle (since x=-6.8, z=0)

    useFrame((state) => {
        const { mouse, camera } = state

        // 1. Calculate Spiral Position
        // Clamp the camera's internal offset so it finishes its move at 70% of the total scroll
        const rawOffset = scroll.offset / 0.7
        const offset = Math.min(rawOffset, 1)
        const overscroll = Math.max(0, rawOffset - 1) // How much beyond 100%

        // --- Spiral (Clockwise) ---
        // Continue angle rotation during overscroll for smooth continuation
        const angle = initialAngle - offset * angleMultiplier - overscroll * 1.0

        // Dynamic reduction: decreases by 10 units as we scroll
        const currentRadiusOffset = radiusOffset - (offset * 10)
        const radius = initialRadius + currentRadiusOffset + (offset * radiusMultiplier)

        // console.log("radiusMultiplier:", radiusMultiplier, "currentRadiusOffset:", currentRadiusOffset.toFixed(2))

        // Base spiral position
        let spiralX = Math.cos(angle) * radius
        let spiralZ = Math.sin(angle) * radius
        let spiralY = basePosition.current.y + offset * heightMultiplier

        // --- Overscroll: continue moving top-right ---
        if (overscroll > 0) {
            spiralX += overscroll * 10  // Move right
            spiralY += overscroll * 6  // Move up
            spiralZ += overscroll * 2  // Slight depth change
        }

        const spiralPosition = new THREE.Vector3(spiralX, spiralY, spiralZ)

        // --- Mouse horizontal parallax ---
        const rightAxis = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion)
        rightAxis.y = 0
        rightAxis.normalize()

        const targetPosition = spiralPosition.clone().add(rightAxis.multiplyScalar(mouse.x * 0.2))

        // Smoothly interpolate to the target position
        camera.position.lerp(targetPosition, lerpSpeed)

        // --- Rotation Logic (Look At + Mouse Wiggle) ---
        // First look at the target point
        lookAtPoint.set(lookAtX, lookAtY, lookAtZ)
        camera.lookAt(lookAtPoint)

        // Then apply manual rotation offsets
        // camera.rotation.x += rotationX
        // camera.rotation.y += rotationY
        // camera.rotation.z += rotationZ

        // Finally apply subtle mouse wiggle
        // camera.rotation.x += mouse.y * 0.025
        // camera.rotation.y += -mouse.x * 0.025
    })
    return null
}
