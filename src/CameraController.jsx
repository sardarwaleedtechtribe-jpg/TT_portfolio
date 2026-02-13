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
        rotationZ,
        initialZoomOut
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
        rotationZ: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
        initialZoomOut: { value: 0.8, min: 0, max: 5, step: 0.1 }
    })

    const basePosition = useRef(new THREE.Vector3(-6.8, -2.5, 0))
    const lookAtPoint = useRef(new THREE.Vector3())
    const targetPositionRef = useRef(new THREE.Vector3())
    const spiralPositionRef = useRef(new THREE.Vector3())
    const tempVec = useRef(new THREE.Vector3())
    const rightAxisRef = useRef(new THREE.Vector3())

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
    const initialRadius = 6.15
    const initialAngle = Math.PI // Starting angle (since x=-6.8, z=0)

    useFrame((state) => {
        const { mouse, camera } = state

        const ANIMATION_END = 2 / 14
        const zoomOut = 0.1
        const effectiveScroll = Math.min(scroll.offset / ANIMATION_END, 1)

        // console.log("Scroll Offset: ", scroll.offset)
        // 1. Calculate Initial Zoom Back Progress
        let zoomBackOffset = 0
        let motionProgress = 0

        if (effectiveScroll < zoomOut) {
            const t = effectiveScroll / zoomOut
            zoomBackOffset = t * initialZoomOut
            motionProgress = 0
        } else {
            zoomBackOffset = initialZoomOut
            motionProgress = (effectiveScroll - zoomOut) / (1 - zoomOut)
        }

        const rawOffset = motionProgress / 0.7
        const offset = Math.min(rawOffset, 1)
        const overscroll = Math.max(0, rawOffset - 1)

        const transitionFactor = effectiveScroll >= TRANSITION_THRESHOLD
            ? Math.min((effectiveScroll - TRANSITION_THRESHOLD) / (1 - TRANSITION_THRESHOLD), 1)
            : 0

        const scrollBasedCamX = 0 - (effectiveScroll * 1.7); // 0 at start, -1.7 at end
        const currentCamX = THREE.MathUtils.lerp(scrollBasedCamX, TRANSITION_TARGETS.camX, transitionFactor)

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
        const tv = transitionedValues.current
        tv.camX = THREE.MathUtils.lerp(tv.camX, currentCamX, transitionLerpSpeed)
        tv.camY = THREE.MathUtils.lerp(tv.camY, currentCamY, transitionLerpSpeed)
        tv.camZ = THREE.MathUtils.lerp(tv.camZ, currentCamZ, transitionLerpSpeed)
        tv.lookAtX = THREE.MathUtils.lerp(tv.lookAtX, currentLookAtX, transitionLerpSpeed)
        tv.lookAtY = THREE.MathUtils.lerp(tv.lookAtY, currentLookAtY, transitionLerpSpeed)
        tv.lookAtZ = THREE.MathUtils.lerp(tv.lookAtZ, currentLookAtZ, transitionLerpSpeed)
        tv.rotationX = THREE.MathUtils.lerp(tv.rotationX, currentRotationX, transitionLerpSpeed)
        tv.rotationY = THREE.MathUtils.lerp(tv.rotationY, currentRotationY, transitionLerpSpeed)
        tv.rotationZ = THREE.MathUtils.lerp(tv.rotationZ, currentRotationZ, transitionLerpSpeed)

        // --- Spiral (Anticlockwise) ---
        const angle = initialAngle - offset * angleMultiplier - overscroll * 0.025

        const dynamicRadiusDrive = Math.min(Math.max((scroll.offset - 0.067) / (0.085 - 0.067), 0), 1) * -10
        const currentRadiusOffset = radiusOffset + dynamicRadiusDrive - (offset * 0.01)
        const radius = initialRadius + currentRadiusOffset + (offset * radiusMultiplier) + zoomBackOffset

        // Calculate active height multiplier with a boost after 0.15 scroll offset
        const heightBoost = Math.max(0, scroll.offset - 0.15) * 1000 // Increasing gradually
        const activeHeightMultiplier = heightMultiplier + heightBoost

        // console.log("Scroll:", scroll.offset.toFixed(4), "Height Mult:", activeHeightMultiplier.toFixed(2))

        // Base spiral position
        spiralPositionRef.current.set(
            Math.cos(angle) * radius,
            basePosition.current.y + offset * activeHeightMultiplier,
            Math.sin(angle) * radius
        )

        // --- Mouse horizontal parallax ---
        rightAxisRef.current.set(1, 0, 0).applyQuaternion(camera.quaternion)
        rightAxisRef.current.y = 0
        rightAxisRef.current.normalize()

        const scrollYOffset = -Math.max(0, scroll.offset - ANIMATION_END) * 100

        // Use transitioned cam offset values
        targetPositionRef.current
            .copy(spiralPositionRef.current)
            .add(tempVec.current.set(tv.camX, tv.camY, tv.camZ))
            .add(tempVec.current.set(0, scrollYOffset, 0))
            .add(rightAxisRef.current.multiplyScalar(mouse.x * 0.2))

        // Smoothly interpolate to the target position
        camera.position.lerp(targetPositionRef.current, lerpSpeed)

        // --- Rotation Logic ---
        lookAtPoint.current.set(tv.lookAtX, tv.lookAtY + scrollYOffset, tv.lookAtZ)
        camera.lookAt(lookAtPoint.current)

        // Apply manual rotation offsets from the UI
        camera.rotation.x += tv.rotationX
        camera.rotation.y += tv.rotationY
        camera.rotation.z += tv.rotationZ
    })
    return null
}
