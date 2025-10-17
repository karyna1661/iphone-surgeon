<!-- 031305cd-b99a-48b0-9229-24f0cbe53db0 dd93ac7b-d156-4f1e-837a-b37b3af8d6c9 -->
# Fix iPhone Surgeon Configuration & Dependencies

## Problem Analysis

Three critical issues preventing the website from working:

1. **Missing .env.local file** - Sanity is falling back to "demo-project-id" instead of "1q42p9pa"
2. **Next.js dependency corruption** - Module 'next/dist/compiled/loader-runner' not found
3. **File locks on node_modules** - Running dev server holding file locks

## Implementation Plan

### Step 1: Stop All Running Processes

Kill any running dev servers that are holding file locks on node_modules.

**Action:** Close all terminal windows or press Ctrl+C on any running `npm run dev` processes.

### Step 2: Create Missing .env.local File

The root cause of Sanity errors is the missing `.env.local` file. The client configuration at `lib/sanity/client.ts:13` falls back to 'demo-project-id' when the environment variable is missing.

**Create:** `.env.local`

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=1q42p9pa
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-03-15
NEXT_PUBLIC_SITE_URL=http://localhost:3001
NEXT_PUBLIC_WHATSAPP_NUMBER=2348137676117
NEXT_PUBLIC_BUSINESS_NAME=iPhone Surgeon
NEXT_PUBLIC_INSTAGRAM_HANDLE=@TheiPhoneSurgeon
```

This will fix both the Sanity client and the Studio configuration immediately.

### Step 3: Clean Node Modules (Careful Approach)

After stopping all processes, remove node_modules directory.

**Commands:**

```powershell
# Wait 5 seconds for processes to fully release file handles
Start-Sleep -Seconds 5

# Force remove with all possible flags
Remove-Item -Path "node_modules" -Recurse -Force -ErrorAction SilentlyContinue

# If still fails, use robocopy to purge (Windows-specific workaround)
robocopy node_modules node_modules_empty /MIR
Remove-Item -Path "node_modules" -Force
Remove-Item -Path "node_modules_empty" -Force
```

### Step 4: Clear Build Cache

Remove Next.js build cache that might be causing issues.

**Commands:**

```powershell
Remove-Item -Path ".next" -Recurse -Force -ErrorAction SilentlyContinue
npm cache clean --force
```

### Step 5: Fresh Dependency Install

Install all dependencies from scratch.

**Command:**

```bash
npm install
```

**Expected packages (from package.json):**

- next@^14.2.0
- react@^18.3.0
- @sanity/client@^6.15.0
- sanity@^3.37.0
- All UI dependencies (lucide-react, tailwind, etc.)

### Step 6: Verify Environment Variables

Check that environment variables are properly loaded.

**Test command:**

```bash
npm run dev
```

**What to verify:**

- Server starts on port 3001
- No "demo-project-id" errors in console
- Homepage loads at http://localhost:3001
- All sections render (Hero, Gallery, Testimonials, etc.)

### Step 7: Test Studio Access

Verify Studio works without 500 errors.

**Navigate to:** http://localhost:3001/studio

**Expected behavior:**

- Studio loads successfully
- Shows "iPhone Surgeon CMS" interface
- Can access Gallery, Testimonial, Service content types
- No metadata/viewport import errors

### Step 8: Add .env.local to .gitignore

Ensure sensitive environment variables aren't committed.

**Update:** `.gitignore`

```
node_modules/
.next/
.env.local
.env*.local
*.log
.DS_Store
```

### Step 9: Commit Fixed Configuration

Once everything works locally, commit the fixes.

**Commands:**

```bash
git add .
git commit -m "fix: add missing .env.local configuration and fix dependencies

- Created .env.local with correct Sanity project ID (1q42p9pa)
- Fixed 'demo-project-id' fallback issue in Sanity client
- Cleaned and reinstalled corrupted dependencies
- Verified homepage and Studio load without errors
- Added .env.local to .gitignore for security"

git push origin master
```

## Files Modified

1. `.env.local` (CREATE) - Environment variables with correct Sanity project ID
2. `.gitignore` (UPDATE) - Add .env.local exclusion
3. `node_modules/` (REBUILD) - Fresh install after corruption fix

## Files Already Correct

- `lib/sanity/client.ts` - Already has fallback logic, just needs env var
- `sanity/sanity.config.ts` - Already reads from env var
- `app/studio/[[...index]]/page.tsx` - Already has correct imports (no metadata/viewport)

## Current Status (Updated)

✅ **Completed:**

- Stopped all Node processes
- Created .env.local with correct Sanity project ID (1q42p9pa)
- Cleaned node_modules and .next cache
- npm cache cleaned

⚠️ **Network Issues Encountered:**

- npm install failed with ECONNRESET and ETIMEDOUT errors
- Partial installation completed - many packages installed but incomplete
- `npx next` using v15.5.6 from global cache, missing `critters` dependency

## Updated Strategy

Since network is unstable, we'll take a pragmatic approach:

1. **Install missing critters package directly**
2. **Use local node_modules/next binary instead of npx**
3. **Test if website works with current partial installation**
4. **Fix any remaining missing packages one by one**

## Success Criteria

- No "demo-project-id" errors in console
- Homepage loads with all sections visible
- Studio accessible at /studio without 500 errors
- All Sanity queries work correctly
- Dev server starts without module errors
- Changes committed to GitHub

## Estimated Time

- Stop processes: 1 min
- Create .env.local: 2 min
- Clean dependencies: 5 min
- Reinstall: 5-10 min (network dependent)
- Testing: 5 min
- Commit: 2 min
- **Total: 20-25 minutes**

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