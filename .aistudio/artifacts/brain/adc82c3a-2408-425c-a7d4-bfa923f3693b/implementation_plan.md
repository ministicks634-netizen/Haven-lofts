# Haven Lofts — Salon Webpage & Licensing Portfolio

A sophisticated, editorial web application for **Haven Lofts**, an upscale boutique hair salon located in Lakeville, Minnesota, co-created by master stylists **Sarah** and **Leah**. The site is structured both to meet Minnesota Board of Cosmetology licensing establishment standards and to serve as the live client-facing hub, featuring individual stylist schedules, bio cards, direct booking/contact points, and interactive image-import placeholders ready for finished photography.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural decisions reflect the clarifications confirmed in Turn 1:
> - **Interactive Logo Slot**: Includes an intuitive logo image uploader (supports PNG, SVG, JPG with drag-and-drop or file select, saved persistently in browser `localStorage`), alongside a luxury default typographic/monogram vector mark for immediate inspection and license approval.
> - **Stylist-Centric Directory**: Dedicated spotlight cards for co-founders Sarah and Leah (plus an option to showcase additional loft chairs/stylists), with individual weekly schedules, service specialties, direct phone/SMS/email links, booking modal, and individual photo upload slots.
> - **Finished-Layout Photo Import Slots**: The site is rendered in its full luxury production layout with clean, styled photo upload containers for the hero, salon interior lofts, and stylist portraits. The salon owners can import real photos at any time with a single click, or view realistic preview dimensions.
> - **State Licensing Compliance Hub**: Dedicated establishment section presenting salon physical address in Lakeville, MN, operating permit status, sanitation & health standards, general salon contact, and operating hours.

---

### 1. Overview & Core Concept

- **What It Does**: Provides Haven Lofts with a polished, luxury salon website that satisfies commercial salon licensing requirements in Minnesota while engaging incoming clients with stylist availability, direct contact forms, service menus, and a VIP booking waitlist.
- **Target Audience / Persona**:
  - *Salon Licensing Inspectors & State Board*: Requires verifiable establishment address, owners/operators (Sarah & Leah), health/sanitation practices, operating schedule, and establishment contact details.
  - *Hair Salon Clients in Lakeville & South Metro MN*: Seeking premium cut, color, balayage, and styling services, wishing to check specific stylist schedules and reach Sarah or Leah directly.
  - *Salon Co-Creators (Sarah & Leah)*: Need an effortless way to upload the real logo and interior photos once the build-out is completed without touching code.
- **Key Value**: Professional presence for immediate salon licensing filing + seamless zero-code photo replacement capability + high-converting appointment booking channels.

---

### 2. User Experience & Visual Design

#### A. Aesthetic Direction & Palette (Black & White with Gold & Olive Green Accents)
- **60% Neutral Canvas**: Deep carbon / soft black (`#121212`, `#18181b`) and crisp ivory warm off-white (`#faf9f5`, `#ffffff`) surfaces creating a timeless, high-fashion loft editorial atmosphere.
- **30% Structural Surfaces**: Clean slate-900 / zinc-900 panels, subtle warm-gray hairline dividers (`border-stone-200 dark:border-stone-800`), and minimalist architectural framing.
- **10% Accent Accents**:
  - **Refined Gold**: Brushed metallic gold (`#c5a059`, `#d4af37`, `#e5c07b`) for luxury badges, button highlights, and active states.
  - **Earthy Olive Green**: Muted botanical olive (`#4d5d43`, `#5a6d4f`, `#384332`) for availability badges, accent borders, and natural organic tone.

#### B. Typographic Hierarchy
- **Display / Brand**: *Playfair Display* / *Cinzel* editorial serif for marquee headlines, brand wordmark, and stylist names.
- **Body & UI**: *Plus Jakarta Sans* / *DM Sans* for clean, modern readability, contact details, and schedule tables.
- **Tabular Figures**: Tabular numerals (`tabular-nums`) for daily working hours, pricing, and license numbers.

#### C. Key User Flows
1. **Top Bar & Logo Hub**:
   - Compliant 3-zone header: Clean Haven Lofts wordmark & logo slot (with hover click-to-upload button) — navigation links (*Stylists*, *Schedules*, *Services*, *Salon Lofts*, *Licensing & Location*) — primary *"Contact Stylist"* action button.
2. **Hero Presentation**:
   - Compelling editorial statement: *"Haven Lofts — An elevated hair studio founded by Sarah & Leah in Lakeville, Minnesota."*
   - Featured interactive photo frame (with ready-to-upload image slot and dimension guide).
   - Quick navigation to individual stylist hours and location.
