import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Component() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Find a Hospital</h1>
          <p className="text-muted-foreground">
            Search for hospitals in your area or explore top cities with
            hospitals.
          </p>
        </div>
        <div className="col-span-2 lg:col-span-1">
          <form className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="new-york">New York</SelectItem>
                    <SelectItem value="los-angeles">Los Angeles</SelectItem>
                    <SelectItem value="chicago">Chicago</SelectItem>
                    <SelectItem value="houston">Houston</SelectItem>
                    <SelectItem value="phoenix">Phoenix</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Hospital" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="hospital-a">Hospital A</SelectItem>
                    <SelectItem value="hospital-b">Hospital B</SelectItem>
                    <SelectItem value="hospital-c">Hospital C</SelectItem>
                    <SelectItem value="hospital-d">Hospital D</SelectItem>
                    <SelectItem value="hospital-e">Hospital E</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full">
              Search
            </Button>
          </form>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Top Cities with Hospitals</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <Link
            href="#"
            className="bg-muted/20 rounded-lg p-4 hover:bg-muted/30 transition-colors"
            prefetch={false}
          >
            <h3 className="text-lg font-medium">New York</h3>
            <p className="text-muted-foreground">12 Hospitals</p>
          </Link>
          <Link
            href="#"
            className="bg-muted/20 rounded-lg p-4 hover:bg-muted/30 transition-colors"
            prefetch={false}
          >
            <h3 className="text-lg font-medium">Los Angeles</h3>
            <p className="text-muted-foreground">9 Hospitals</p>
          </Link>
          <Link
            href="#"
            className="bg-muted/20 rounded-lg p-4 hover:bg-muted/30 transition-colors"
            prefetch={false}
          >
            <h3 className="text-lg font-medium">Chicago</h3>
            <p className="text-muted-foreground">8 Hospitals</p>
          </Link>
          <Link
            href="#"
            className="bg-muted/20 rounded-lg p-4 hover:bg-muted/30 transition-colors"
            prefetch={false}
          >
            <h3 className="text-lg font-medium">Houston</h3>
            <p className="text-muted-foreground">7 Hospitals</p>
          </Link>
          <Link
            href="#"
            className="bg-muted/20 rounded-lg p-4 hover:bg-muted/30 transition-colors"
            prefetch={false}
          >
            <h3 className="text-lg font-medium">Phoenix</h3>
            <p className="text-muted-foreground">6 Hospitals</p>
          </Link>
          <Link
            href="#"
            className="bg-muted/20 rounded-lg p-4 hover:bg-muted/30 transition-colors"
            prefetch={false}
          >
            <h3 className="text-lg font-medium">San Francisco</h3>
            <p className="text-muted-foreground">5 Hospitals</p>
          </Link>
          <Link
            href="#"
            className="bg-muted/20 rounded-lg p-4 hover:bg-muted/30 transition-colors"
            prefetch={false}
          >
            <h3 className="text-lg font-medium">Miami</h3>
            <p className="text-muted-foreground">4 Hospitals</p>
          </Link>
          <Link
            href="#"
            className="bg-muted/20 rounded-lg p-4 hover:bg-muted/30 transition-colors"
            prefetch={false}
          >
            <h3 className="text-lg font-medium">Seattle</h3>
            <p className="text-muted-foreground">3 Hospitals</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
