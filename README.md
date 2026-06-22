# CBSE Study Hub 📚

Your AI tutor + focus planner for CBSE Class 9-12 students.

## Features

- **AI Tutor** powered by Claude – Ask any CBSE doubt, get step-by-step explanations
- **Focus Planner** – Build a study streak, track daily tasks, block distractions
- **CBSE-First** – Every answer aligns to NCERT curriculum
- **Neo-Brutalist Design** – Clean, bold, distraction-free UI
- **Google Sign-in** – One-click authentication

## Tech Stack

- **Frontend**: React 18 + Vite + Tailwind CSS
- **Routing**: React Router v6
- **API**: Axios with interceptors
- **UI Components**: Lucide React icons
- **Notifications**: Sonner toast library
- **Fonts**: Outfit (display), Figtree (body), JetBrains Mono (code)

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/animeshsharma736-stack/cbse-study-hub.git
cd cbse-study-hub

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your API URL (default: http://localhost:3001/api)
```

### Development

```bash
npm run dev
```

The app will run at `http://localhost:5173`

### Build

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Preview

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Layout.jsx          # Main layout wrapper
│   ├── AuthCallback.jsx    # OAuth callback handler
│   └── ...
├── pages/
│   ├── Home.jsx            # Landing page
│   ├── Tutor.jsx           # AI tutor interface
│   ├── Focus.jsx           # Task planner
│   ├── Ratings.jsx         # Reviews page
│   └── About.jsx           # About page
├── context/
│   └── AuthContext.jsx     # Auth state management
├── lib/
│   └── api.js              # Axios instance + interceptors
├── App.jsx                 # Main app component
├── main.jsx                # React entry point
└── index.css               # Tailwind + custom styles
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | `http://localhost:3001/api` | Backend API base URL |
| `VITE_AUTH_URL` | `https://auth.emergentagent.com` | OAuth provider URL |

## Authentication Flow

1. User clicks "Sign in with Google"
2. Redirected to `VITE_AUTH_URL`
3. After auth, redirected back to `/auth/callback?session_id=...`
4. Session exchanged for user data
5. User data stored in `AuthContext`

## Styling

The app uses a **neo-brutalist** design system:

- **Colors**: Custom pastel palette (violet, mint, yellow, peach, sky)
- **Typography**: Outfit (headers), Figtree (body), JetBrains Mono (code)
- **Components**: `.nb-card`, `.nb-btn`, `.nb-input`, `.nb-pill`
- **Spacing**: Tailwind utilities

See `src/index.css` for all custom styles.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/session` | Exchange session_id for user data |
| GET | `/auth/me` | Get current user |
| POST | `/auth/logout` | Logout user |
| POST | `/chat` | Send message to AI tutor |
| GET | `/ratings` | Get all ratings |
| POST | `/ratings` | Submit a rating |
| POST | `/focus/tasks` | Create a task |
| GET | `/focus/tasks` | Get user's tasks |
| PATCH | `/focus/tasks/:id` | Update task |
| DELETE | `/focus/tasks/:id` | Delete task |

## Deployment

### GitHub Pages (Static Export)

```bash
npm run build
```

The `dist/` folder is ready to deploy.

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

### Netlify

Connect your GitHub repo to Netlify for automatic deployments.

## License

MIT License – feel free to fork and modify! 🚀

## Support

Built with 💜 for CBSE students. Questions? Open an issue!
