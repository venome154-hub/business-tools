export type PdfTemplate = "classic" | "modern" | "minimal";
export type PageSize = "a4" | "letter";

export type BusinessProfile = {
  name: string;
  email: string;
  address: string;
  logoDataUrl: string;
  currency: string;
  paymentInstructions: string;
  accent: string;
  locale: string;
  template: PdfTemplate;
  pageSize: PageSize;
};

const KEY = "biztoolsbox-profile";

export const emptyProfile = (): BusinessProfile => ({
  name: "",
  email: "",
  address: "",
  logoDataUrl: "",
  currency: "USD",
  paymentInstructions: "",
  accent: "#111827",
  locale: "en-US",
  template: "classic",
  pageSize: "a4",
});

export function readProfile(): BusinessProfile | null {
  if (typeof localStorage === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return { ...emptyProfile(), ...JSON.parse(raw) };
  } catch {
    return null;
  }
}

export function writeProfile(profile: BusinessProfile) {
  localStorage.setItem(KEY, JSON.stringify(profile));
}

export function clearProfile() {
  localStorage.removeItem(KEY);
}
