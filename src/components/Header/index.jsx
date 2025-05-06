"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { menuData } from "./menuData";
import Dropdown from "./Dropdown";
import { useAppSelector } from "../../redux/store";
import { useSelector } from "react-redux";
import { selectTotalPrice } from "../../redux/features/cart-slice";
import { useCartModalContext } from "../../app/context/CartSidebarModalContext";
import Image from "next/image";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../components/ui/dropdown-menu";
import { CircleUserRound, LogIn, ShoppingCart } from "lucide-react";

const Header = () => {
  const token = Cookies.get("token");
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);
  const { openCartModal } = useCartModalContext();
  const product = useAppSelector((state) => state.cartReducer.items);
  const totalPrice = useSelector(selectTotalPrice);

  const handleOpenCartModal = () => {
    openCartModal();
  };

  const handleStickyMenu = () => {
    if (window.scrollY >= 80) {
      setStickyMenu(true);
    } else {
      setStickyMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyMenu);
  });


  const handlerLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    toast.success("Account Logout Successfully!");
  }

  return (
    <header
      className={`fixed left-0 top-0 w-full z-[9] bg-white transition-all ease-in-out duration-300 ${stickyMenu && "shadow"}`}>
      <div className="border-t border-gray-3">
        <div className="max-w-[1170px] mx-auto px-4 sm:px-7.5 xl:px-0">
          <div className="flex items-center justify-between">
            <Link className="flex-shrink-0" href="/">
              <Image
                src="/images/logo/logo.svg"
                alt="Logo"
                width={219}
                height={36}
              />
            </Link>

            <div
              className={`w-[288px] absolute right-4 top-full xl:static xl:w-auto h-0 xl:h-auto invisible xl:visible xl:flex items-center justify-between ${navigationOpen &&
                `!visible bg-white shadow-lg border border-gray-3 !h-auto max-h-[400px] overflow-y-scroll rounded-md p-5`
                }`}
            >
              <nav>
                <ul className="flex xl:items-center flex-col xl:flex-row gap-5 xl:gap-6">
                  {menuData?.map((menuItem, i) =>
                    menuItem?.submenu ? (
                      <Dropdown
                        key={i}
                        menuItem={menuItem}
                        stickyMenu={stickyMenu}
                      />
                    ) : (
                      <li
                        key={i}
                        className="group relative before:w-0 before:h-[3px] before:bg-blue before:absolute before:left-0 before:top-0 before:rounded-b-[3px] before:ease-out before:duration-200 hover:before:w-full "
                      >
                        <Link
                          href={menuItem.path}
                          className={`hover:text-blue text-custom-sm font-medium text-dark flex ${stickyMenu ? "xl:py-4" : "xl:py-6"
                            }`}
                        >
                          {menuItem.title}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </nav>
            </div>

            <div className="flex w-full lg:w-auto justify-between items-center gap-5">
              <div className="flex items-center gap-5">

                {token ? (
                  <>
                    <div className="flex items-center gap-2.5">
                      <LogIn className="text-[#3C50E0]" />
                      <div>
                        <span className="block text-2xs text-dark-4 uppercase">
                          account
                        </span>
                        <DropdownMenu>
                          <DropdownMenuTrigger><CircleUserRound className="font-medium" /></DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem onClick={handlerLogout}>Logout</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <Link href="/signin" className="flex items-center gap-2.5">
                      <LogIn className="text-[#3C50E0]" />
                      <div>
                        <span className="block text-2xs text-dark-4 uppercase">
                          account
                        </span>
                        <p className="font-medium text-custom-sm text-dark">
                          Sign In
                        </p>
                      </div>
                    </Link>
                  </>
                )}
                <button
                  onClick={handleOpenCartModal}
                  className="flex items-center gap-2.5"
                >
                  <span className="inline-block relative">
                    <ShoppingCart className="text-[#3C50E0]" />
                    <span className="flex items-center justify-center font-medium text-2xs absolute -right-2 -top-2.5 bg-blue w-4.5 h-4.5 rounded-full text-white">
                      {product?.length}
                    </span>
                  </span>

                  <div>
                    <span className="block text-2xs text-dark-4 uppercase">
                      cart
                    </span>
                    <p className="font-medium text-custom-sm text-dark">
                      ${totalPrice}
                    </p>
                  </div>
                </button>
              </div>

              <button
                id="Toggle"
                aria-label="Toggler"
                className="xl:hidden block"
                onClick={() => setNavigationOpen(!navigationOpen)}
              >
                <span className="block relative cursor-pointer w-5.5 h-5.5">
                  <span className="du-block absolute right-0 w-full h-full">
                    <span
                      className={`block relative top-0 left-0 bg-dark rounded-sm w-0 h-0.5 my-1 ease-in-out duration-200 ${!navigationOpen && "!w-full delay-300"
                        }`}
                    ></span>
                    <span
                      className={`block relative top-0 left-0 bg-dark rounded-sm w-0 h-0.5 my-1 ease-in-out duration-200 delay-150 ${!navigationOpen && "!w-full delay-400"
                        }`}
                    ></span>
                    <span
                      className={`block relative top-0 left-0 bg-dark rounded-sm w-0 h-0.5 my-1 ease-in-out duration-200 delay-200 ${!navigationOpen && "!w-full delay-500"
                        }`}
                    ></span>
                  </span>

                  <span className="block absolute right-0 w-full h-full rotate-45">
                    <span
                      className={`block bg-dark rounded-sm ease-in-out duration-200 delay-300 absolute left-2.5 top-0 w-0.5 h-full ${!navigationOpen && "!h-0 "
                        }`}
                    ></span>
                    <span
                      className={`block bg-dark rounded-sm ease-in-out duration-200 delay-400 absolute left-0 top-2.5 w-full h-0.5 ${!navigationOpen && "!h-0 dealy-200"
                        }`}
                    ></span>
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
