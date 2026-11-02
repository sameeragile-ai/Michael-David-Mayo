export interface ExhibitionConfig {
  exhibitionTitle: string;
  artistName: string;
  monogram: string;
  fairName: string;
  boothLocation: string;
  dates: string;
  city: string;
  venue: string;
  idleTimeoutSeconds: number;
  featuredWorkSlug: string;
  contactEmail: string;
  galleryDirector: string;
}

export const exhibitionConfig: ExhibitionConfig = {
  exhibitionTitle: "Inside the Work",
  artistName: "Michael David Mayo",
  monogram: "MDM",
  fairName: "Art Miami 2026",
  boothLocation: "Booth P-214 · Contemporary Curatorial Sector",
  dates: "December 1–6, 2026",
  city: "Miami, Florida",
  venue: "One Herald Plaza @ NE 14th Street & Biscayne Bay",
  idleTimeoutSeconds: 90,
  featuredWorkSlug: "entanglement-in-gold",
  contactEmail: "inquiries@mayo-contemporary.com",
  galleryDirector: "Hélène Vance-Moreau",
};
