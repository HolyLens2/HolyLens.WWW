/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS?: Fetcher;
  DB: D1Database;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

const escapeAttribute = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

async function serveLocalizedPage(request: Request, env: Env, url: URL) {
  const assetUrl = new URL(`/_pages${url.pathname}`, url);
  const assetRequest = new Request(assetUrl, {
    method: request.method,
    headers: request.headers,
  });
  const response = env.ASSETS
    ? await env.ASSETS.fetch(assetRequest)
    : await fetch(assetRequest);
  if (!response.ok) return response;

  const isChinese = url.pathname.startsWith("/zh/");
  const title = isChinese
    ? "HolyLens | AI 创新医疗设备"
    : "HolyLens | AI Medical Devices";
  const description = isChinese
    ? "HolyLens 将人工智能与医学影像、声学技术深度融合，为医疗机构与个人提供更早期、更便捷的健康洞察。"
    : "HolyLens combines AI with medical imaging and acoustic technologies for earlier, more accessible health insights.";
  const canonical = escapeAttribute(url.href);
  const imageUrl = escapeAttribute(new URL("/og.png", url).href);
  const socialMetadata = `
    <link rel="canonical" href="${canonical}">
    <meta name="description" content="${escapeAttribute(description)}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="HolyLens">
    <meta property="og:title" content="${escapeAttribute(title)}">
    <meta property="og:description" content="${escapeAttribute(description)}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:image" content="${imageUrl}">
    <meta property="og:locale" content="${isChinese ? "zh_CN" : "en_US"}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeAttribute(title)}">
    <meta name="twitter:description" content="${escapeAttribute(description)}">
    <meta name="twitter:image" content="${imageUrl}">
  `;
  const html = (await response.text()).replace("</head>", `${socialMetadata}</head>`);
  const headers = new Headers(response.headers);
  headers.set("content-type", "text/html; charset=utf-8");
  return new Response(html, { status: response.status, headers });
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/") {
      const preferredLocale = request.headers
        .get("accept-language")
        ?.toLowerCase()
        .startsWith("zh")
        ? "zh"
        : "en";
      return Response.redirect(new URL(`/${preferredLocale}/index.html`, url), 302);
    }

    if (/^\/(?:en|zh)\/[a-z0-9-]+\.html$/.test(url.pathname)) {
      return serveLocalizedPage(request, env, url);
    }

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => {
          const assetRequest = new Request(new URL(path, request.url));
          return env.ASSETS ? env.ASSETS.fetch(assetRequest) : fetch(assetRequest);
        },
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    return handler.fetch(request, env, ctx);
  },
};

export default worker;
