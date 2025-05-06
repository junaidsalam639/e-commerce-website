import React from "react";

const ProductItemSkeleton = () => {
    return (
        <div className="animate-pulse">
            <div className="relative overflow-hidden flex items-center justify-center rounded-lg bg-[#E5E7EB] min-h-[270px] mb-4" />

            <div className="h-4 bg-[#E5E7EB] rounded w-3/4 mb-2" />
            <div className="h-4 bg-[#E5E7EB] rounded w-1/4" />
        </div>
    );
};

export default ProductItemSkeleton;
