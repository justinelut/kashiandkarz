import { CarIcon } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";


const CallToAction = () => {
    return (
      <section className="container mx-auto grid gap-6 py-16 md:grid-cols-2">
        <Card className="bg-blue-50">
          <CardContent className="flex flex-col items-center p-8">
            <CarIcon className="mb-4 h-12 w-12 text-blue-600" />
            <h3 className="mb-2 text-xl font-semibold">
              Are You Looking For a Car?
            </h3>
            <p className="mb-4 text-center text-muted-foreground">
              Find your perfect match from our extensive collection
            </p>
            <Button>Search Cars</Button>
          </CardContent>
        </Card>
        <Card className="bg-pink-50">
          <CardContent className="flex flex-col items-center p-8">
            <CarIcon className="mb-4 h-12 w-12 text-pink-600" />
            <h3 className="mb-2 text-xl font-semibold">
              Do You Want to Sell a Car?
            </h3>
            <p className="mb-4 text-center text-muted-foreground">
              Get the best value for your vehicle
            </p>
            <Button variant="secondary">List Your Car</Button>
          </CardContent>
        </Card>
      </section>
    );
}

export default CallToAction;