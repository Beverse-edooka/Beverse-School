import { Nav, Footer } from "@/components/layout/SiteChrome";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Gap } from "@/components/sections/Gap";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Opportunity } from "@/components/sections/Opportunity";
import { Tracks } from "@/components/sections/Tracks";
import { WhoItIsFor } from "@/components/sections/WhoItIsFor";
import { Mentors } from "@/components/sections/Mentors";
import { Founder } from "@/components/sections/Founder";
import { BeverseOne } from "@/components/sections/BeverseOne";
import { FinalCta } from "@/components/sections/FinalCta";
import {
  getFeaturedMentorsForHero,
  getMentorsForSection,
} from "@/lib/mentors";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [heroMentors, sectionMentors] = await Promise.all([
    getFeaturedMentorsForHero(4),
    getMentorsForSection(3),
  ]);

  return (
    <>
      <Nav />
      <main>
        <Hero mentors={heroMentors} />
        <TrustStrip />
        <Gap />
        <HowItWorks />
        <Opportunity />
        <Tracks />
        <WhoItIsFor />
        <Mentors mentors={sectionMentors} />
        <Founder />
        <BeverseOne />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