3. **Stylist Roster & Individual Schedules (Primary Focal Point)**:
   - **Sarah (Co-Creator & Master Stylist)**: Individual portrait upload slot, bio & specialties (e.g., precision cuts, blonding & lived-in color), individual weekly hours table (Monday–Saturday), direct phone / Instagram / email contact actions, and quick message modal.
   - **Leah (Co-Creator & Master Stylist)**: Individual portrait upload slot, bio & specialties (e.g., custom balayage, extensions, dimensional brunettes), individual weekly hours table, direct contact links.
   - **Add / Preview Additional Stylist Loft Chair**: Interactive toggle to see how visiting or future loft stylists are displayed.
4. **Salon Lofts Gallery & Interior Preview**:
   - Finished gallery grid featuring 4 photo showcase cards (Reception, Styling Stations, Wash Bar, Color Lounge) with instant photo upload / replace controls and image dimensions.
5. **Services & Pricing Menu**:
   - Curated service categories: Cutting & Styling, Color & Lightening, Treatments & Extensions, Special Occasion.
   - Clear pricing ranges, service duration, and which stylist specializes in each.
6. **State Licensing & Lakeville Location Hub**:
   - Official salon details: Address in Lakeville, MN, establishment license compliance overview, sanitation & Minnesota Board of Cosmetology standards, general phone/email, parking & loft entrance notes.
7. **Direct Stylist Contact & Inquiry Drawer / Modal**:
   - Simple, frictionless contact form allowing clients or inspectors to send an inquiry directly to Sarah or Leah.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Interactive In-Browser Image Importer vs Static Placeholder Graphics**
  - *Chosen Approach*: Implement an interactive image management layer using HTML5 File API + browser `localStorage` / Object URLs. Users can click any photo slot (Logo, Sarah, Leah, Salon Interior) to immediately select and preview their real image files. We also provide a one-click "Reset" or "Load Demo Aesthetic" button.
  - *Why*: The user explicitly stated: *"Placeholder logo slot so you can upload your image later"* and *"make the website how it would be finished just with empty photos so i can import them after its done"*. Making this functional in the UI allows them to upload photos instantly right on the live preview or take screenshots for the licensing board.
  - *Alternatives Considered*: Hardcoded static SVG boxes only. Rejected because it would require manual code edits whenever photography is ready.

- **Decision 2: Individual Stylist Hours & Direct Contact Architecture**
  - *Chosen Approach*: Provide distinct cards for each stylist with day-by-day hours breakdown (e.g., Tuesday–Saturday 9am–6pm, etc.), an active "Available Today" status chip, and direct contact buttons (call, email, text/booking).
  - *Why*: Directly fulfills the user's primary requirement: *"a simple webpage that shows the hours for each individual hairstylist, each styleist will get there own photo and little description so you can contact each one"*.

- **Decision 3: Dedicated Licensing & Establishment Section**
  - *Chosen Approach*: Prominent Lakeville, MN establishment section detailing physical location, operating hours, owner-operator certifications, and salon sanitary compliance.
  - *Why*: The user highlighted that the website is needed to continue acquiring the salon license. State boards specifically look for establishment verification, operator disclosure, and physical premises location.

---

### 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                          Haven Lofts Web App                           │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
      ┌────────────────────────────┼────────────────────────────┐
      ▼                            ▼                            ▼
┌──────────────┐          ┌───────────────────┐        ┌──────────────────┐
│   Top Bar    │          │  State & Storage  │        │   Notification   │
│ 3-Zone Brand │          │ - Logo file data  │        │  Feedback System │
│ & Logo Slot  │          │ - Stylist images  │        │ (Toast alerts on │
└──────────────┘          │ - Gallery images  │        │   upload/inquiry)│
                          │ - Custom hours    │        └──────────────────┘
                          └─────────┬─────────┘
                                    │
       ┌────────────────────────────┼────────────────────────────┐
       ▼                            ▼                            ▼
┌──────────────────┐      ┌───────────────────┐        ┌──────────────────┐
│ Stylist Roster   │      │ Interior Lofts    │        │  Licensing &     │
│ - Sarah's Card   │      │ Gallery           │        │  Location Hub    │
│ - Leah's Card    │      │ - 4 Loft spaces   │        │ - Lakeville MN   │
│ - Hours per day  │      │ - Click-to-upload │        │ - State board    │
│ - Direct contact │      │ - Reset controls  │        │   compliance     │
└──────────────────┘      └───────────────────┘        └──────────────────┘
```

#### Interactive Component & State Mapping
- `useImageStore`: Manages uploaded logo, hero image, Sarah's portrait, Leah's portrait, and gallery interior photos using `localStorage` with base64 data URLs, providing instant persistence across reloads.
- `StylistCard`: Displays stylist portrait (or click-to-upload frame), name, title, specialties, weekly schedule table with toggleable compact view, and direct contact modal trigger.
- `ContactModal`: Allows visitor to select between Sarah, Leah, or General Salon inquiries, filling in name, phone, service interest, and notes, with instant confirmation toast.
- `LicensingBanner`: Professional Lakeville, MN establishment verification section with address, map anchor, and cosmetology safety standards.

---
