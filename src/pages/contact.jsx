import React from "react";
import ContactBanner from "../components/property/contactBanner";
import SupportOptions from "../components/property/supportOption";
import GetInTouchSection from "../components/property/getInTouch";
import MapSection from "../components/property/locationSec";
import FindPropertyCTA from "../components/property/cta";

export default function ContactPage() {
  return (
    <>
      
      
      <main>
        <ContactBanner />
        <SupportOptions />
        <GetInTouchSection />
        <div className="max-w-6xl mx-auto px-6 sm:px-6 lg:px-8 mb-16 py-6">
          <MapSection />
        </div>
        <FindPropertyCTA />
      </main>

     
    </>
  );
}