-- Safe seed data. Clearly-marked placeholders only.
-- Do NOT add fabricated testimonials, review counts, student numbers, or awards here.

-- Contact/hours sourced from the school's own ProEves listing (see
-- SOURCE-NOTES.md). Street address left unresolved — ProEves and
-- magicpin/EduTribe give two different streets for the same Nanmangalam /
-- 600129 area, so the exact address needs confirming with the school.
insert into site_settings (school_name, tagline, phone, email, city, state, country, address, facebook_url)
values (
  'Wings Foundation School',
  'Where Little Wings Learn to Fly',
  '9176702161',
  'wingsfoundationschool@gmail.com',
  'Chennai',
  'Tamil Nadu',
  'India',
  'Nanmangalam, Chennai, Tamil Nadu - 600129 [EXACT STREET ADDRESS TO BE CONFIRMED — see SOURCE-NOTES.md]',
  'https://www.facebook.com/profile.php?id=100065012619222'
);

insert into programs (slug, name, short_description, age_min, age_max, timing, display_order)
values
  ('preschool', 'Preschool', 'Play-based early learning, Monday to Friday.', 3, 6, '9:00 AM - 12:00 Noon, Mon-Fri', 1),
  ('daycare', 'Daycare', 'Full-day and half-day care with meals, activities and CCTV-monitored, air-conditioned rooms.', 3, 8, '9:00 AM - 7:00 PM, Mon-Fri', 2);
-- Fee structure, curriculum/board affiliation, and exact age cutoffs in
-- years vs. "2.5" style ranges are not published anywhere verifiable —
-- confirm with the school before publishing on the live site.

insert into activity_categories (name, slug, display_order) values
  ('Arts & Crafts', 'arts-crafts', 1),
  ('Music', 'music', 2),
  ('Dance', 'dance', 3),
  ('Storytelling', 'storytelling', 4),
  ('Gardening', 'gardening', 5),
  ('Indoor Play', 'indoor-play', 6),
  ('Outdoor Play', 'outdoor-play', 7),
  ('Events', 'events', 8);

insert into gallery_categories (name, slug, display_order) values
  ('Campus', 'campus', 1),
  ('Classrooms', 'classrooms', 2),
  ('Activities', 'activities', 3),
  ('Events', 'events', 4),
  ('Celebrations', 'celebrations', 5),
  ('Learning', 'learning', 6),
  ('Outdoor', 'outdoor', 7);

insert into faqs (question, answer, display_order) values
  ('What age groups do you accept?', 'Preschool welcomes children from about 2.5 to 6 years old; daycare accepts children from about 2.5 to 8 years old.', 1),
  ('What are your school timings?', 'Preschool runs 9:00 AM to 12:00 Noon, Monday to Friday. Daycare runs 9:00 AM to 7:00 PM, Monday to Friday.', 2),
  ('Do you offer daycare?', 'Yes — full-time, half-time, on-demand hourly, and assisted (with nanny) daycare options are available. [FEES TO BE CONFIRMED]', 3),
  ('How do I schedule a school visit?', 'You can book a visit from the "Book a School Visit" page, or reach us on WhatsApp.', 4);

-- No testimonials, no fake ratings, no invented student/staff counts.
