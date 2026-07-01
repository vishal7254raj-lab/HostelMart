import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ShoppingBag } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — HostelMart" },
      { name: "description", content: "Sign in to your HostelMart account to buy and sell in your hostel community." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-12 sm:py-16">
      <div className="flex items-center justify-center gap-2 text-lg font-bold">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
          <ShoppingBag className="h-5 w-5" />
        </span>
        Hostel<span className="text-primary">Mart</span>
      </div>
      <h1 className="mt-6 text-center text-2xl font-bold text-foreground">Welcome back</h1>
      <p className="mt-1 text-center text-sm text-muted-foreground">
        Sign in to continue to your hostel marketplace.
      </p>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="mt-8 space-y-5 rounded-2xl border border-border bg-card p-6 shadow-sm"
      >
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@college.edu" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="••••••••" required />
        </div>
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-muted-foreground">
            <Checkbox id="remember" /> Remember me
          </label>
          <a href="#" className="font-medium text-primary hover:underline">Forgot password?</a>
        </div>
        <Button type="submit" className="w-full">Sign in</Button>
        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/signup" className="font-semibold text-primary hover:underline">Sign up</Link>
        </p>
      </form>
    </div>
  );
}