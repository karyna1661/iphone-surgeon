# Asset Guidelines for iPhone Surgeon Website

## Overview
This document outlines the photography, video, and media requirements for the iPhone Surgeon website to maintain a premium, professional aesthetic.

## Required Assets

### 1. Hero Section Video
**File**: `/public/videos/hero-repair-process.mp4`
**Specifications**:
- Resolution: 1920x1080 (Full HD) minimum, 4K preferred
- Duration: 30-60 seconds (looping)
- Format: MP4 (H.264 codec)
- File size: Under 10MB for web optimization
- Content: Professional iPhone repair process, clean workspace, precision tools
- Style: Cinematic, well-lit, professional grade

**Alternative**: Animated gradient background (currently implemented)

### 2. Hero Section Poster Image
**File**: `/public/images/hero-poster.webp`
**Specifications**:
- Resolution: 1920x1080
- Format: WebP (with JPEG fallback)
- Content: High-quality iPhone repair workspace
- Style: Clean, professional, well-lit

### 3. Technician Portrait
**File**: `/public/images/technician/technician-portrait.jpg`
**Specifications**:
- Resolution: 2400x3000 (4:5 aspect ratio)
- Format: JPEG (high quality)
- Content: Paul Smith working with precision tools, stereo microscope visible
- Style: Professional headshot, clean background, good lighting
- Equipment visible: Stereo microscope, precision tools, clean workspace

**Current**: Placeholder with User icon (implemented)

### 4. Gallery Images (Before/After)
**Directory**: `/public/images/gallery/`
**Specifications**:
- Resolution: 2400x1600 minimum
- Format: WebP (with JPEG fallback)
- Content: High-contrast before/after iPhone repairs
- Style: Consistent lighting, clean backgrounds, professional quality
- Naming convention: `repair-[type]-before.webp`, `repair-[type]-after.webp`

**Examples needed**:
- Screen repairs
- Battery replacements
- Water damage restoration
- Camera repairs
- Charging port fixes

### 5. Favicon and Icons
**Files**:
- `/public/favicon.ico` (16x16, 32x32)
- `/public/icon-16x16.png`
- `/public/icon-32x32.png`
- `/public/apple-touch-icon.png` (180x180)
- `/public/safari-pinned-tab.svg`

**Design**: "IS" monogram in primary blue (#0071E3) on transparent background

### 6. Social Media Images
**Files**:
- `/public/images/og-image.webp` (1200x630)
- `/public/images/twitter-image.webp` (1200x630)
- `/public/images/logo.webp` (400x400)

## Photography Guidelines

### Lighting Requirements
- **Primary**: Soft, diffused lighting to avoid harsh shadows
- **Workspace**: Clean, well-lit environment with professional equipment visible
- **Color temperature**: 5500K-6500K (daylight balanced)
- **Avoid**: Harsh shadows, overexposed highlights, poor color balance

### Composition Guidelines
- **Rule of thirds**: Position key elements using the rule of thirds
- **Depth of field**: Use shallow depth of field to focus on repair work
- **Clean backgrounds**: Minimal distractions, professional environment
- **Consistent angles**: Maintain consistent camera angles for before/after shots

### Technical Requirements
- **Camera**: DSLR or mirrorless camera with good low-light performance
- **Lens**: 50mm or 85mm prime lens for portraits, macro lens for detail shots
- **Tripod**: Use tripod for consistent framing in before/after sequences
- **Post-processing**: Professional color grading, consistent exposure

## Video Production Guidelines

### Hero Video Content
1. **Opening**: Wide shot of clean, professional workspace
2. **Process**: Close-up shots of precision repair work
3. **Tools**: Stereo microscope, precision tools, clean workspace
4. **Result**: Before/after reveal, satisfied customer
5. **Closing**: Professional signature or logo

### Technical Specifications
- **Frame rate**: 24fps or 30fps
- **Codec**: H.264 for web compatibility
- **Bitrate**: 5-8 Mbps for web optimization
- **Audio**: Optional, ambient sounds or subtle background music

## Content Guidelines

### Before/After Photography
- **Consistent lighting**: Same lighting setup for before and after
- **Same angle**: Identical camera position and framing
- **Clean backgrounds**: Remove distractions, focus on device
- **High contrast**: Clear visual difference between before and after
- **Professional quality**: Sharp focus, proper exposure, good color balance

### Technician Photography
- **Professional attire**: Clean, professional appearance
- **Equipment visible**: Stereo microscope, precision tools
- **Confident pose**: Professional, trustworthy appearance
- **Clean workspace**: Organized, professional environment
- **Good lighting**: Even, professional lighting setup

## File Organization

```
public/
├── images/
│   ├── gallery/
│   │   ├── screen-repair-before.webp
│   │   ├── screen-repair-after.webp
│   │   ├── battery-replacement-before.webp
│   │   └── battery-replacement-after.webp
│   ├── technician/
│   │   └── technician-portrait.jpg
│   ├── og-image.webp
│   ├── twitter-image.webp
│   └── logo.webp
├── videos/
│   └── hero-repair-process.mp4
├── favicon.ico
├── icon-16x16.png
├── icon-32x32.png
├── apple-touch-icon.png
└── safari-pinned-tab.svg
```

## Quality Standards

### Image Quality Checklist
- [ ] Sharp focus throughout the image
- [ ] Proper exposure (no blown highlights or crushed shadows)
- [ ] Good color balance and saturation
- [ ] Clean, professional composition
- [ ] Consistent style across all images
- [ ] Optimized file sizes for web

### Video Quality Checklist
- [ ] Smooth, professional camera movement
- [ ] Consistent lighting throughout
- [ ] Clear, sharp focus
- [ ] Professional color grading
- [ ] Optimized for web delivery
- [ ] Engaging, professional content

## Implementation Notes

### Current Status
- ✅ Animated gradient background implemented for hero section
- ✅ Placeholder technician image with professional styling
- ✅ Glassmorphism effects for missing images
- ✅ Responsive design for all screen sizes
- ✅ WebP format support with fallbacks

### Next Steps
1. **Priority 1**: Technician portrait photography
2. **Priority 2**: Hero video production
3. **Priority 3**: Gallery before/after images
4. **Priority 4**: Social media assets
5. **Priority 5**: Favicon and icon set

## Contact Information
For questions about asset requirements or to submit new assets, contact the development team.

---
*Last updated: [Current Date]*
*Version: 1.0*
