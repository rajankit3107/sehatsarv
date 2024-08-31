import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Component() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <CardTitle>Medical Chatbot</CardTitle>
          <Button size="icon" variant="ghost">
            <XIcon className="w-5 h-5" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>
          Please enter your symptoms below, and our chatbot will recommend a
          suitable medicine.
        </p>
        <div className="grid gap-2">
          <Label htmlFor="symptoms">Symptoms</Label>
          <Textarea
            id="symptoms"
            placeholder="Enter your symptoms here..."
            className="min-h-[100px]"
          />
        </div>
        <Button className="w-full">Get Recommendation</Button>
        <div className="space-y-2">
          <h3 className="font-semibold">Recommended Medicine:</h3>
          <div className="space-y-1">
            <p>Ibuprofen</p>
            <p className="text-muted-foreground">
              Ibuprofen is an anti-inflammatory medication that can help reduce
              pain, swelling, and fever associated with your symptoms.
            </p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          This recommendation is not a substitute for professional medical
          advice. Please consult a healthcare provider if your symptoms persist
          or worsen.
        </p>
      </CardContent>
    </Card>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
