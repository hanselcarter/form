import TestimonialsSection from "@/components/marketing/TestimonialsSection";

export default function HomePage() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6 mx-auto max-w-3xl">
            <div className="flex flex-col items-center text-center space-y-8">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Hello, Welcome to this Amazing Form App
              </h1>
              <p className="text-xl text-slate-600">
                Create beautiful, responsive forms in minutes. Our simple form
                builder helps you collect data and gather feedback.
              </p>
            </div>
          </div>
        </section>
        <TestimonialsSection />
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
