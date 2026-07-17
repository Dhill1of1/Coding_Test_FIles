import { useState } from "react";

import logoRing from "../assets/ridgeline/logo-ellipse.svg";
import bagIcon from "../assets/ridgeline/bag-icon.svg";
import mainPicture from "../assets/ridgeline/main-picture.jpg";
import productPhoto1 from "../assets/ridgeline/product-photo-1.jpg";
import productPhoto2 from "../assets/ridgeline/product-photo-2.jpg";
import productPhoto3 from "../assets/ridgeline/product-photo-3.jpg";
import productPhoto4 from "../assets/ridgeline/product-photo-4.jpg";
import arrowLeft from "../assets/ridgeline/arrow-left.svg";
import arrowRight from "../assets/ridgeline/arrow-right.svg";
import starFull from "../assets/ridgeline/star-full.svg";
import starEmpty from "../assets/ridgeline/star-empty.svg";
import colorRed from "../assets/ridgeline/color-red.svg";
import colorBlue from "../assets/ridgeline/color-blue.svg";
import colorGreen from "../assets/ridgeline/color-green.svg";
import colorYellow from "../assets/ridgeline/color-yellow.svg";
import colorSelectedRing from "../assets/ridgeline/color-selected-ring.svg";
import cartIcon from "../assets/ridgeline/cart-icon.svg";
import wishlistButton from "../assets/ridgeline/wishlist-button.svg";

interface NavLink {
  label: string;
  active?: boolean;
}

interface ColorOption {
  name: string;
  swatch: string;
}

interface ProductPhoto {
  src: string;
  alt: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Shop", active: true },
  { label: "Contact" },
  { label: "About" },
  { label: "Sign Up" },
];

const PRODUCT_PHOTOS: ProductPhoto[] = [
  { src: productPhoto1, alt: "Model wearing the parka, front view" },
  { src: productPhoto2, alt: "Model wearing the parka, side view" },
  { src: productPhoto3, alt: "Model wearing the parka, walking" },
  { src: productPhoto4, alt: "Model wearing the parka, adjusting goggles" },
];

const COLOR_OPTIONS: ColorOption[] = [
  { name: "Red", swatch: colorRed },
  { name: "Blue", swatch: colorBlue },
  { name: "Green", swatch: colorGreen },
  { name: "Yellow", swatch: colorYellow },
];

const SIZE_OPTIONS: string[] = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];

const RATING = 4;
const REVIEW_COUNT = 445;

