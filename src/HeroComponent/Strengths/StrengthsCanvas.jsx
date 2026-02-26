import { Canvas } from '@react-three/fiber';
import { Shape01R3F, Shape02R3F, Shape03R3F, Shape04R3F, Shape05R3F } from '../../component/Shapes/R3F/index.js';

export default function StrengthsCanvas({
    isTransitioning = false,
    prevIndex = null,
    activeIndex,
    transitionProgress = 1,
    forceIndex = null // Used for mobile to force a specific shape
}) {
    const displayIndex = forceIndex !== null ? forceIndex : activeIndex;

    return (
        <Canvas
            camera={{ position: [0, 0, forceIndex !== null ? 5 : 8], fov: 50 }}
            style={{ width: '100%', height: '100%' }}
        >
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />

            {/* Transition Group (only for desktop) */}
            {forceIndex === null && (
                <group visible={isTransitioning}>
                    <Shape01R3F isActive={prevIndex === 0} opacity={1 - transitionProgress} />
                    <Shape02R3F isActive={prevIndex === 1} opacity={1 - transitionProgress} />
                    <Shape03R3F isActive={prevIndex === 2} opacity={1 - transitionProgress} />
                    <Shape04R3F isActive={prevIndex === 3} opacity={1 - transitionProgress} />
                    <Shape05R3F isActive={prevIndex === 4} opacity={1 - transitionProgress} />
                </group>
            )}

            {/* Active/Static Group */}
            <group visible={true} scale={forceIndex !== null ? [1.37, 1.37, 1.37] : [1, 1, 1]}>
                <Shape01R3F isActive={displayIndex === 0} opacity={isTransitioning ? transitionProgress : 1} />
                <Shape02R3F isActive={displayIndex === 1} opacity={isTransitioning ? transitionProgress : 1} />
                <Shape03R3F isActive={displayIndex === 2} opacity={isTransitioning ? transitionProgress : 1} />
                <Shape04R3F isActive={displayIndex === 3} opacity={isTransitioning ? transitionProgress : 1} />
                <Shape05R3F isActive={displayIndex === 4} opacity={isTransitioning ? transitionProgress : 1} />
            </group>
        </Canvas>
    );
}
