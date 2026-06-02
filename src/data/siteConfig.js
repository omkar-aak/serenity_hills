export const siteConfig = {
  name: "Serenity Hills",
  legalName: "Serenity Hills Dapoli",
  siteUrl: import.meta.env.VITE_SITE_URL || "https://www.serenityhills.in",
  phoneDisplay: "+91 96995 49324",
  phoneHref: "tel:+919699549324",
  whatsappPhone: "919699549324",
  email: "contactserenityhills@gmail.com",
  location: "Dapoli, Ratnagiri, Maharashtra",
  address: "Velvi - Bandhtivre - Dapoli Road, Dapoli, Ratnagiri, Maharashtra",
  leadApiUrl:
    import.meta.env.VITE_LEAD_API_URL ||
    "/api/leads",
  brochureUrl: "/assets/Serenity%20Hills%20Brochure%20.pdf",
  googleMapUrl: "https://share.google/3CBmjSm3OCJEnmpi8",
  googleMapEmbedUrl:
    "https://www.google.com/maps?q=Serenity%20Hills%20Dapoli%20Ratnagiri%20Maharashtra&output=embed",
  defaultWhatsappMessage:
    "Hi, I am interested in Serenity Hills Dapoli. Please share details about plots, villas, pricing, documentation, and site visit options.",
  social: {
    facebook: "https://www.facebook.com/serenityhillsdapoli",
    instagram: "https://www.instagram.com/serenityhillsdapoli?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    youtube: "https://www.youtube.com/@serenityhills_dapoli"
  },
  assets: {
    logo: "/assets/logos/serenity-hills-logo.png",
    hero: "/assets/images/homepagebg.png",
    estate: "/assets/images/serenity-hills-hero-dapoli-estate.png",
    landscape: "/assets/images/Plots_img/serenity-hills-landscape.jpeg",
    villa: "/assets/images/Villas_img/villa_hero_img.jpg",
    beach: "/assets/images/dapoli-beach-lifestyle.jpg",
    forts: "/assets/images/dapoli-tourism-forts-optimized.jpg",
    seasons: "/assets/images/konkan-seasons.png",
    masterPlan: "/assets/images/Master_Plan.png",
    plots: "/assets/images/serenity-hills-plots.png",
    overview: "/assets/images/serenity-hills-overview-optimized.jpg"
  }
};
