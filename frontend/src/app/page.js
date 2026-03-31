"use client";

import { Button } from "@/components/ui/button";

export default function Home() {
  // const token = localStorage.getItem("access_token");
  const token = true;
  return (
    token ? (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to ApplySphere</h1>
          <p className="text-lg text-gray-600 mb-6">Your all-in-one job application tracker</p>
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Button onClick={() => window.location.href = "/dashboard"}>Get Started</Button>
            <Button onClick={() => window.location.href = "/login"}>Login</Button>
          </div>
        </div>
      </div>
    ) : (
      window.location.href = "/login"
    )
  );
}