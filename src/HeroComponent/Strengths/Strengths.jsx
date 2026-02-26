import SectionHeader from '../../component/SectionHeader/SectionHeader.jsx';
import { STATS_DATA, DETAILED_STRENGTHS } from './strengthsData.js';
import StrengthsCanvas from './StrengthsCanvas.jsx';
import FeatureDetailItem from '../../component/FeatureDetailItem/FeatureDetailItem.jsx';
import StatCounter from './StatCounter.jsx';
import { useStrengthsScroll } from './useStrengthsScroll.js';
export default function Strengths() {
    const { refs, state } = useStrengthsScroll(DETAILED_STRENGTHS.length);
    const { stageRef, containerRef, detailsViewportRef, detailsInnerRef } = refs;
    const { activeIndex, prevIndex, transitionProgress, isTransitioning } = state;

    return (
        <section className="bg-white w-full relative pt-[0.1px]">
            <div className="px-18 py-14 bg-transparent mt-[20vh] box-border md:px-8 ">
                <SectionHeader
                    label="Strengths"
                    title="Our Strengths"
                    theme="light"
                    size="small"
                />
            </div>

            <div className="px-6 min-[1120px]:px-18">
                <div className="grid grid-cols-1 min-[1120px]:grid-cols-3 border border-[#d9d9d9]
                 bg-white my-7 mx-auto w-full" role="list">
                    {STATS_DATA.map((item, index) => (
                        <StatCounter key={index} value={item.value} label={item.label} />
                    ))}
                </div>

                {/* --- MOBILE LAYOUT (Interleaved) --- */}
                <div className="min-[1120px]:hidden flex flex-col gap-20 py-10">
                    {DETAILED_STRENGTHS.map((item, index) => (
                        <FeatureDetailItem
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            description={item.description}
                            viewType="mobile"
                            AnimationComponent={<StrengthsCanvas forceIndex={index} />}
                        />
                    ))}
                </div>

                <div ref={stageRef} className="hidden min-[1120px]:block relative w-full">
                    <div ref={containerRef}
                        className="flex min-[1120px]:flex-row flex-col relative h-[101vh] pb-16
                         bg-white w-full box-border will-change-transform"
                    >
                        <aside className="flex-1 flex items-center justify-center relative" aria-hidden="true">
                            <div className="relative w-full h-full flex items-center justify-center min-[1120px]:-translate-x-[50px] min-[1120px]:-translate-y-[30px] ">
                                <StrengthsCanvas
                                    isTransitioning={isTransitioning}
                                    prevIndex={prevIndex}
                                    activeIndex={activeIndex}
                                    transitionProgress={transitionProgress}
                                />
                            </div>
                        </aside>

                        <div ref={detailsViewportRef} className="flex-1 bg-white overflow-hidden relative h-screen">
                            <div ref={detailsInnerRef} className="pt-[50vh] will-change-transform">
                                {DETAILED_STRENGTHS.map((item, index) => (
                                    <FeatureDetailItem
                                        key={item.id}
                                        id={item.id}
                                        title={item.title}
                                        description={item.description}
                                        viewType="desktop"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}
