import { PageLayout } from "@/components/layouts/page-layout"
import Link from "next/link"

export const metadata = {
  title: "Privacy Policy | KashiAndKarz",
  description: "Learn how KashiAndKarz collects, uses, and protects your personal information.",
}

export default function PrivacyPolicyPage() {
  return (
    <PageLayout
      title="Privacy Policy"
      description="We value your privacy. This policy explains how we collect, use, and protect your personal information."
      breadcrumbs={[{ label: "Privacy Policy", href: "/privacy-policy" }]}
      lastUpdated="February 15, 2025"
    >
      <section className="mb-8">
        <h2>1. Introduction</h2>
        <p>
          At KashiAndKarz, we respect your privacy and are committed to protecting your personal data. This privacy
          policy will inform you about how we look after your personal data when you visit our website or use our
          services and tell you about your privacy rights and how the law protects you.
        </p>
        <p className="mt-4">
          This privacy policy applies to all personal data we process about you when you use our website, mobile
          applications, or services, sign up for an account, contact our customer service, or otherwise interact with
          KashiAndKarz.
        </p>
      </section>

      <section className="mb-8">
        <h2>2. Data We Collect About You</h2>
        <p>
          Personal data means any information about an individual from which that person can be identified. We may
          collect, use, store, and transfer different kinds of personal data about you, which we have grouped together
          as follows:
        </p>
        <ul className="mt-4">
          <li>
            <strong>Identity Data</strong> includes first name, last name, username or similar identifier, title, date
            of birth, and gender.
          </li>
          <li>
            <strong>Contact Data</strong> includes billing address, delivery address, email address, and telephone
            numbers.
          </li>
          <li>
            <strong>Financial Data</strong> includes payment card details (securely processed through our payment
            providers).
          </li>
          <li>
            <strong>Transaction Data</strong> includes details about payments to and from you and other details of
            products and services you have purchased or inquired about.
          </li>
          <li>
            <strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and
            version, time zone setting and location, browser plug-in types and versions, operating system and platform,
            and other technology on the devices you use to access our website.
          </li>
          <li>
            <strong>Profile Data</strong> includes your username and password, purchases or orders made by you, your
            interests, preferences, feedback, and survey responses.
          </li>
          <li>
            <strong>Usage Data</strong> includes information about how you use our website, products, and services.
          </li>
          <li>
            <strong>Marketing and Communications Data</strong> includes your preferences in receiving marketing from us
            and our third parties and your communication preferences.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2>3. How We Collect Your Personal Data</h2>
        <p>We use different methods to collect data from and about you including through:</p>
        <ul className="mt-4">
          <li>
            <strong>Direct interactions.</strong> You may give us your Identity, Contact, and Financial Data by filling
            in forms or by corresponding with us by post, phone, email, or otherwise.
          </li>
          <li>
            <strong>Automated technologies or interactions.</strong> As you interact with our website, we may
            automatically collect Technical Data about your equipment, browsing actions, and patterns.
          </li>
          <li>
            <strong>Third parties or publicly available sources.</strong> We may receive personal data about you from
            various third parties and public sources, such as analytics providers, advertising networks, search
            information providers, and credit reference agencies.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2>4. How We Use Your Personal Data</h2>
        <p>
          We will only use your personal data when the law allows us to. Most commonly, we will use your personal data
          in the following circumstances:
        </p>
        <ul className="mt-4">
          <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
          <li>
            Where it is necessary for our legitimate interests (or those of a third party) and your interests and
            fundamental rights do not override those interests.
          </li>
          <li>Where we need to comply with a legal obligation.</li>
          <li>Where you have given consent for us to process your personal data for a specific purpose.</li>
        </ul>
        <p className="mt-4">
          We have set out below a description of the ways we plan to use your personal data and which of the legal bases
          we rely on to do so:
        </p>
        <ul className="mt-4">
          <li>To register you as a new customer</li>
          <li>To process and deliver your orders</li>
          <li>To manage our relationship with you</li>
          <li>To enable you to participate in a prize draw, competition, or complete a survey</li>
          <li>To administer and protect our business and this website</li>
          <li>To deliver relevant website content and advertisements to you</li>
          <li>
            To use data analytics to improve our website, products/services, marketing, customer relationships, and
            experiences
          </li>
          <li>To make suggestions and recommendations to you about goods or services that may be of interest to you</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2>5. Data Security</h2>
        <p>
          We have put in place appropriate security measures to prevent your personal data from being accidentally lost,
          used, or accessed in an unauthorized way, altered, or disclosed. In addition, we limit access to your personal
          data to those employees, agents, contractors, and other third parties who have a business need to know. They
          will only process your personal data on our instructions, and they are subject to a duty of confidentiality.
        </p>
        <p className="mt-4">
          We have put in place procedures to deal with any suspected personal data breach and will notify you and any
          applicable regulator of a breach where we are legally required to do so.
        </p>
      </section>

      <section className="mb-8">
        <h2>6. Data Retention</h2>
        <p>
          We will only retain your personal data for as long as reasonably necessary to fulfill the purposes we
          collected it for, including for the purposes of satisfying any legal, regulatory, tax, accounting, or
          reporting requirements. We may retain your personal data for a longer period in the event of a complaint or if
          we reasonably believe there is a prospect of litigation in respect to our relationship with you.
        </p>
      </section>

      <section className="mb-8">
        <h2>7. Your Legal Rights</h2>
        <p>
          Under certain circumstances, you have rights under data protection laws in relation to your personal data,
          including the right to:
        </p>
        <ul className="mt-4">
          <li>Request access to your personal data</li>
          <li>Request correction of your personal data</li>
          <li>Request erasure of your personal data</li>
          <li>Object to processing of your personal data</li>
          <li>Request restriction of processing your personal data</li>
          <li>Request transfer of your personal data</li>
          <li>Right to withdraw consent</li>
        </ul>
        <p className="mt-4">
          If you wish to exercise any of these rights, please contact us using the details provided below.
        </p>
      </section>

      <section className="mb-8">
        <h2>8. Cookies</h2>
        <p>
          Our website uses cookies to distinguish you from other users of our website. This helps us to provide you with
          a good experience when you browse our website and also allows us to improve our site. For detailed information
          on the cookies we use and the purposes for which we use them, see our{" "}
          <Link href="/cookie-policy" className="text-primary hover:underline">
            Cookie Policy
          </Link>
          .
        </p>
      </section>

      <section className="mb-8">
        <h2>9. Changes to the Privacy Policy</h2>
        <p>
          We may update this privacy policy from time to time. We will notify you of significant changes by posting the
          updated policy on our website and updating the "Last Updated" date. You are advised to review this privacy
          policy periodically for any changes.
        </p>
      </section>

      <section>
        <h2>10. Contact Us</h2>
        <p>
          If you have any questions about this privacy policy or our privacy practices, please contact our Data
          Protection Officer at:
        </p>
        <address className="mt-4 not-italic">
          Data Protection Officer
          <br />
          KashiAndKarz Ltd
          <br />
          2nd Floor, Verde Building
          <br />
          10 Bressenden Place
          <br />
          London, England, SW1E 5DH
          <br />
          Email: privacy@kashiandkarz.com
        </address>
        <p className="mt-4">
          You have the right to make a complaint at any time to the Information Commissioner's Office (ICO), the UK
          supervisory authority for data protection issues (www.ico.org.uk). We would, however, appreciate the chance to
          deal with your concerns before you approach the ICO, so please contact us in the first instance.
        </p>
      </section>
    </PageLayout>
  )
}

