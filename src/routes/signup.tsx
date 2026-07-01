import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingBag } from "lucide-react";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create Account — HostelMart" },
      { name: "description", content: "Join HostelMart — the trusted marketplace for hostel students." },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-12 sm:py-16">
      <div className="flex items-center justify-center gap-2 text-lg font-bold">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
          <ShoppingBag className="h-5 w-5" />
        </span>
        Hostel<span className="text-primary">Mart</span>
      </div>
      <h1 className="mt-6 text-center text-2xl font-bold text-foreground">Create your account</h1>
      <p className="mt-1 text-center text-sm text-muted-foreground">
        Join thousands of hostel students buying and selling smarter.
      </p>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="mt-8 space-y-5 rounded-2xl border border-border bg-card p-6 shadow-sm"
      >
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" placeholder="Aarav Sharma" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@college.edu" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="mobile">Mobile number</Label>
          <Input id="mobile" type="tel" placeholder="+91 98XXX 43210" required />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="year">Year</Label>
            <Select>
              <SelectTrigger id="year"><SelectValue placeholder="Select year" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1st Year</SelectItem>
                <SelectItem value="2">2nd Year</SelectItem>
                <SelectItem value="3">3rd Year</SelectItem>
                <SelectItem value="4">4th Year</SelectItem>
                <SelectItem value="5">Postgraduate</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="hostel">Hostel <span className="text-muted-foreground font-normal">(optional)</span></Label>
            <Input id="hostel" placeholder="e.g. Aryabhatta" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="At least 8 characters" required />
        </div>
        <Button type="submit" className="w-full">Create account</Button>
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-primary hover:underline">Sign in</Link>
        </p>
      </form>
    </div>
  );
}