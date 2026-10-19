import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Gallery } from './components/Gallery';
import { ProcessTimeline } from './components/ProcessTimeline';
import { AboutEngineer } from './components/AboutEngineer';
import { PropertyEnquiry } from './components/PropertyEnquiry';
import { OurApproach } from './components/OurApproach';
import { FAQ } from './components/FAQ';
import { ContactSection } from './components/ContactSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { MobileBottomBar } from './components/MobileBottomBar';
import { PolicyModals } from './components/PolicyModals';
import { ThemeProvider } from './context/ThemeContext';
import { ServiceType } from './types';

export default function App() {
  const [selectedService, setSelectedService] = useState<ServiceType>('civil-construction');
  const [policyModal, setPolicyModal] = useState<'privacy' | 'terms' | null>(null);

  const scrollToContact = (service?: ServiceType) => {
    if (service) {
      setSelectedService(service);
    }
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (serviceId: ServiceType) => {
    scrollToContact(serviceId);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[#080E1E] text-slate-100 flex flex-col font-sans selection:bg-teal-500 selection:text-slate-950 pb-16 lg:pb-0">
        
        {/* 3.A Navigation */}
        <Navbar onOpenConsultation={() => scrollToContact()} />

        {/* Main Page Content */}
        <main className="flex-1">
          {/* 3.B Hero Section */}
          <Hero
            onOpenConsultation={() => scrollToContact()}
            onExploreServices={scrollToServices}
          />

          {/* 3.C Services Section */}
          <Services onSelectService={handleSelectService} />

          {/* 3.D Why Choose Us */}
          <WhyChooseUs />

          {/* 3.E Project Gallery / Our Work */}
          <Gallery />

          {/* 3.F Our Working Process */}
          <ProcessTimeline onStartDiscussion={() => scrollToContact()} />

          {/* 3.G About the Engineer */}
          <AboutEngineer />

          {/* 3.H Property Enquiry Section */}
          <PropertyEnquiry />

          {/* 3.I Our Approach / Trust Principles */}
          <OurApproach />

          {/* 3.J Frequently Asked Questions */}
          <FAQ />

          {/* Main Consultation Contact Section */}
          <ContactSection preselectedService={selectedService} />

          {/* 3.K Final CTA */}
          <FinalCTA />
        </main>

        {/* 3.L Footer */}
        <Footer
          onSelectService={handleSelectService}
          onOpenPolicy={(type) => setPolicyModal(type)}
        />

        {/* Floating WhatsApp Action Widget */}
        <FloatingWhatsApp />

        {/* Sticky Bottom Mobile Action Bar (Calling, WhatsApp, Consultation) */}
        <MobileBottomBar onOpenConsultation={() => scrollToContact()} />

        {/* Privacy Policy & Terms Modals */}
        <PolicyModals
          type={policyModal}
          onClose={() => setPolicyModal(null)}
        />

      </div>
    </ThemeProvider>
  );
}