function StarRating({ rating, total }: { rating: number; total: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Rated ${rating} out of ${total} stars`}>
      {Array.from({ length: total }, (_, index) => (
        <img
          key={index}
          src={index < rating ? starFull : starEmpty}
          alt=""
          className="h-5 w-5 sm:h-6 sm:w-6"
        />
      ))}
    </div>
  );
}

export default function RidgelineProductPage() {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>("Yellow");
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [justAddedToCart, setJustAddedToCart] = useState(false);

  const showPreviousPhoto = () => {
    setActivePhotoIndex((prev) => (prev - 1 + PRODUCT_PHOTOS.length) % PRODUCT_PHOTOS.length);
  };

  const showNextPhoto = () => {
    setActivePhotoIndex((prev) => (prev + 1) % PRODUCT_PHOTOS.length);
  };

  const handleAddToCart = () => {
    setJustAddedToCart(true);
    window.setTimeout(() => setJustAddedToCart(false), 1800);
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-[#5c7995]/20">
        <div className="mx-auto flex max-w-[1451px] items-center justify-between gap-4 px-6 py-4 sm:px-10">
          <a href="#" className="flex items-center gap-2" aria-label="Ridgeline home">
            <span className="relative inline-flex h-14 w-14 items-center justify-center">
              <img src={logoRing} alt="" className="absolute inset-0 h-full w-full" />
              <span className="font-['Space_Grotesk',_sans-serif] text-2xl font-bold text-[#5c7995]">
                RL
              </span>
            </span>
          </a>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-10 font-medium text-[#5c7995]">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href="#"
                    className={`text-lg transition hover:opacity-80 ${
                      link.active ? "font-extrabold underline" : ""
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <button
              type="button"
              className="rounded-2xl bg-[#5c7995] px-6 py-3 text-lg font-medium text-white transition hover:bg-[#4c6580]"
            >
              Log In
            </button>
            <button type="button" aria-label="View bag" className="h-7 w-6 shrink-0">
              <img src={bagIcon} alt="" className="h-full w-full" />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1451px] px-6 py-10 sm:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:gap-12">
          {/* Gallery */}
          <section aria-label="Product photos">
            <div className="overflow-hidden rounded-[50px]">
              <img
                src={mainPicture}
                alt={PRODUCT_PHOTOS[activePhotoIndex].alt}
                className="h-[320px] w-full object-cover sm:h-[420px] lg:h-[560px]"
              />
            </div>

            <div className="mt-6 flex items-center justify-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={showPreviousPhoto}
                aria-label="Previous photo"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#5c7995] transition hover:bg-[#5c7995]/10"
              >
                <img src={arrowLeft} alt="" className="h-4 w-3" />
              </button>

              {PRODUCT_PHOTOS.map((photo, index) => (
                <button
                  key={photo.src}
                  type="button"
                  onClick={() => setActivePhotoIndex(index)}
                  aria-label={`Show photo ${index + 1}`}
                  aria-pressed={activePhotoIndex === index}
                  className={`h-[70px] w-[110px] shrink-0 overflow-hidden rounded-[18px] transition sm:h-[100px] sm:w-[155px] ${
                    activePhotoIndex === index
                      ? "border-3 border-[#5c7995]"
                      : "border border-transparent opacity-80 hover:opacity-100"
                  }`}
                >
                  <img src={photo.src} alt={photo.alt} className="h-full w-full object-cover" />
                </button>
              ))}

              <button
                type="button"
                onClick={showNextPhoto}
                aria-label="Next photo"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#5c7995] transition hover:bg-[#5c7995]/10"
              >
                <img src={arrowRight} alt="" className="h-4 w-3" />
              </button>
            </div>
          </section>

          {/* Details */}
          <section aria-label="Product details" className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-medium text-black sm:text-[32px]">
                The Perfect Pockets Long Parka
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <StarRating rating={RATING} total={5} />
                <span className="text-lg text-black">{REVIEW_COUNT} reviews</span>
              </div>
              <p className="mt-4 text-2xl font-medium text-black">$145</p>
              <p className="mt-4 max-w-[485px] text-base leading-relaxed text-black">
                This cozy parka has a water-resistant shell made of upcycled materials, synthetic
                down filling, and an abundance of pockets. There are six zipper-close pockets plus
                one roomy velcro-close pouch. Engineered for storage, this parka provides space
                for all the necessities you'll bring on your next cold-weather adventure.
              </p>
            </div>

            <div className="rounded-[40px] border-2 border-[#5c7995] p-6 sm:rounded-[60px] sm:p-8">
              <div>
                <h2 className="text-xl font-extrabold text-black">Colors</h2>
                <div className="mt-3 flex items-center gap-4">
                  {COLOR_OPTIONS.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColor(color.name)}
                      aria-label={color.name}
                      aria-pressed={selectedColor === color.name}
                      className="relative flex h-10 w-10 items-center justify-center"
                    >
                      {selectedColor === color.name && (
                        <img
                          src={colorSelectedRing}
                          alt=""
                          className="absolute inset-0 h-full w-full"
                        />
                      )}
                      <img src={color.swatch} alt="" className="h-[30px] w-[30px]" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <div className="flex items-baseline justify-between">
                  <h2 className="text-xl font-extrabold text-black">Sizes</h2>
                  <a href="#" className="text-sm font-medium text-black hover:underline">
                    Size Guide
                  </a>
                </div>
                <div className="mt-3 grid grid-cols-4 gap-3">
                  {SIZE_OPTIONS.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      aria-pressed={selectedSize === size}
                      className={`h-[49px] rounded-[15px] text-base font-bold text-black transition ${
                        selectedSize === size
                          ? "bg-[#5c7995] text-white"
                          : "bg-[#d9d9d9] hover:bg-[#c9c9c9]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex flex-1 items-center justify-center gap-3 rounded-full bg-[#5c7995] py-5 text-2xl font-bold text-white transition hover:bg-[#4c6580]"
                >
                  {justAddedToCart ? "Added!" : "Add to Cart"}
                  <img src={cartIcon} alt="" className="h-6 w-7" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsWishlisted((prev) => !prev)}
                  aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                  aria-pressed={isWishlisted}
                  className="relative flex h-[81px] w-[81px] shrink-0 items-center justify-center"
                >
                  <img src={wishlistButton} alt="" className="absolute inset-0 h-full w-full" />
                  <svg
                    viewBox="0 0 24 24"
                    className="relative h-6 w-6"
                    fill={isWishlisted ? "white" : "none"}
                    stroke="white"
                    strokeWidth={2}
                  >
                    <path d="M12 20.5s-7.5-4.6-10-9.3C.6 8 1.9 4.5 5.2 3.6c2.2-.6 4.3.3 5.8 2.1 1.5-1.8 3.6-2.7 5.8-2.1 3.3.9 4.6 4.4 3.2 7.6-2.5 4.7-10 9.3-10 9.3z" />
                  </svg>
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
