import type { Metadata } from "next";
import { ContactPage as ContactPageContent } from "@/components/site/pages/ContactPage";
import { contactData } from "@/data/profile";

export const metadata: Metadata = {
  title: "Contact",
  description: "Direct contact options, social profiles, and resume access for collaboration opportunities."
};

export default function ContactPage() {
  return <ContactPageContent contact={contactData} />;
}
