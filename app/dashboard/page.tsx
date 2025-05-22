"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="flex min-h-[calc(100dvh-4rem)] flex-col">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6 mx-auto max-w-3xl">
            <div className="flex flex-col items-center text-center space-y-8">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Welcome to Your Dashboard{user ? `, ${user.email}` : ""}!
              </h1>
              <p className="text-xl text-slate-600">
                This is your personal dashboard where you can manage your forms
                and view submissions.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-8">
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h2 className="text-xl font-semibold mb-4">Your Forms</h2>
                  <p className="text-slate-600 mb-4">
                    You haven&apos;t created any forms yet.
                  </p>
                  <Button className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-white shadow transition-colors hover:bg-primary/90">
                    Create Your First Form
                  </Button>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Recent Activity
                  </h2>
                  <div className="space-y-4">
                    <p className="text-slate-600">
                      No recent activity to display.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 bg-white">
        <div className="container px-4 md:px-6 mx-auto max-w-3xl text-center">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} FormFlow. A simple form solution.
          </p>
        </div>
      </footer>
    </div>
  );
}
