import * as React from "react";
import { Card } from "@md-editor/ui";
import { ClientActions } from "./ClientActions";

export default function Page() {
  return (
    <main className="p-8">
      <h1 className="mb-6 text-3xl font-bold">@md-editor/ui (RSC Demo)</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card title="Server Components">
          <p className="text-sm text-muted">
            This card is a server-safe component (no <code>use client</code>).
          </p>
          <p className="mt-3 text-sm text-muted">
            The page itself is also a Server Component by default in Next.js
            App Router.
          </p>
        </Card>

        <Card title="Client Components">
          <p className="text-sm text-muted">
            The buttons below are rendered from a client component and can
            handle events.
          </p>
          <div className="mt-4">
            <ClientActions />
          </div>
        </Card>
      </div>
    </main>
  );
}

