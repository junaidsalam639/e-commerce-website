import React from "react";

function SkeletonItem() {
    return (
        <div className="animate-pulse flex flex-col items-center">
            <div className="max-w-[130px] w-full bg-[#E5E7EB] h-32.5 rounded-full flex items-center justify-center mb-4" />

            <div className="h-4 bg-[#E5E7EB] rounded w-24" />
        </div>
    );
}

export default SkeletonItem;
