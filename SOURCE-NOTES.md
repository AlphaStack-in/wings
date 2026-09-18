# Source notes — Wings Foundation School public listings

Pulled from the sources named in the spec. Facebook and Justdial blocked
automated fetches (bot detection / robots.txt) — their content was not
retrievable. No third-party photos were downloaded or reused, per the
spec's own rule; the site still uses editable placeholders for images.

## Reasonably consistent across sources (ProEves + magicpin agree on area/pincode)

- Established: 2020 (ProEves)
- Contact: Diana Yovan · 9176702161 · wingsfoundationschool@gmail.com (ProEves — self-reported by the centre)
- Facebook: facebook.com/profile.php?id=100065012619222
- Hours: Preschool 9:00 am–12:00 Noon, Daycare 9:00 am–7:00 pm, Mon–Fri (ProEves)
- Ages: Preschool 2.5–6 yrs, Daycare 2.5–8 yrs (ProEves)
- Capacity: Preschool 50, Daycare 10 (ProEves)
- Services: Preschool, Full/Half-time Daycare, Assisted Daycare (with nanny), On-demand hourly daycare (ProEves)
- Facilities mentioned: extended hours, meals, CCTV + live video access, AC rooms, daily monitoring reports, activity classes (crafts, painting, pottery) (ProEves)
- Location: Nanmangalam, Chennai, pincode 600129 (ProEves + magicpin agree on pincode)

## Conflict worth resolving with the school directly

- **Street address differs between sources.** ProEves lists "Sathya
  Showroom, 10,489, Medavakkam Main Road, Nanmangalam." magicpin/EduTribe
  list "Before Deepika Aariworks, onto Nehru Nagar Main Rd, 4/154,
  Thulukanathamman Koil St." Both agree on Nanmangalam/pincode 600129, but
  the street-level detail doesn't match — possibly an old vs. current
  location, or a nearby landmark used differently by each aggregator. Left
  as `[ADDRESS TO BE CONFIRMED]` in `site_settings` rather than guessing.
- **magicpin's phone number and "5.0 (80 reviews)" rating** are likely a
  magicpin call-tracking/proxy number and aggregator-side rating, not a
  verified school rating — not used anywhere in the site. Per the spec's
  testimonials rule, no rating is shown unless it comes from a specific,
  linkable, attributable review.

## Explicitly NOT used (spec section 75 — never fabricate)

- Fees, curriculum/board affiliation, staff/teacher counts, awards,
  transport cost, and anything from EduTribe's "Profile inferred" section —
  EduTribe labels that content itself as AI-inferred, not school-confirmed,
  so none of it went into the codebase.

## What changed in the codebase from this research

- `supabase/seed.sql`: real hours, age ranges, and service names for the
  Preschool/Daycare programs; contact email/phone/Facebook in
  `site_settings`; FAQ answers for "what ages" and "what timings."
- Address stays a placeholder until you confirm which of the two street
  addresses (or a newer one) is current.
