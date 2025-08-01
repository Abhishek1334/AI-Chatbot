# 🤖 AI Chatbot

A modern, feature-rich AI chatbot built with Next.js, TypeScript, and TailwindCSS. This application provides an intuitive interface for interacting with AI models through OpenRouter API.

## ✨ Features

- **Multiple AI Roles**: Choose from different AI personalities (Default, Tutor, Coder, Writer)
- **Format Support**: Get responses in Plain text, Markdown, JSON, or Table format
- **Dark/Light Theme**: Toggle between themes with a beautiful UI
- **Message History**: Intelligent conversation management with automatic summarization
- **Real-time Streaming**: Smooth loading states and real-time responses
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Code Highlighting**: Syntax highlighting for code blocks in markdown responses
- **Modern UI**: Built with Shadcn/ui components and TailwindCSS

## 🚀 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS v4 (latest) with OKLCH colors
- **UI Components**: Shadcn/ui v0.0.4 (latest) + Radix UI
- **Icons**: Lucide React
- **Markdown**: React Markdown with syntax highlighting
- **Theme**: Next-themes for dark/light mode
- **HTTP Client**: Axios

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone git@github.com:Abhishek1334/AI-Chatbot.git
   cd AI-Chatbot
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   OPENROUTER_API_KEY=your_openrouter_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Environment Variables

- `OPENROUTER_API_KEY`: Your OpenRouter API key (required)

### API Setup

1. Sign up at [OpenRouter](https://openrouter.ai/)
2. Get your API key from the dashboard
3. Add it to your `.env.local` file

## 🎯 Usage

1. **Select AI Role**: Choose from different AI personalities using the dropdown
2. **Choose Format**: Select your preferred response format
3. **Start Chatting**: Type your message and press Enter or click Send
4. **Theme Toggle**: Switch between light and dark themes using the toggle button

## 📁 Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── api/            # API routes
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Main page
├── components/         # React components
│   ├── ui/            # Shadcn/ui components
│   ├── theme-provider.tsx
│   └── theme-toggle.tsx
├── lib/               # Utility libraries
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenRouter](https://openrouter.ai/) for providing AI model access
- [Shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Next.js](https://nextjs.org/) for the amazing framework
- [TailwindCSS](https://tailwindcss.com/) for utility-first CSS

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the maintainers.

---

Made with ❤️ using Next.js and TypeScript
