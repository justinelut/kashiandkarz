import ContactDetailsPage from "@/components/onboarding/contact-details";
import { getUser } from "@/lib/appwrite";
import { getBusinessProfile } from "@/lib/dealer-actions";


export default async function ContactDetails() {
  const user = await getUser();
  const businessProfile  = await getBusinessProfile(user?.$id!);
  return <ContactDetailsPage business_id={businessProfile.$id} />;
}