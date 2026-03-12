"use client";

import { WavyLine } from "@/components/landing/WavyLine";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeatureSection } from "@/components/landing/FeatureSection";
import { Footer } from "@/components/landing/Footer";
import { SupportWidgets } from "@/components/landing/SupportWidgets";
import StudentNavbar from "@/components/ui/StudentNavbar";

export default function HomePage() {
  return (
    <div className="homepage-shadow relative min-h-screen bg-[#ffffff] text-gray-800 font-sans selection:bg-brand-primary/10 overflow-hidden">

      {/* ── Red Drop Shadow (30% reduced from claim-points)
            claim-points rest:  rgba(131,18,56, 0.50) → 0.35
            claim-points hover: rgba(131,18,56, 0.56) → 0.39
      ── */}
      <style>{`
        /* Hero image */
        .homepage-shadow .hero-image-box {
          box-shadow: none;
          transition: box-shadow 0.22s ease, transform 0.22s ease;
        }
        .homepage-shadow .hero-image-box:hover {
          box-shadow: 0 16px 44px 0 rgba(131, 18, 56, 0.39);
        }

        /* Feature section — image block */
        .homepage-shadow .feature-image-box {
          box-shadow: none;
          transition: box-shadow 0.22s ease, transform 0.5s ease;
        }
        .homepage-shadow .feature-image-box:hover {
          box-shadow: 0 16px 44px 0 rgba(131, 18, 56, 0.39);
        }

        /* Feature section — text card */
        .homepage-shadow .feature-text-card {
          box-shadow: none;
          transition: box-shadow 0.22s ease, transform 0.22s ease;
        }
        .homepage-shadow .feature-text-card:hover {
          box-shadow: 0 16px 44px 0 rgba(131, 18, 56, 0.39);
        }

        /* Support widget cards */
        .homepage-shadow .support-card {
          box-shadow: none;
          transition: box-shadow 0.22s ease, transform 0.3s ease;
        }
        .homepage-shadow .support-card:hover {
          box-shadow: 0 16px 44px 0 rgba(131, 18, 56, 0.39);
        }
      `}</style>

      {/* Global Navigation Bar */}
      <StudentNavbar />

      {/* The continuous red wavy line flows vertically behind everything */}
      <WavyLine />

      <main className="relative z-10 flex flex-col items-center pt-20">

        {/* Hero Section */}
        <HeroSection />

        {/* Section A: The Mission */}
        <FeatureSection
          sectionId="mission"
          heading="Why We Created This"
          bodyText="College life is more than just exams. Students stopped participating in social and active events because there were no tangible benefits. This system recognizes and rewards your social contributions with academic points, closing the gap between engagement and success."
          imageUrl="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1470&auto=format&fit=crop"
          imageAlt="Students sitting passively in a classroom"
        />

        {/* Section B: Benefits to the Student */}
        <FeatureSection
          sectionId="student-benefits"
          heading="How It Helps the Student: Recognition & Rewards"
          bodyText="Convert your effort into credit. Every course certificate, hackathon win, and volunteer activity adds directly to your academic transcript, improving your CGPA through active participation rather than just passive learning."
          imageUrl="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1470&auto=format&fit=crop"
          imageAlt="Student holding certificate with rising point counter"
        />

        {/* Section C: Engagement */}
        <FeatureSection
          sectionId="engagement"
          heading="Student Benefits & Gamification"
          bodyText="Unlock rewards! Advance through Bronze, Silver, and Gold tiers, appear on department leaderboards, and boost your professional portfolio with a verifiable transcript of your extracurricular achievements."
          imageUrl="https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=1470&auto=format&fit=crop"
          imageAlt="Icons representing medals and leaderboard"
        />

        {/* Section D: The Process */}
        <FeatureSection
          sectionId="process"
          heading="Simple 4-Step Process: From Activity to Credit"
          isList={true}
          bodyText={
            <ol className="list-decimal pl-5 space-y-4">
              <li><strong className="text-brand-primary">Submit Activity:</strong> Perform an activity (e.g., NPTEL Course, Hackathon) and gather proof.</li>
              <li><strong className="text-brand-primary">Upload Proof:</strong> Submit your certificate or project link via the portal.</li>
              <li><strong className="text-brand-primary">AI Vetting:</strong> Instant automated verification of your proof.</li>
              <li><strong className="text-brand-primary">Points Awarded:</strong> Confirmed points add immediately to your ledger and transcript.</li>
            </ol>
          }
          imageUrl="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1470&auto=format&fit=crop"
          imageAlt="Structured numbered flowchart illustration"
        />

        {/* Section E: Benefits to the Faculty */}
        <FeatureSection
          sectionId="faculty-benefits"
          heading="How It Helps the Faculty: Effortless Administration"
          bodyText="Focus on mentorship. The system automates routine point verification using AI, routing only flagged or low-confidence submissions for your expert manual review, simplifying records and reducing paperwork."
          imageUrl="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1469&auto=format&fit=crop"
          imageAlt="Faculty smiling looking at a dashboard"
        />

        {/* Section F: AI Processing Details */}
        <FeatureSection
          sectionId="ai-processing"
          heading="AI Processing: Smart Verification"
          isList={true}
          bodyText={
            <div className="space-y-4">
              <p className="mb-4 text-gray-600">Our advanced AI model verifies evidence claims with high accuracy, streaming approvals automatically while flagging edge cases for human expertise.</p>
              <ul className="space-y-3 font-medium text-gray-700">
                <li className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 text-sm">✓</span>
                  <span><strong className="text-brand-primary">≥ 80% Confidence:</strong> Auto Approved instantly.</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 text-amber-600 text-sm">!</span>
                  <span><strong className="text-brand-primary">50% &ndash; 80% Confidence:</strong> Sent to Faculty Review.</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600 text-sm">✗</span>
                  <span><strong className="text-brand-primary">&lt; 50% Confidence:</strong> Automatically Rejected.</span>
                </li>
              </ul>
            </div>
          }
          imageUrl="https://images.unsplash.com/photo-1620825937374-87fc1d62c30c?q=80&w=1474&auto=format&fit=crop"
          imageAlt="Abstract futuristic neural network technology and AI processing"
        />

      </main>

      {/* Support Widgets Before Footer */}
      <SupportWidgets />

      {/* Footer */}
      <Footer />

    </div>
  );
}
