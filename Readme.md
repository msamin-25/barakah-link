# BarakahLink

A community-driven food sharing platform connecting local food surplus with those in need in Kitchener-Waterloo.

## Features

- 🗺️ Interactive map view of available food donations
- 📱 SMS-based access for low-barrier entry
- 🍽️ Donor dashboard for posting food donations
- 🤖 AI-powered food description analysis using Google Gemini
- 🏷️ Dietary tag filtering (Halal, Vegan, Vegetarian, etc.)

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Leaflet Maps
- Google Gemini AI

## Development

### Prerequisites

- Node.js 20 or later
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd Barakah-link
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

4. Add your Gemini API key to `.env`:
```
VITE_GEMINI_API_KEY=your_api_key_here
GEMINI_API_KEY=your_api_key_here
```

**Note:** The app supports both `VITE_GEMINI_API_KEY` and `GEMINI_API_KEY` for compatibility.

Get your API key from [Google AI Studio](https://aistudio.google.com/apikey)

5. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Deployment to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Go to [Vercel](https://vercel.com)** and sign in with your GitHub account

3. **Click "Add New Project"** and import your repository

4. **Configure the project**:
   - Framework Preset: **Vite** (should auto-detect)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `dist` (default)
   - Install Command: `npm install` (default)

5. **Add Environment Variables**:
   - Go to "Environment Variables" section
   - Add `VITE_GEMINI_API_KEY` with your API key value (recommended)
   - Also add `GEMINI_API_KEY` with the same value (for compatibility)
   - Make sure both are available for Production, Preview, and Development

6. **Click "Deploy"**

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Add environment variables**:
   ```bash
   vercel env add VITE_GEMINI_API_KEY
   vercel env add GEMINI_API_KEY
   ```
   Enter your API key when prompted for both.

5. **Deploy to production**:
   ```bash
   vercel --prod
   ```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GEMINI_API_KEY` | Google Gemini API key for AI analysis (recommended) | Yes |
| `GEMINI_API_KEY` | Google Gemini API key (fallback, also required) | Yes |

## Project Structure

```
├── components/          # React components
├── frontend/           # Frontend views
├── backend/            # Client-side backend logic
├── services/           # External service integrations
├── constant.ts         # Constants and configuration
├── vite.config.ts      # Vite configuration
└── vercel.json         # Vercel deployment config
```

## Build

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```
