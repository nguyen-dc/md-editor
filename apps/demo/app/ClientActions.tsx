"use client";

import * as React from "react";
import { Button } from "@md-editor/ui";

export function ClientActions() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button
        variant="secondary"
        onClick={() => {
          // Simple client-only interaction to prove RSC boundary works.
          // eslint-disable-next-line no-alert
          alert("Client component clicked!");
        }}
      >
        Client button
      </Button>
      <Button variant="outline" onClick={() => {}}>
        Outline button
      </Button>
    </div>
  );
}

