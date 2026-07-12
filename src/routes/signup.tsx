import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingBag } from "lucide-react";
import { supabase } from "@/lib/supabase";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      {
        title: "Create Account — HostelMart",
      },
      {
        name: "description",
        content:
          "Join HostelMart — the trusted marketplace for hostel students.",
      },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [year, setYear] = useState("");
  const [hostel, setHostel] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");

    if (!name || !email || !mobile || !year || !password) {
      setError("Please fill all required fields.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

   const { data, error } = await supabase.auth.signUp({
  email,
  password,
});

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }
    if (data.user) {
  const { error: profileError } = await supabase
    .from("profiles")
    .insert([
      {
        id: data.user.id,
        name: name,
        email: email,
        mobile: mobile,
        year: year,
        hostel: hostel,
      },
    ]);

  if (profileError) {
    setError(profileError.message);
    return;
  }
}

    alert("Account created successfully!");

    navigate({
      to: "/login",
    });
  }

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-12 sm:py-16">
      <div className="flex items-center justify-center gap-2 text-lg font-bold">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
          <ShoppingBag className="h-5 w-5" />
        </span>

        Hostel<span className="text-primary">Mart</span>
      </div>

      <h1 className="mt-6 text-center text-2xl font-bold text-foreground">
        Create your account
      </h1>

      <p className="mt-1 text-center text-sm text-muted-foreground">
        Join thousands of hostel students buying and selling smarter.
      </p>

      <form
        onSubmit={handleSignup}
        className="mt-8 space-y-5 rounded-2xl border border-border bg-card p-6 shadow-sm"
      >
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>

          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Aarav Sharma"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>

          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@college.edu"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="mobile">Mobile number</Label>

          <Input
            id="mobile"
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="+91 98XXX 43210"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Year</Label>

            <Select value={year} onValueChange={setYear}>
              <SelectTrigger>
                <SelectValue placeholder="Select year" />
              </SelectTrigger>

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
            <Label>
              Hostel{" "}
              <span className="text-muted-foreground font-normal">
                (optional)
              </span>
            </Label>

            <Input
              value={hostel}
              onChange={(e) => setHostel(e.target.value)}
              placeholder="e.g. Aryabhatta"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Password</Label>

          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 8 characters"
          />
        </div>

        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Create account"}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-primary hover:underline"
          >
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}