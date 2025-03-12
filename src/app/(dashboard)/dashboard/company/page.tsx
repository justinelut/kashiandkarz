import { getCompanyDetails } from "@/lib/actions";
import { CompanyForm } from "./components/company-form";
import { Separator } from "@/components/ui/separator";

export default async function CompanyPage() {
  const { data: companyDetails } = await getCompanyDetails();

  return (
    <div className="space-y-6">
    <div>
      <div className="flex flex-col space-y-1.5">
        <h1 className="text-2xl font-bold tracking-tight">Company Details</h1>
        <p className="text-sm text-muted-foreground">
          Manage your dealership information and social media links
        </p>
      </div>
      <Separator className="my-4" />
    </div>
    <CompanyForm initialData={companyDetails} />
  </div>
  );
}
// In company/page.tsx
