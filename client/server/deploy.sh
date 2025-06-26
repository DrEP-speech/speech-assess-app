
#!/bin/bash

echo "🔧 Installing frontend dependencies & building..."
cd client
npm install
npm run build
cd ..

echo "🧠 Installing backend dependencies..."
cd server || cd speech-assess-api
npm install
cd ..

echo "📦 Staging commit to GitHub..."
git add .
git commit -m "🚀 Production deploy: Render + Vercel setup complete"
git push origin main

echo "✅ Deploy script complete."

