export default function FeatureDetailItem({
    id,
    title,
    description,
    viewType = 'mobile',
    AnimationComponent = null
}) {
    if (viewType === 'mobile') {
        return (
            <div className="flex flex-col gap-6">
                {AnimationComponent && (
                    <div className="h-[340px] w-full flex items-center justify-center">
                        {AnimationComponent}
                    </div>
                )}
                <article className="px-2 flex items-start gap-4 mt-8">
                    <div className="text-[14px] font-bold text-black whitespace-nowrap mt-[4px]">
                        ( {id} )
                    </div>
                    <div className="flex-1">
                        <h3 className="text-[19px] font-medium leading-tight uppercase m-0 mb-6">{title}</h3>
                        <p className="text-[13px] leading-[1.6] tracking-tight text-[#555] font-medium ml-[-40px] w-[calc(100%+40px)] mt-6">{description}</p>
                    </div>
                </article>
            </div>
        );
    }

    return (
        <article className="feature-detail-item flex items-start gap-8 min-[1120px]:gap-14 border-b border-[#eee] pb-[55vh] last:border-b-0">
            <div className="text-[18px] font-bold text-black whitespace-nowrap mt-[10px]" aria-hidden="true">
                ( {id} )
            </div>
            <div className="flex-1 mt-[8px]">
                <h3 className="text-[clamp(1.25rem,2vw,26px)] font-medium leading-[1.1] tracking-tight m-0 text-black uppercase">{title}</h3>
                <div className="h-[0.25px] bg-[#b0afaf] my-8 w-full"></div>
                <p className="text-[15px] leading-[1.6] tracking-tight font-normal text-[#444] max-w-[700px]">{description}</p>
            </div>
        </article>
    );
}
