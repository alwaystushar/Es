import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globle.css";
import "./style.css";
import { SmoothScroll } from "@/components/animation/SmoothScroll";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { siteConfig } from "@/config/site";
import { LocaleProvider, localeBootScript, T } from "@/i18n/locale";

const rubik = Rubik({
  subsets: ["latin", "arabic"],
  weight: ["300", "400", "500"],
  variable: "--font-rubik",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: { icon: "/assets/logos/logo.svg" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html className={`${rubik.variable} h-full`} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: localeBootScript }} />
        <LocaleProvider>
          <a className="skip-link" href="#main">
            <T>Skip to content</T>
          </a>
          <SmoothScroll>
            <Header />
            {children}
            <Footer />
          </SmoothScroll>
        </LocaleProvider>
      </body>
    </html>
  );
}
