import {
    ReadonlyRequestCookies
} from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { IPinfoWrapper } from 'node-ipinfo';

import { ALL_FRANCHISE_QUERY, IS_ZONE_EXIST_QUERY } from '@/sanity/lib/queries';

import { sanityFetch } from './sanity/lib/live';

// Utility function to fetch country code from IP
const getCountryFromIP = async (ip: string) => {
  const apiToken = process.env.NEXT_PUBLIC_GET_IP_LOCATION_API_TOKEN || "";
  const ipinfoWrapper = new IPinfoWrapper(apiToken);

  try {
    const ipinfo = await ipinfoWrapper.lookupIp(ip);
    return ipinfo?.countryCode?.toLowerCase() || null;
  } catch (error) {
    console.error("Error fetching country from IP:", error);
    return null;
  }
};

// Function to check if a country code exists in the zone
const checkCountryCodeExistence = async (countryCode: string) => {
  try {
    const response = await sanityFetch({
      query: IS_ZONE_EXIST_QUERY,
      params: { countryCode: countryCode.toLowerCase()},
    });
    return response?.data || null;
  } catch (error) {
    console.error("Error checking country code existence:", error);
    return null;
  }
};

// Function to fetch and store franchises in cookies
const setFranchisesInCookies = async (cookiesInstance: ReadonlyRequestCookies) => {
  try {
    const franchiseRes = await sanityFetch({ query: ALL_FRANCHISE_QUERY });
    if (franchiseRes.data) {
      cookiesInstance.set("franchises", JSON.stringify(franchiseRes.data));
    }
  } catch (error) {
    console.error("Error fetching franchises:", error);
  }
};

// Middleware function
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const cookiesInstance = await cookies();
  const response = NextResponse.next();

  // Excluded paths from processing
  const excludedPaths = ["/api", "/_next", "/favicon.ico", "/static", "/studio"];
  if (excludedPaths.some((path) => pathname.startsWith(path))) {
    return response;
  }

  // Fetch and store franchises in cookies
  await setFranchisesInCookies(cookiesInstance);

  // Handle IP-based country detection
  const forwardedFor = req.headers.get("X-Forwarded-For");
  if (forwardedFor && forwardedFor !== "::1") {
    const cachedCountryCode = cookiesInstance.get("countryCode")?.value;

    if (cachedCountryCode) {
      response.headers.set("X-Country-Code", cachedCountryCode);
      return response;
    }

    const countryCode = await getCountryFromIP(forwardedFor);
    if (countryCode && (await checkCountryCodeExistence(countryCode))) {
      cookiesInstance.set("countryCode", countryCode.toLowerCase());
      response.headers.set("X-Country-Code", countryCode.toLowerCase());
    }
  }

  // Local testing: Fallback to a dummy country code
  const dummyCountryCode = "cad";
  if (await checkCountryCodeExistence(dummyCountryCode)) {
    response.headers.set("X-Country-Code", dummyCountryCode.toLowerCase());
  }

  return response;
}

// Middleware matcher configuration
export const config = {
  matcher: ["/:path*"],
};
