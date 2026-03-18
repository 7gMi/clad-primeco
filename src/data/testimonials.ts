export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  text: string;
}

// Replace with real client testimonials. The section is hidden on the
// homepage when this array is empty.
export const testimonials: Testimonial[] = [];
