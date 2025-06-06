// SEO Configuration for AltForce
const seoConfig = {
  // Basic Meta Tags
  title: "AltForce - Premium Roblox Alt Accounts for ERPC Servers",
  description: "Boost your Roblox ERPC server's population with secure, high-quality alt accounts. AltForce provides fast delivery, reliability, and expert-level service.",
  keywords: "Roblox alt accounts, ERPC alts, buy Roblox alts, alt account shop, Roblox alt service, server growth, ERPC boost, Roblox server management",

  // Open Graph / Social Media
  ogTitle: "AltForce - Premium Roblox Alt Accounts",
  ogDescription: "Fast, reliable, and secure alt accounts for your Roblox ERPC server. Trusted by top servers. 24/7 support included.",
  ogImage: "/logo.png",
  ogUrl: "https://yourdomain.com",

  // Twitter Card
  twitterCard: "summary_large_image",
  twitterSite: "@yourtwitterhandle",

  // Structured Data
  structuredData: {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AltForce",
    "url": "https://yourdomain.com",
    "logo": "https://yourdomain.com/logo.png",
    "sameAs": [
      "https://twitter.com/yourtwitterhandle"
    ],
    "description": "Premium provider of Roblox alt accounts for ERPC servers. Secure, fast, and trusted by top communities.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    }
  },

  // Additional SEO Meta Tags
  metaTags: [
    { name: "robots", content: "index, follow" },
    { name: "author", content: "AltForce" },
    { name: "theme-color", content: "#021a3a" },
    { name: "viewport", content: "width=device-width, initial-scale=1" }
  ]
};

// Generate full SEO meta tags block
export function generateMetaTags() {
  const meta = `
    <title>${seoConfig.title}</title>
    <meta name="description" content="${seoConfig.description}">
    <meta name="keywords" content="${seoConfig.keywords}">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="${seoConfig.ogUrl}">
    <meta property="og:title" content="${seoConfig.ogTitle}">
    <meta property="og:description" content="${seoConfig.ogDescription}">
    <meta property="og:image" content="${seoConfig.ogImage}">

    <!-- Twitter -->
    <meta name="twitter:card" content="${seoConfig.twitterCard}">
    <meta name="twitter:site" content="${seoConfig.twitterSite}">
    <meta name="twitter:title" content="${seoConfig.ogTitle}">
    <meta name="twitter:description" content="${seoConfig.ogDescription}">
    <meta name="twitter:image" content="${seoConfig.ogImage}">
    
    ${seoConfig.metaTags.map(tag => `<meta name="${tag.name}" content="${tag.content}">`).join('\n')}
    
    <!-- Structured Data -->
    <script type="application/ld+json">
    ${JSON.stringify(seoConfig.structuredData, null, 2)}
    </script>
  `;
  return meta;
}

// Dynamically inject or update SEO tags
export function updateSEOTags() {
  if (typeof document === 'undefined') return;

  // Title
  document.title = seoConfig.title;

  // Description & Keywords
  const updateOrCreateMeta = (name, content) => {
    let tag = document.querySelector(`meta[name="${name}"]`);
    if (!tag) {
      tag = document.createElement("meta");
      tag.name = name;
      document.head.appendChild(tag);
    }
    tag.content = content;
  };

  updateOrCreateMeta("description", seoConfig.description);
  updateOrCreateMeta("keywords", seoConfig.keywords);

  // Other meta tags
  seoConfig.metaTags.forEach(tag => updateOrCreateMeta(tag.name, tag.content));

  // Open Graph
  const setOg = (property, content) => {
    let tag = document.querySelector(`meta[property="${property}"]`);
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("property", property);
      document.head.appendChild(tag);
    }
    tag.content = content;
  };

  setOg("og:type", "website");
  setOg("og:url", seoConfig.ogUrl);
  setOg("og:title", seoConfig.ogTitle);
  setOg("og:description", seoConfig.ogDescription);
  setOg("og:image", seoConfig.ogImage);

  // Twitter
  updateOrCreateMeta("twitter:card", seoConfig.twitterCard);
  updateOrCreateMeta("twitter:site", seoConfig.twitterSite);
  updateOrCreateMeta("twitter:title", seoConfig.ogTitle);
  updateOrCreateMeta("twitter:description", seoConfig.ogDescription);
  updateOrCreateMeta("twitter:image", seoConfig.ogImage);

  // Structured Data
  const oldJsonLd = document.querySelector('script[type="application/ld+json"]');
  if (oldJsonLd) oldJsonLd.remove();

  const jsonLd = document.createElement("script");
  jsonLd.type = "application/ld+json";
  jsonLd.textContent = JSON.stringify(seoConfig.structuredData, null, 2);
  document.head.appendChild(jsonLd);
}
