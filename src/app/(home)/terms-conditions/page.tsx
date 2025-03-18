import { PageLayout } from "@/components/layouts/page-layout"

export const metadata = {
  title: "Terms & Conditions | KashiAndKarz",
  description: "Read the terms and conditions for using KashiAndKarz services.",
}

export default function TermsConditionsPage() {
  return (
    <PageLayout
      title="Terms & Conditions"
      description="Please read these terms and conditions carefully before using our services."
      breadcrumbs={[{ label: "Terms & Conditions", href: "/terms-conditions" }]}
      lastUpdated="March 1, 2025"
    >
      <section className="mb-8">
        <h2>1. Introduction</h2>
        <p>
          Welcome to KashiAndKarz. These Terms and Conditions govern your use of our website, mobile applications, and
          services. By accessing or using KashiAndKarz, you agree to be bound by these Terms. If you disagree with any
          part of these terms, you may not access our services.
        </p>
      </section>

      <section className="mb-8">
        <h2>2. Definitions</h2>
        <p>Throughout these Terms, we use certain terms with specific meanings:</p>
        <ul>
          <li>
            <strong>"KashiAndKarz,"</strong> "we," "us," and "our" refer to KashiAndKarz Ltd, registered in England
            (company number 07103079).
          </li>
          <li>
            <strong>"Services"</strong> refers to all products, services, content, features, technologies, or functions
            offered by KashiAndKarz.
          </li>
          <li>
            <strong>"User,"</strong> "you," and "your" refer to individuals who access or use our Services.
          </li>
          <li>
            <strong>"Dealer"</strong> refers to automotive retailers who list vehicles on our platform.
          </li>
          <li>
            <strong>"Content"</strong> refers to all information displayed on our Services, including text, images,
            audio, video, and interactive features.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2>3. Account Registration</h2>
        <p>
          To access certain features of our Services, you may need to register for an account. When you register, you
          agree to provide accurate, current, and complete information. You are responsible for maintaining the
          confidentiality of your account credentials and for all activities that occur under your account. You agree to
          notify us immediately of any unauthorized use of your account.
        </p>
      </section>

      <section className="mb-8">
        <h2>4. User Conduct</h2>
        <p>When using our Services, you agree not to:</p>
        <ul>
          <li>Violate any applicable laws or regulations</li>
          <li>Infringe upon the rights of others</li>
          <li>Use our Services for any illegal or unauthorized purpose</li>
          <li>Interfere with or disrupt our Services or servers</li>
          <li>Attempt to gain unauthorized access to any part of our Services</li>
          <li>Collect or harvest user data without permission</li>
          <li>Post false, misleading, or deceptive content</li>
          <li>Engage in any activity that could damage, disable, or impair our Services</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2>5. Vehicle Listings and Information</h2>
        <p>
          KashiAndKarz provides vehicle listings and information as a service to users. While we strive for accuracy, we
          do not guarantee the completeness, reliability, or accuracy of this information. Vehicle descriptions, images,
          features, specifications, and prices are provided by Dealers or third-party data providers and may contain
          errors or omissions.
        </p>
        <p className="mt-4">
          Users should verify all information directly with the Dealer before making a purchase decision. KashiAndKarz
          is not responsible for any inaccuracies in vehicle listings or for any decisions made based on this
          information.
        </p>
      </section>

      <section className="mb-8">
        <h2>6. Intellectual Property</h2>
        <p>
          All content, features, and functionality on our Services, including but not limited to text, graphics, logos,
          icons, images, audio clips, digital downloads, and software, are owned by KashiAndKarz, our licensors, or
          other providers and are protected by copyright, trademark, and other intellectual property laws.
        </p>
        <p className="mt-4">
          You may not copy, modify, distribute, sell, or lease any part of our Services or included content, nor may you
          reverse engineer or attempt to extract the source code of our software, unless you have our written
          permission.
        </p>
      </section>

      <section className="mb-8">
        <h2>7. Privacy</h2>
        <p>
          Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal
          information. By using our Services, you consent to our collection and use of data as described in our Privacy
          Policy.
        </p>
      </section>

      <section className="mb-8">
        <h2>8. Disclaimers and Limitations of Liability</h2>
        <p>
          Our Services are provided on an "as is" and "as available" basis. KashiAndKarz makes no warranties, expressed
          or implied, regarding the operation of our Services or the information, content, or materials included.
        </p>
        <p className="mt-4">
          To the fullest extent permitted by law, KashiAndKarz disclaims all warranties, including but not limited to
          implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
        </p>
        <p className="mt-4">
          KashiAndKarz shall not be liable for any indirect, incidental, special, consequential, or punitive damages,
          including but not limited to loss of profits, data, use, or goodwill, resulting from your access to or use of
          our Services.
        </p>
      </section>

      <section className="mb-8">
        <h2>9. Indemnification</h2>
        <p>
          You agree to indemnify, defend, and hold harmless KashiAndKarz, its officers, directors, employees, agents,
          and affiliates from and against any and all claims, liabilities, damages, losses, costs, expenses, or fees
          (including reasonable attorneys' fees) arising from your use of our Services, violation of these Terms, or
          infringement of any intellectual property or other rights of any person or entity.
        </p>
      </section>

      <section className="mb-8">
        <h2>10. Modifications to Terms</h2>
        <p>
          KashiAndKarz reserves the right to modify these Terms at any time. We will provide notice of significant
          changes by posting the updated Terms on our website and updating the "Last Updated" date. Your continued use
          of our Services after such modifications constitutes your acceptance of the revised Terms.
        </p>
      </section>

      <section className="mb-8">
        <h2>11. Governing Law</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of England and Wales, without
          regard to its conflict of law provisions. Any disputes arising under or in connection with these Terms shall
          be subject to the exclusive jurisdiction of the courts of England and Wales.
        </p>
      </section>

      <section>
        <h2>12. Contact Information</h2>
        <p>If you have any questions about these Terms, please contact us at:</p>
        <address className="mt-4 not-italic">
          KashiAndKarz Ltd
          <br />
          2nd Floor, Verde Building
          <br />
          10 Bressenden Place
          <br />
          London, England, SW1E 5DH
          <br />
          Email: legal@kashiandkarz.com
        </address>
      </section>
    </PageLayout>
  )
}

