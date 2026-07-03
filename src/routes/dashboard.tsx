import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Pencil, Plus, Trash2, Package, Eye, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CURRENT_USER, PRODUCTS } from "@/lib/sample-data";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — HostelMart" },
      { name: "description", content: "Manage your listings and profile on HostelMart." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
 const navigate = useNavigate();

const [checkingAuth, setCheckingAuth] = useState(true);

useEffect(() => {
  checkUser();
}, []);

async function handleLogout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    alert(error.message);
    return;
  }

  navigate({
    to: "/",
  });
}

async function checkUser() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    navigate({
      to: "/login",
    });
    return;
  }

  setCheckingAuth(false);
}
  const myListings = PRODUCTS.slice(0, 4);
  const stats = [
    { label: "Active listings", value: myListings.length, icon: Package },
    { label: "Total views", value: 428, icon: Eye },
    { label: "Earnings", value: "₹4,120", icon: IndianRupee },
  ];
if (checkingAuth) {
  return (
    <div className="flex h-screen items-center justify-center">
      <h2 className="text-lg font-semibold">
        Checking authentication...
      </h2>
    </div>
  );
}
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-bold text-foreground sm:text-3xl">
            Welcome back, {CURRENT_USER.name.split(" ")[0]} 👋
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Here's what's happening with your marketplace activity.
          </p>
        </div>
        <Button asChild className="shrink-0 bg-accent text-accent-foreground hover:bg-accent/90">
          <Link to="/sell"><Plus className="mr-1 h-4 w-4" /> New listing</Link>
        </Button>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 shadow-sm">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
              <s.icon className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <div className="text-2xl font-bold text-foreground">{s.value}</div>
              <div className="truncate text-xs uppercase tracking-wide text-muted-foreground">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <Tabs defaultValue="listings" className="mt-10">
        <TabsList>
          <TabsTrigger value="listings">My Listings</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="listings" className="mt-6">
          {myListings.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border bg-card p-10 text-center">
              <h2 className="text-lg font-semibold">No listings yet</h2>
              <p className="mt-1 text-sm text-muted-foreground">Start selling in a couple of minutes.</p>
              <Button asChild className="mt-5"><Link to="/sell">Create your first listing</Link></Button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
              {myListings.map((p) => (
                <div key={p.id} className="flex gap-4 rounded-xl border border-border bg-card p-4 shadow-sm">
                  <img src={p.images[0]} alt="" className="h-24 w-24 shrink-0 rounded-lg object-cover" />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-xs text-muted-foreground">{p.brand}</p>
                        <h3 className="truncate text-sm font-semibold text-foreground">{p.name}</h3>
                      </div>
                      <Badge variant="secondary" className="shrink-0">{p.condition}</Badge>
                    </div>
                    <div className="mt-1 text-lg font-bold text-accent">₹{p.price.toLocaleString("en-IN")}</div>
                    <div className="mt-auto flex gap-2 pt-2">
                      <Button size="sm" variant="outline" className="h-8"><Pencil className="mr-1 h-3.5 w-3.5" /> Edit</Button>
                      <Button size="sm" variant="ghost" className="h-8 text-destructive hover:bg-destructive/10 hover:text-destructive">
                        <Trash2 className="mr-1 h-3.5 w-3.5" /> Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="profile" className="mt-6">
          <div className="max-w-2xl rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-primary/10 text-primary text-xl font-bold">
                {CURRENT_USER.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">{CURRENT_USER.name}</h2>
                <p className="text-sm text-muted-foreground">{CURRENT_USER.year} · {CURRENT_USER.hostel}</p>
              </div>
            </div>
            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                ["Email", CURRENT_USER.email],
                ["Mobile", CURRENT_USER.mobile],
                ["Year", CURRENT_USER.year],
                ["Hostel", CURRENT_USER.hostel],
              ].map(([k, v]) => (
                <div key={k} className="rounded-lg border border-border bg-background p-3">
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">{k}</dt>
                  <dd className="mt-1 truncate text-sm font-medium text-foreground">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 flex gap-2">
              <Button variant="outline">Edit profile</Button>
              <Button variant="ghost" className="text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={handleLogout}> Sign out </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}