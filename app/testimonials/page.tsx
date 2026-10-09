import { Suspense } from "react";
import TestimonialsList from "./TestimonialsList";

export default function TestimonialsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-customLightBlue to-customVeryLightBlue">
          <div className="h-12 w-12 animate-spin rounded-full border-2 border-customBlue1 border-t-transparent" />
        </div>
      }
    >
      <TestimonialsList />
    </Suspense>
  );
}
