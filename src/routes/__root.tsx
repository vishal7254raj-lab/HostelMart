import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4">
        <div className="max-w-md text-center">
          <p className="text-sm font-semibold text-primary">404</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
            This page went shopping elsewhere
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            We couldn't find the page you're looking for. It may have been moved or removed.
          </p>
          <div className="mt-6 flex justify-center gap-2">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Go home
            </Link>
            <Link
              to="/buy"
              className="inline-flex items-center justify-center rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              Browse products
            </Link>
          </div>
        </div>
      </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "HostelMart — Buy & Sell for Hostel Students" },
      {
        name: "description",
        content:
          "HostelMart is the trusted marketplace for hostel students to buy and sell books, notes, electronics, cycles and essentials at student-friendly prices.",
      },
      { name: "author", content: "HostelMart" },
      { property: "og:title", content: "HostelMart — Buy & Sell for Hostel Students" },
      {
        property: "og:description",
        content:
          "Buy, sell and save smarter within your hostel community. Books, notes, electronics, cycles and more.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "HostelMart" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/icon.png.png", type: "image/png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <div className="flex min-h-screen flex-col bg-background text-foreground">
          <Navbar />
          <main className="flex-1">
            {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
            <Outlet />
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
