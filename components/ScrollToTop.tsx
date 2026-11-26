"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { captureUtmParams } from "../utils/utmTracking";

const ScrollToTop: React.FC = () => {
  const pathname = usePathname();

  useEffect(() => {
    captureUtmParams();

    // Scroll to top when pathname changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
