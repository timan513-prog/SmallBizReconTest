import { useEffect, useState } from "react";
import Header from "../../components/ineedsomething/Header";
import HeroLocalFinder from "../../components/ineedsomething/HeroLocalFinder";
import TrustStrip from "../../components/ineedsomething/TrustStrip";
import LocalProblemCards from "../../components/ineedsomething/LocalProblemCards";
import ToolGrid from "../../components/ineedsomething/ToolGrid";
import HowItWorks from "../../components/ineedsomething/HowItWorks";
import FeaturedLocalTool from "../../components/ineedsomething/FeaturedLocalTool";
import ComparisonTable from "../../components/ineedsomething/ComparisonTable";
import Methodology from "../../components/ineedsomething/Methodology";
import FAQAccordion from "../../components/ineedsomething/FAQAccordion";
import FinalCTA from "../../components/ineedsomething/FinalCTA";
import Footer from "../../components/ineedsomething/Footer";
import {
  FAQS,
  type Issue,
  type Tool,
  type Urgency,
} from "../../components/ineedsomething/data";

const META_TITLE =
  "Operation: IneedSomething — Brevard County Help Finder, Tools, Checklists & Local Resources";
const META_DESCRIPTION =
  "Operation: IneedSomething helps Brevard County residents and small businesses find local tools, checklists, forms, offices, and next steps for business, permits, property taxes, veterans, hurricane prep, public records, and more.";
const SITE_URL = "https://ineedsomething.local";

function useDocumentMeta(title: string, description: string) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    const ensureMeta = (
      attrName: "name" | "property",
      attrValue: string,
      content: string,
    ) => {
      let tag = document.head.querySelector<HTMLMetaElement>(
        `meta[${attrName}="${attrValue}"]`,
      );
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attrName, attrValue);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    ensureMeta("name", "description", description);
    ensureMeta("property", "og:title", title);
    ensureMeta("property", "og:description", description);
    ensureMeta("property", "og:type", "website");
    ensureMeta("property", "og:url", SITE_URL);
    ensureMeta("name", "twitter:title", title);
    ensureMeta("name", "twitter:description", description);

    return () => {
      document.title = prevTitle;
    };
  }, [title, description]);
}

function FAQSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function IneedSomethingHome() {
  useDocumentMeta(META_TITLE, META_DESCRIPTION);

  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedIssue, setSelectedIssue] = useState<Issue | "">("");
  const [urgency, setUrgency] = useState<Urgency | "">("");
  const [recommendedTools, setRecommendedTools] = useState<Tool[]>([]);

  const scrollToFinder = () => {
    const el = document.getElementById("hero-finder");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      const firstSelect = el.querySelector<HTMLSelectElement>("select");
      firstSelect?.focus({ preventScroll: true });
    }
  };

  return (
    <div
      className="min-h-screen bg-[#F4F1EA] text-[#1F2D3D] antialiased"
      style={{ fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif" }}
    >
      <FAQSchema />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#0B2545] focus:text-[#F4F1EA] focus:rounded-lg focus:font-semibold"
      >
        Skip to main content
      </a>

      <Header onPrimaryClick={scrollToFinder} />

      <main id="main">
        <HeroLocalFinder
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          selectedIssue={selectedIssue}
          setSelectedIssue={setSelectedIssue}
          urgency={urgency}
          setUrgency={setUrgency}
          recommendedTools={recommendedTools}
          setRecommendedTools={setRecommendedTools}
        />
        <TrustStrip />
        <LocalProblemCards />
        <ToolGrid />
        <HowItWorks />
        <FeaturedLocalTool />
        <ComparisonTable />
        <Methodology />
        <FAQAccordion />
        <FinalCTA onPrimaryClick={scrollToFinder} />
      </main>

      <Footer />
    </div>
  );
}
