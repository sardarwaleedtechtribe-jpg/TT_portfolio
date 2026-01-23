import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { useScroll } from '@react-three/drei'
import { useControls } from 'leva'
import * as THREE from 'three'

// Target values for scroll offset >= 0.9 transition
const TRANSITION_TARGETS = {
    camX: 3.0,
    camY: 2.0,
    camZ: 5.0,
    lookAtX: 10.0,
    lookAtY: 20.0,
    lookAtZ: -20.0,
    rotationX: -1.05,
    rotationY: 0.0,
    rotationZ: 0.1
}

const TRANSITION_THRESHOLD = 0.9

export default function CameraController() {
    const scroll = useScroll()

    // Leva controls for tuning the spiral and look-at
    const {
        radiusOffset,
        radiusMultiplier,
        heightMultiplier,
        angleMultiplier,
        lerpSpeed,
        camX,
        camY,
        camZ,
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
        camX: { value: 0, min: -20, max: 20, step: 0.1 },
        camY: { value: 0, min: -20, max: 20, step: 0.1 },
        camZ: { value: 0, min: -20, max: 20, step: 0.1 },
        lookAtX: { value: 0, min: -20, max: 20, step: 0.1 },
        lookAtY: { value: -2.5, min: -20, max: 20, step: 0.1 },
        lookAtZ: { value: 0, min: -20, max: 20, step: 0.1 },
        rotationX: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
        rotationY: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
        rotationZ: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 }
    })

    const basePosition = useRef(new THREE.Vector3(-6.8, -2.5, 0))
    const lookAtPoint = new THREE.Vector3(lookAtX, lookAtY, lookAtZ)

    // Refs to store interpolated values for smooth transitions
    const transitionedValues = useRef({
        camX: camX,
        camY: camY,
        camZ: camZ,
        lookAtX: lookAtX,
        lookAtY: lookAtY,
        lookAtZ: lookAtZ,
        rotationX: rotationX,
        rotationY: rotationY,
        rotationZ: rotationZ
    })

    // Initial polar coordinates derived from basePosition
    const initialRadius = 6.8
    const initialAngle = Math.PI // Starting angle (since x=-6.8, z=0)

    useFrame((state) => {
        const { mouse, camera } = state

        // Get raw scroll offset
        const scrollOffset = scroll.offset

        // 1. Calculate Spiral Position
        // Clamp the camera's internal offset so it finishes its move at 70% of the total scroll
        const rawOffset = scrollOffset / 0.7
        const offset = Math.min(rawOffset, 1)
        const overscroll = Math.max(0, rawOffset - 1) // How much beyond 100%

        // --- Calculate transition factor for smooth interpolation ---
        // When scroll >= 0.9, transition factor goes from 0 to 1 over the remaining 0.1
        const transitionFactor = scrollOffset >= TRANSITION_THRESHOLD 
            ? Math.min((scrollOffset - TRANSITION_THRESHOLD) / (1 - TRANSITION_THRESHOLD), 1)
            : 0

        // Calculate current target values (lerp between Leva values and transition targets)
        const currentCamX = THREE.MathUtils.lerp(camX, TRANSITION_TARGETS.camX, transitionFactor)
        const currentCamY = THREE.MathUtils.lerp(camY, TRANSITION_TARGETS.camY, transitionFactor)
        const currentCamZ = THREE.MathUtils.lerp(camZ, TRANSITION_TARGETS.camZ, transitionFactor)
        const currentLookAtX = THREE.MathUtils.lerp(lookAtX, TRANSITION_TARGETS.lookAtX, transitionFactor)
        const currentLookAtY = THREE.MathUtils.lerp(lookAtY, TRANSITION_TARGETS.lookAtY, transitionFactor)
        const currentLookAtZ = THREE.MathUtils.lerp(lookAtZ, TRANSITION_TARGETS.lookAtZ, transitionFactor)
        const currentRotationX = THREE.MathUtils.lerp(rotationX, TRANSITION_TARGETS.rotationX, transitionFactor)
        const currentRotationY = THREE.MathUtils.lerp(rotationY, TRANSITION_TARGETS.rotationY, transitionFactor)
        const currentRotationZ = THREE.MathUtils.lerp(rotationZ, TRANSITION_TARGETS.rotationZ, transitionFactor)

        // Smoothly interpolate the transitioned values over time
        const transitionLerpSpeed = 0.05
        transitionedValues.current.camX = THREE.MathUtils.lerp(transitionedValues.current.camX, currentCamX, transitionLerpSpeed)
        transitionedValues.current.camY = THREE.MathUtils.lerp(transitionedValues.current.camY, currentCamY, transitionLerpSpeed)
        transitionedValues.current.camZ = THREE.MathUtils.lerp(transitionedValues.current.camZ, currentCamZ, transitionLerpSpeed)
        transitionedValues.current.lookAtX = THREE.MathUtils.lerp(transitionedValues.current.lookAtX, currentLookAtX, transitionLerpSpeed)
        transitionedValues.current.lookAtY = THREE.MathUtils.lerp(transitionedValues.current.lookAtY, currentLookAtY, transitionLerpSpeed)
        transitionedValues.current.lookAtZ = THREE.MathUtils.lerp(transitionedValues.current.lookAtZ, currentLookAtZ, transitionLerpSpeed)
        transitionedValues.current.rotationX = THREE.MathUtils.lerp(transitionedValues.current.rotationX, currentRotationX, transitionLerpSpeed)
        transitionedValues.current.rotationY = THREE.MathUtils.lerp(transitionedValues.current.rotationY, currentRotationY, transitionLerpSpeed)
        transitionedValues.current.rotationZ = THREE.MathUtils.lerp(transitionedValues.current.rotationZ, currentRotationZ, transitionLerpSpeed)

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
            spiralX += overscroll * 5  // Move right
            spiralY += overscroll * 6  // Move up
            spiralZ += overscroll * 2  // Slight depth change
        }

        const spiralPosition = new THREE.Vector3(spiralX, spiralY, spiralZ)

        // --- Mouse horizontal parallax ---
        const rightAxis = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion)
        rightAxis.y = 0
        rightAxis.normalize()

        // Use transitioned cam offset values
        const targetPosition = spiralPosition.clone()
            .add(new THREE.Vector3(
                transitionedValues.current.camX, 
                transitionedValues.current.camY, 
                transitionedValues.current.camZ
            ))
            .add(rightAxis.multiplyScalar(mouse.x * 0.2))

        // Smoothly interpolate to the target position
        camera.position.lerp(targetPosition, lerpSpeed)

        // --- Rotation Logic (Look At + Mouse Wiggle) ---
        // First look at the target point using transitioned lookAt values
        lookAtPoint.set(
            transitionedValues.current.lookAtX, 
            transitionedValues.current.lookAtY, 
            transitionedValues.current.lookAtZ
        )
        camera.lookAt(lookAtPoint)

        // Apply transitioned rotation offset
        if (transitionFactor > 0) {
            camera.rotation.x += transitionedValues.current.rotationX
            camera.rotation.y += transitionedValues.current.rotationY
            camera.rotation.z += transitionedValues.current.rotationZ
        }

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
