import { WavyLine } from "@/components/landing/WavyLine";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeatureSection } from "@/components/landing/FeatureSection";
import { Footer } from "@/components/landing/Footer";
import { SupportWidgets } from "@/components/landing/SupportWidgets";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-[#ffffff] text-gray-800 font-sans selection:bg-brand-primary/10 overflow-hidden">
      
      {/* Top Navbar Placeholder (As per request leaving space for nav bar shown in pictures) */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 lg:px-12 py-4 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-gray-900">CampusCred</span>
        </div>
        <div className="hidden md:flex items-center gap-8 font-semibold text-sm text-gray-500">
          <a href="#" className="text-brand-primary">Home</a>
          <a href="#" className="hover:text-gray-900 transition-colors">Claim Points</a>
          <a href="/student/dashboard" className="hover:text-gray-900 transition-colors">Dashboard</a>
          <a href="#" className="hover:text-gray-900 transition-colors">Leaderboard</a>
        </div>
        <div className="flex items-center gap-4">
          <a href="/student-login" className="px-5 py-2 text-sm font-semibold text-brand-primary border border-brand-primary/20 rounded-full hover:bg-brand-tertiary transition-colors">
            Login
          </a>
          <a href="/student-register" className="px-5 py-2 text-sm font-semibold text-white bg-brand-primary rounded-full hover:bg-brand-primary/90 shadow-soft hover:shadow-lg transition-all">
            Get Started
          </a>
        </div>
      </header>

      {/* The continuous red wavy line flows vertically behind everything */}
      <WavyLine />

      <main className="relative z-10 flex flex-col items-center">
        
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

      </main>

      {/* Support Widgets Before Footer */}
      <SupportWidgets />

      {/* Footer */}
      <Footer />

    </div>
  );
}
