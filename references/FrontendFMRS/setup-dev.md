# Quick Development Setup Guide

## For New Developers

### 1. Prerequisites Check
Ensure you have the following installed:
- [ ] Node.js 18+ (`node --version`)
- [ ] npm (`npm --version`)
- [ ] .NET 8 SDK (`dotnet --version`)
- [ ] Visual Studio 2022 or VS Code

### 2. Frontend Setup (Cursor/VS Code)

```bash
# Navigate to frontend directory
cd FrontendFMRS

# Install dependencies
npm install

# Copy environment template
cp .env.local .env.local.custom

# Start development server
npm run dev
```

Frontend will be available at: `http://localhost:5173`

### 3. Backend Setup (Visual Studio)

1. Open `BackendFMRS/PureGreenLandGroup-FMRS.sln` in Visual Studio
2. Right-click `PureGreenLandGroup.API` → "Set as Startup Project"
3. Press F5 to run
4. API will be available at: `https://localhost:7007`
5. Swagger UI: `https://localhost:7007/swagger`

### 4. Verify Setup

1. **Frontend loads:** Navigate to `http://localhost:5173`
2. **Backend responds:** Navigate to `https://localhost:7007/swagger`
3. **API communication:** Check browser developer tools for API calls

### 5. Development Workflow

#### Option A: Separate Development (Recommended)
- **Terminal 1 (Cursor):** `npm run dev` (frontend)
- **Visual Studio:** F5 (backend)

#### Option B: Combined Development  
- **Terminal (Cursor):** `npm run dev:full` (both)

### Common First-Time Issues

1. **SSL Certificate Issues:**
   - Trust the development certificate: `dotnet dev-certs https --trust`

2. **CORS Errors:**
   - Ensure backend CORS is configured (already done)
   - Check that frontend is calling `https://localhost:7007`

3. **Environment Variables:**
   - Verify `.env` file exists in FrontendFMRS
   - Check `VITE_API_BASE_URL=https://localhost:7007`

4. **Database Connection:**
   - Update connection string in `BackendFMRS/PureGreenLandGroup.API/appsettings.json`
   - Run migrations if needed: `dotnet ef database update`

### Next Steps

1. Read the full README.md for detailed information
2. Check FIELDPOINT_STYLE_GUIDE.md for design guidelines
3. Review COMPONENT_AUDIT.md for component development
4. Explore the modular architecture in `/modules`

### Quick Commands Reference

```bash
# Frontend Development
npm run dev          # Start frontend only
npm run build        # Build for production
npm run lint         # Run linting
npm run type-check   # Check TypeScript

# Combined Development
npm run dev:full     # Start both frontend and backend
npm run dev:backend  # Start backend from frontend directory
```

### Support

If you encounter issues:
1. Check the Troubleshooting section in README.md
2. Verify all prerequisites are installed correctly
3. Ensure both frontend and backend are running
4. Check browser console for errors
5. Verify API endpoints in Swagger UI