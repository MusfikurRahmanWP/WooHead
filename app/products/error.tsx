"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold text-foreground">Products</h1>
        <div className="mt-6 rounded-lg border border-destructive/50 bg-destructive/10 p-6">
          <div className="flex items-start gap-4">
            <AlertCircle className="h-6 w-6 shrink-0 text-destructive" />
            <div>
              <p className="font-semibold text-destructive">
                Error loading products
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {error.message}
              </p>
              <Button onClick={reset} variant="destructive" className="mt-4">
                <RefreshCw className="mr-2 h-4 w-4" />
                Retry
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
