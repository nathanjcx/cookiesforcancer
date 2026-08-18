import type { Appearance, StripeElementsOptions } from "@stripe/stripe-js";

export const stripeAppearance: Appearance = {
  theme: "flat",
  labels: "above",
  variables: {
    colorPrimary: "#c24b3a",
    colorBackground: "#ffffff",
    colorText: "#2a1a12",
    colorTextSecondary: "#7a6456",
    colorTextPlaceholder: "#c4b4a4",
    colorDanger: "#9d3528",
    colorIcon: "#7a6456",
    colorIconTab: "#7a6456",
    colorIconTabSelected: "#c24b3a",
    accessibleColorOnColorPrimary: "#fff7f2",
    fontFamily: "Karla, system-ui, sans-serif",
    fontSizeBase: "16px",
    spacingUnit: "4px",
    borderRadius: "8px",
    focusBoxShadow: "none",
    focusOutline: "2px solid #2a1a12",
  },
  rules: {
    ".Label": {
      fontWeight: "600",
      fontSize: "12px",
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: "#7a6456",
    },
    ".Input": {
      border: "1px solid rgba(42, 26, 18, 0.22)",
      boxShadow: "none",
      backgroundColor: "#ffffff",
      padding: "12px 14px",
    },
    ".Input:hover": {
      border: "1px solid #2a1a12",
      boxShadow: "none",
    },
    ".Input:focus": {
      border: "1px solid #2a1a12",
      boxShadow: "none",
    },
    ".Input--invalid": {
      border: "1px solid #9d3528",
      boxShadow: "none",
    },
    ".Tab": {
      border: "1px solid rgba(42, 26, 18, 0.22)",
      boxShadow: "none",
      backgroundColor: "#fff8ee",
    },
    ".Tab:hover": {
      boxShadow: "none",
      border: "1px solid #2a1a12",
    },
    ".Tab--selected": {
      border: "1px solid #2a1a12",
      boxShadow: "none",
      backgroundColor: "#ffffff",
    },
    ".Tab--selected:hover": {
      boxShadow: "none",
    },
    ".Block": {
      backgroundColor: "transparent",
      border: "1px solid rgba(42, 26, 18, 0.12)",
      boxShadow: "none",
    },
    ".Error": {
      color: "#9d3528",
    },
  },
};

export const stripeElementsOptions = {
  fonts: [
    {
      cssSrc:
        "https://fonts.googleapis.com/css2?family=Karla:wght@400;500;600;700&display=swap",
    },
  ],
} satisfies Pick<StripeElementsOptions, "fonts">;
