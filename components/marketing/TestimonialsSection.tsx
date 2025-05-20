import React from "react";
import { AUTHOR_NAME } from "@/constants";

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="w-full py-12 md:py-24 bg-slate-50 flex justify-center"
    >
      <div className="container px-4 md:px-6 flex flex-col items-center">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Loved by Thousands
            </h2>
            <p className="max-w-[700px] text-slate-500 md:text-xl">
              See what our users have to say about our form app.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          <div className="flex flex-col justify-between rounded-lg border p-6 shadow-sm bg-white">
            <div className="space-y-2">
              <p className="text-slate-500">
                &ldquo;This form app has completely transformed how we collect
                data. It&rsquo;s so easy to use and the analytics are
                incredible.&rdquo;
              </p>
            </div>
            <div className="flex items-center gap-4 pt-4">
              <div className="rounded-full bg-slate-100 p-1">
                <div className="h-8 w-8 rounded-full bg-slate-200" />
              </div>
              <div>
                <p className="text-sm font-medium">{AUTHOR_NAME}</p>
                <p className="text-xs text-slate-500">Engineering Director</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between rounded-lg border p-6 shadow-sm bg-white">
            <div className="space-y-2">
              <p className="text-slate-500">
                &ldquo;I&rsquo;ve tried many form builders, but this one stands
                out. The templates saved me hours of work.&rdquo;
              </p>
            </div>
            <div className="flex items-center gap-4 pt-4">
              <div className="rounded-full bg-slate-100 p-1">
                <div className="h-8 w-8 rounded-full bg-slate-200" />
              </div>
              <div>
                <p className="text-sm font-medium">{AUTHOR_NAME}</p>
                <p className="text-xs text-slate-500">Small Business Owner</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between rounded-lg border p-6 shadow-sm bg-white">
            <div className="space-y-2">
              <p className="text-slate-500">
                &ldquo;The customer support is exceptional. Any time I&rsquo;ve
                had a question, they&rsquo;ve been quick to respond.&rdquo;
              </p>
            </div>
            <div className="flex items-center gap-4 pt-4">
              <div className="rounded-full bg-slate-100 p-1">
                <div className="h-8 w-8 rounded-full bg-slate-200" />
              </div>
              <div>
                <p className="text-sm font-medium">{AUTHOR_NAME}</p>
                <p className="text-xs text-slate-500">Freelance Designer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
