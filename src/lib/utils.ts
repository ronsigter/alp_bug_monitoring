import { MERCHANT_BANNER_IDS } from "@/constants/merchantBannerIds";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getMerchantDetails(bannerId: number) {
  const merchantDetails = MERCHANT_BANNER_IDS[bannerId] || {
    name: "---",
    priority: 0,
  };

  return merchantDetails;
}
