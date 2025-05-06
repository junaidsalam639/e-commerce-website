"use client";
import React from "react";
import Image from "next/image";
import { addItemToCart } from "../../redux/features/cart-slice";
import { updateproductDetails } from "../../redux/features/product-details";
import { useDispatch } from "react-redux";
import Link from "next/link";

const ProductItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addItemToCart({
        ...item,
        quantity: 1,
      })
    );
  };

  const handleProductDetails = () => {
    dispatch(updateproductDetails({ ...item }));
  };

  return (
    <div className="group">
      <div className="relative overflow-hidden flex items-center justify-center rounded-lg bg-[#F6F7FB] min-h-[270px] mb-4">
        <Image src={item?.image} alt="" width={250} height={250} />

        <div className="absolute left-0 bottom-0 translate-y-full w-full flex items-center justify-center gap-2.5 pb-5 ease-linear duration-200 group-hover:translate-y-0">
          <button
            onClick={() => handleAddToCart()}
            className="inline-flex font-medium text-custom-sm py-[7px] px-5 rounded-[5px] bg-blue text-white ease-out duration-200 hover:bg-blue-dark"
          >
            Add to cart
          </button>
        </div>
      </div>

      <h3
        className="font-medium text-dark ease-out duration-200 hover:text-blue mb-1.5"
        onClick={() => handleProductDetails()}
      >
        <Link href={`/shopdetails/${item?._id}`}> {item?.title} </Link>
      </h3>

      <span className="flex items-center gap-2 font-medium text-lg">
        <span className="text-dark">${item?.price}</span>
      </span>
    </div>
  );
};

export default ProductItem;
