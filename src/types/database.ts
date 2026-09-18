// Hand-authored stand-in for `npx supabase gen types typescript`.
// Once the project is linked to a real Supabase instance, regenerate this
// file from the live schema instead of editing it by hand.

export type UserRole = "super_admin" | "admin" | "editor";

export type EnquiryStatus =
  | "new"
  | "contacted"
  | "visit_scheduled"
  | "visited"
  | "application"
  | "admitted"
  | "closed";

export type VisitStatus =
  | "requested"
  | "confirmed"
  | "rescheduled"
  | "completed"
  | "cancelled";

export interface SiteSettings {
  id: string;
  school_name: string;
  tagline: string | null;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  postal_code: string | null;
  latitude: number | null;
  longitude: number | null;
  facebook_url: string | null;
  instagram_url: string | null;
  youtube_url: string | null;
  google_business_url: string | null;
  logo_url: string | null;
  favicon_url: string | null;
  hero_image_url: string | null;
  default_meta_title: string | null;
  default_meta_description: string | null;
  created_at: string;
  updated_at: string;
}

export interface Program {
  id: string;
  slug: string;
  name: string;
  short_description: string | null;
  description: string | null;
  age_min: number | null;
  age_max: number | null;
  duration: string | null;
  timing: string | null;
  image: string | null;
  highlights: string[] | null;
  learning_focus: string[] | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Enquiry {
  id: string;
  parent_name: string;
  child_name: string;
  child_dob: string | null;
  phone: string;
  email: string | null;
  area: string | null;
  program_id: string | null;
  preferred_contact_method: string | null;
  message: string | null;
  source: string | null;
  status: EnquiryStatus;
  assigned_to: string | null;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface SchoolVisit {
  id: string;
  parent_name: string;
  child_name: string | null;
  child_age: number | null;
  phone: string;
  email: string | null;
  program_id: string | null;
  preferred_date: string;
  preferred_time: string | null;
  status: VisitStatus;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
}

// Additional tables (activities, gallery_items, events, testimonials, faqs,
// announcements, contact_messages, seo_pages, admin_audit_logs) follow the
// same shape as their SQL definitions in supabase/migrations/ and should be
// added here as each admin module is built.
