# 🛒 বাজার দর (Bazar Dor)

বাজার দর একটি বাংলাদেশি বাজারমূল্য পর্যবেক্ষণ ওয়েব অ্যাপ্লিকেশন। এর মাধ্যমে ব্যবহারকারীরা নিত্যপ্রয়োজনীয় পণ্যের দাম, বিভিন্ন ক্যাটাগরি এবং বাজারভিত্তিক মূল্য সহজে দেখতে পারবেন।

## 🔗 Project Overview

Bazar Dor helps users explore everyday market prices through a simple, responsive interface. Users can browse product categories, compare prices, view product details, and manage their account.

## ✨ Features

- **Product Categories:** চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ ও মসলার মতো ক্যাটাগরি ব্রাউজ করা।
- **Product Price Information:** পণ্যের বর্তমান ও আগের দামের তথ্য দেখা।
- **Price Highlights:** যেসব পণ্যের দাম বাড়ছে বা কমছে, সেগুলো সহজে খুঁজে পাওয়া।
- **Product Details:** পণ্যের বিস্তারিত তথ্য, একক এবং বাজারভিত্তিক মূল্য দেখা।
- **Sorting:** ক্যাটাগরির পণ্য ডিফল্ট, কম দাম থেকে বেশি দাম অথবা বেশি দাম থেকে কম দাম অনুযায়ী সাজানো।
- **Authentication:** ইমেইল ও পাসওয়ার্ড দিয়ে নিবন্ধন এবং লগইন।
- **Social Login:** Google ও GitHub দিয়ে লগইন (কনফিগারেশন অনুযায়ী)।
- **User Profile:** নিজের প্রোফাইল দেখা এবং নাম পরিবর্তন করা।
- **Responsive Design:** মোবাইল, ট্যাবলেট ও ডেস্কটপে ব্যবহারযোগ্য ডিজাইন।
- **Loading and Not Found States:** ডেটা লোড হওয়ার সময় skeleton এবং অনুপস্থিত পেজের জন্য 404 UI।

## 🧰 Technologies Used

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- DaisyUI
- Better Auth
- MongoDB
- Sonner (toast notifications)
- Git and GitHub

## ⚙️ Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB connection
- Required API and authentication credentials

### Installation

1. Clone the repository:

   bash
   git clone YOUR_GITHUB_REPOSITORY_URL
   

2. Open the project folder:

   bash
   cd bazar-dor
   

3. Install dependencies:

   bash
   npm install
   

4. Create a `.env` file in the project root and configure the required environment variables.

   Keep all secrets private. Do not commit `.env` to GitHub.

5. Start the development server:

   bash
   npm run dev
   

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔐 Environment Variables

Configure the variables required by your application in `.env`. These may include:

- `MONGODB_URI`
- `BETTER_AUTH_URL`
- `BETTER_AUTH_SECRET`
- `NEXT_PUBLIC_BETTER_AUTH_URL`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`

Use the exact variable names expected by your application. Never publish real secret values.

## 📁 Project Structure


src/
└── app/
    ├── components/
    ├── api/
    │   └── auth/
    ├── category/
    ├── product/
    ├── profile/
    │   └── update/
    ├── login/
    ├── register/
    ├── layout.tsx
    ├── page.tsx
    └── not-found.tsx


## 🚀 Deployment

The application can be deployed on Vercel.

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Add all required environment variables in Vercel project settings.
4. Deploy the application.
5. Update authentication callback URLs and allowed origins to match the deployed domain.
6. Test product pages, authentication, profile updates, and 404 handling on the deployed site.

## ⚠️ Disclaimer

Market prices are indicative and may change depending on market conditions. Verify prices locally before making purchasing decisions.

## 👩‍💻 Author

Developed as a web development assignment.
