import { siteConfig } from "@/config/site";

/**
 * Validate config safely at runtime
 */
function getWooConfig() {
  const { Url, wooCK, wooCS } = siteConfig;

  if (!Url || !wooCK || !wooCS) {
    throw new Error(
      "Missing WooCommerce env variables: NEXT_PUBLIC_WORDPRESS_URL, WC_CONSUMER_KEY, WC_CONSUMER_SECRET",
    );
  }

  return { Url, wooCK, wooCS };
}

/**
 * Make authenticated requests to WooCommerce REST API using native fetch
 * Creates fresh connection for each request (avoids SDK singleton issues)
 */
export async function makeWooRequest(
  endpoint: string,
  params?: Record<string, string | number>,
) {
  const { Url, wooCK, wooCS } = getWooConfig();

  // Build URL with query parameters
  const url = new URL(`${Url}wp-json/wc/v3/${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }

  // Create Basic Auth header
  const auth = Buffer.from(`${wooCK}:${wooCS}`).toString("base64");

  try {
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      // Add timeout
      signal: AbortSignal.timeout(30000), // 30 second timeout
    });

    if (!response.ok) {
      throw new Error(`WooCommerce API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`WooCommerce request failed for ${endpoint}:`, error);
    throw error;
  }
}
