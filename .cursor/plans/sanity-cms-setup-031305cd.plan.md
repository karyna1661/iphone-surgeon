<!-- 031305cd-b99a-48b0-9229-24f0cbe53db0 a21d47d3-d1e1-4365-9271-53834a9fcca7 -->
# Complete Project Restoration & GitHub Commit

## Phase 1: Fix Dependencies & Foundation (5-10 min)

### Step 1: Clean Install
- Delete corrupted node_modules
- Clear npm cache
- Reinstall all dependencies
- Verify installation success

### Step 2: Create Missing Directories
```
components/
  ui/
  sections/
  layout/
lib/
  hooks/
  sanity/
sanity/
  schemas/
```

## Phase 2: Recreate Components (20-30 min)

### UI Components (Priority Order)
1. `components/ui/Button.tsx` - Magnetic hover, ripple, 4 variants
2. `components/ui/Card.tsx` - Glass/bordered/elevated, 3D tilt
3. `components/ui/Container.tsx` - Max-width wrapper
4. `components/ui/Section.tsx` - Spacing wrapper
5. `components/ui/Input.tsx` - Form input with validation
6. `components/ui/Textarea.tsx` - Multi-line input
7. `components/ui/Checkbox.tsx` - Checkbox component
8. `components/ui/BeforeAfterSlider.tsx` - Interactive slider with drag
9. `components/ui/index.ts` - Export all UI components

### Section Components
1. `components/sections/Hero.tsx` - Video background, CTAs
2. `components/sections/Gallery.tsx` - Before/after showcase
3. `components/sections/Testimonials.tsx` - Client quotes
4. `components/sections/Services.tsx` - Repair services with icons
5. `components/sections/BehindTheBench.tsx` - Personal story
6. `components/sections/Booking.tsx` - Contact form with WhatsApp
7. `components/sections/Footer.tsx` - Business info, QR code
8. `components/sections/index.ts` - Export all sections

### Layout Components
1. `components/layout/PageWrapper.tsx` - Page layout wrapper
2. `components/layout/index.ts` - Export layout components

### Utility Components
1. `components/PerformanceMonitor.tsx` - Dev performance tracking
2. `components/MobileTestingPanel.tsx` - QR code testing
3. `components/QRCodeGenerator.tsx` - QR code generator
4. `components/ErrorBoundary.tsx` - Error handling

## Phase 3: Recreate Library Files (10-15 min)

### Constants & Utilities
1. `lib/constants.ts` - Business info, contact details
2. `lib/utils.ts` - Utility functions (cn, generateWhatsAppLink, etc.)
3. `lib/fonts.ts` - Font configuration
4. `lib/galleryData.ts` - Gallery fallback data
5. `lib/servicesData.ts` - Services fallback data
6. `lib/testimonialsData.ts` - Testimonials fallback data

### Custom Hooks
1. `lib/hooks/useIntersectionObserver.ts` - Scroll animations
2. `lib/hooks/index.ts` - Export hooks

### Sanity Integration
1. `lib/sanity/client.ts` - Sanity client setup
2. `lib/sanity/queries.ts` - GROQ queries
3. `lib/sanity/types.ts` - TypeScript types
4. `lib/sanity/imageUrlBuilder.ts` - Image URL builder

## Phase 4: Recreate Sanity Schemas (5-10 min)

1. `sanity/sanity.config.ts` - Sanity configuration
2. `sanity/sanity.cli.ts` - CLI configuration
3. `sanity/schemas/gallery.ts` - Gallery content type
4. `sanity/schemas/testimonial.ts` - Testimonial content type
5. `sanity/schemas/service.ts` - Service content type
6. `sanity/schemas/index.ts` - Export schemas

## Phase 5: Create Studio Page (FIXED) (5 min)

1. Create `app/studio/[[...index]]/` directory
2. Create `app/studio/[[...index]]/page.tsx` with **CORRECT imports**:
```typescript
import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity/sanity.config'

export const dynamic = 'force-dynamic'
export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  return <NextStudio config={config} />
}
```

## Phase 6: Install Missing Dependencies (5 min)

Install Mux dependencies to fix Studio errors:
```bash
npm install @mux/mux-video @mux/mux-video-react hls.js react-is
```

## Phase 7: Update Main Page (5 min)

Replace placeholder `app/page.tsx` with full homepage importing all sections from Sanity.

## Phase 8: Testing (5-10 min)

1. Start dev server: `npm run dev`
2. Test homepage loads at `localhost:3001`
3. Test Studio loads at `localhost:3001/studio`
4. Verify no console errors
5. Check all sections render properly

## Phase 9: Git Commit & Push (5 min)

### Initialize Git (if needed)
```bash
git init
git remote add origin <your-repo-url>
```

### Create .gitignore
```
node_modules/
.next/
.env.local
*.log
.DS_Store
```

### Commit Everything
```bash
git add .
git commit -m "feat: complete iPhone Surgeon website with Sanity CMS integration

- Added all UI components (Button, Card, Input, etc.)
- Added all sections (Hero, Gallery, Testimonials, Services, etc.)
- Integrated Sanity CMS for content management
- Fixed Studio errors with correct imports
- Added scroll animations and glassmorphism effects
- Implemented before/after image sliders
- Added WhatsApp booking integration
- Configured SEO and metadata
- Added performance monitoring tools"

git push -u origin main
```

## Success Criteria

- ✅ All dependencies installed without errors
- ✅ All components recreated from conversation history
- ✅ Dev server starts successfully
- ✅ Homepage displays all sections
- ✅ Studio loads without 500 errors
- ✅ Sanity CMS integration works
- ✅ Same beautiful design restored
- ✅ Code committed to GitHub

## Files Created Count

- **UI Components**: 9 files
- **Section Components**: 8 files  
- **Layout Components**: 2 files
- **Utility Components**: 4 files
- **Library Files**: 10 files
- **Sanity Files**: 8 files
- **Config Files**: Already done
- **Total**: ~41 files to recreate

## Estimated Total Time

- Phase 1: 10 min
- Phase 2: 30 min
- Phase 3: 15 min
- Phase 4: 10 min
- Phase 5: 5 min
- Phase 6: 5 min
- Phase 7: 5 min
- Phase 8: 10 min
- Phase 9: 5 min
- **Total**: 95 minutes (~1.5 hours)

## Note

Every file will be recreated **exactly** as it was from the conversation history. You'll get back the same beautiful, polished iPhone Surgeon website you loved! 🚀

### To-dos

- [ ] Clean install dependencies - remove node_modules, clear cache, npm install
- [ ] Create all missing directory structure (components/, lib/, sanity/)
- [ ] Recreate all 9 UI components (Button, Card, Input, Textarea, Checkbox, Container, Section, BeforeAfterSlider, index)
- [ ] Recreate all 8 section components (Hero, Gallery, Testimonials, Services, BehindTheBench, Booking, Footer, index)
- [ ] Recreate layout components (PageWrapper, index)
- [ ] Recreate utility components (PerformanceMonitor, MobileTestingPanel, QRCodeGenerator, ErrorBoundary)
- [ ] Recreate all lib files (constants, utils, fonts, data files, hooks, sanity integration)
- [ ] Recreate Sanity schemas and configuration
- [ ] Create Studio page with CORRECT imports (no more 500 errors)
- [ ] Install missing Mux dependencies (@mux/mux-video, @mux/mux-video-react, hls.js, react-is)
- [ ] Update app/page.tsx with full homepage importing all sections
- [ ] Start dev server and verify homepage and Studio load without errors
- [ ] Initialize git, create .gitignore, commit all files, and push to GitHub