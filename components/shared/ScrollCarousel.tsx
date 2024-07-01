import React from "react";

const ScrollCarousel = () => {
  return (
    <>
      <h1 className="mb-10 text-3xl font-extrabold text-center text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-green-600 from-blue-400">
          Technologies
        </span>
        {", "}
        we work with
      </h1>

      <div className="w-full overflow-hidden mb-28">
        <div className="flex left-0 animate-marquee-infinite">
          <div className="flex w-72 justify-around gap-10">
            <img src={"/assets/images/wordpress.png"} alt="" />
            <img src={"/assets/images/google.png"} alt="" />
            <img src={"/assets/images/adsense.png"} alt="" />
            <img src={"/assets/images/analytics.png"} alt="" />
            <img src={"/assets/images/google-search.png"} alt="" />
            <img src={"/assets/images/gmb.png"} alt="" />
            <img src={"/assets/images/wordpress.png"} alt="" />
            <img src={"/assets/images/google.png"} alt="" />
            <img src={"/assets/images/adsense.png"} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ScrollCarousel;
