# Next.js App Router Migration Guide

इस प्रोजेक्ट को नेक्स्ट.जेएस (Next.js 14+ / 15 App Router) में सीधे इस्तेमाल करने के लिए निम्न संरचना (Directory Structure) का उपयोग करें:

```
my-nextjs-app/
├── app/
│   ├── layout.tsx         # Global layout with Header, Footer, FloatingActions, Fonts
│   ├── page.tsx           # Home Page (Hero, Darshan, Festival, Events, News, Panchang)
│   ├── about/
│   │   └── page.tsx       # 'हमारे बारे में' (About Us)
│   ├── bhajans/
│   │   ├── page.tsx       # 'श्याम भजन संग्रह' (Bilingual search & filter)
│   │   └── [id]/
│   │       └── page.tsx   # Bhajan Detail view with lyrics, stanzas, copy, share, print
│   ├── aarti/
│   │   └── page.tsx       # 'श्री श्याम आरती'
│   ├── stuti/
│   │   └── page.tsx       # 'श्री श्याम स्तुति'
│   └── contact/
│       └── page.tsx       # 'संपर्क करें' (Contact form, map, FAQs)
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── FallingFlowers.tsx
│   ├── FloatingActions.tsx
│   └── Toast.tsx
├── data/
│   ├── bhajans.ts
│   └── siteData.ts
└── types.ts
```

### Next.js `app/layout.tsx` उदाहरण:
```tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'श्री श्याम जगत मंडल | भक्ति, भजन, आरती एवं सेवा',
  description: 'श्री श्याम जगत मंडल के साथ जुड़ें। श्री श्याम बाबा के दैनिक दर्शन, भजन, आरती, स्तुति, धार्मिक आयोजन, समाचार एवं सेवा कार्यों की जानकारी प्राप्त करें।'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hi">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </head>
      <body className="bg-[#0b1a33] text-white">
        {children}
      </body>
    </html>
  );
}
```
