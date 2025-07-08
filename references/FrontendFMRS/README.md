# Fieldpoint Platform - Frontend

A modern React-based frontend for the Fieldpoint multi-module platform, built with TypeScript, Vite, and Tailwind CSS.

## Quick Start

### Prerequisites
- Node.js 18+ and npm
- .NET 8 SDK (for backend)
- Visual Studio or VS Code (recommended)

### Frontend Development (Cursor/VS Code)

1. **Install dependencies:**
   ```bash
   cd FrontendFMRS
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```
   Frontend will be available at: `http://localhost:5173`

3. **Backend dependency:**
   The frontend requires the .NET backend to be running. Start it separately in Visual Studio.

### Backend Development (Visual Studio)

1. **Open backend solution:**
   ```
   BackendFMRS/PureGreenLandGroup-FMRS.sln
   ```

2. **Set startup project:**
   - Right-click `PureGreenLandGroup.API`
   - Select "Set as Startup Project"

3. **Run the backend:**
   - Press F5 or Debug → Start Debugging
   - API will be available at: `https://localhost:7007`
   - Swagger UI: `https://localhost:7007/swagger`

## Separated Development Workflow

### Option 1: Independent Development (Recommended)
- **Frontend:** Run `npm run dev` in Cursor/VS Code
- **Backend:** Run in Visual Studio with F5
- Communication via API calls to `https://localhost:7007`

### Option 2: Combined Development
- **Combined:** Run `npm run dev:full` to start both frontend and backend
- Uses concurrently to run both processes

## Project Structure

```
FrontendFMRS/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Base UI components (Button, Card, etc.)
│   │   └── cards/          # Specialized card components
│   ├── modules/            # Feature modules
│   │   ├── admin/          # Administration module
│   │   ├── dashboard/      # Main dashboard
│   │   ├── equipment/      # Equipment management
│   │   ├── irrigation/     # Irrigation management
│   │   └── site-management/ # Site management
│   ├── layout/             # Layout components
│   ├── config/             # Configuration files
│   │   ├── api.ts          # API client configuration
│   │   └── modules.ts      # Module configuration
│   ├── styles/             # Design system and styles
│   │   ├── token.ts        # Design tokens
│   │   └── foundations.ts  # Style foundations
│   └── lib/                # Utility functions
├── .env                    # Environment variables
├── .env.local              # Local development overrides
└── .env.production         # Production configuration
```

## Environment Configuration

### Development Environment Variables

The frontend uses environment variables for configuration. Default values are in `.env`:

```bash
# API Configuration
VITE_API_BASE_URL=https://localhost:7007
VITE_API_TIMEOUT=10000

# Environment
VITE_ENVIRONMENT=development

# Feature Flags
VITE_ENABLE_IRRIGATION_MODULE=true
VITE_ENABLE_SITE_MANAGEMENT_MODULE=true
VITE_ENABLE_EQUIPMENT_MODULE=true
VITE_ENABLE_ADMIN_MODULE=true
```

### Local Customization

Copy `.env.local.example` to `.env.local` and customize for your setup:

```bash
cp .env.local .env.local.custom
```

Edit the values as needed for your local development environment.

## API Integration

### API Client

The frontend uses a centralized API client (`src/config/api.ts`) that handles:

- **Authentication:** Automatic JWT token management
- **Request/Response Interceptors:** Logging, error handling, token refresh
- **Environment Configuration:** Automatic API endpoint resolution
- **Type Safety:** TypeScript interfaces for all API responses

### Authentication Flow

1. User logs in → JWT token stored in localStorage
2. API client automatically adds `Authorization: Bearer <token>` header
3. Token expiration handled automatically with redirect to login

### API Endpoints

Endpoints are organized by module in `src/config/api.ts`:

```typescript
endpoints.irrigation.properties.list    // GET /api/Properties/GetProperties
endpoints.auth.login                     // POST /api/Auth/Login
endpoints.users.create                   // POST /api/User/CreateUser
```

## Module Architecture

The platform uses a modular architecture where each business domain is a separate module:

### Available Modules
- **Dashboard:** Central analytics and navigation
- **Irrigation:** Complete irrigation system management (legacy Chetu functionality)
- **Site Management:** Property portfolio and site management
- **Equipment:** Asset and maintenance management
- **Admin:** Platform administration and global settings

### Adding New Modules

1. **Create module structure:**
   ```
   src/modules/your-module/
   ├── layout.tsx
   ├── pages/
   └── components/
   ```

2. **Configure in modules.ts:**
   ```typescript
   moduleConfigs.yourModule = {
     id: 'yourModule',
     name: 'Your Module',
     // ... configuration
   }
   ```

3. **Add routes:**
   ```typescript
   // In routes.tsx
   {
     path: "your-module",
     element: <YourModuleLayout />,
     children: [...]
   }
   ```

## Development Commands

### Frontend Only
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

### Combined Development
```bash
npm run dev:full     # Start both frontend and backend
npm run dev:backend  # Start backend only (from frontend dir)
```

## Design System

The platform uses a comprehensive design system built on Tailwind CSS:

### Design Tokens
- Colors, typography, spacing defined in `src/styles/token.ts`
- Component foundations in `src/styles/foundations.ts`
- Full documentation in `FIELDPOINT_STYLE_GUIDE.md`

### Component Library
- Base components in `src/components/ui/`
- Consistent styling across all modules
- Accessibility-first design
- Component audit available in `COMPONENT_AUDIT.md`

## Backend Integration Notes

### CORS Configuration
The backend is configured to allow the React development server:
```csharp
// In Program.cs
builder.Services.AddCors(options => {
    options.AddDefaultPolicy(policy => {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
```

### JWT Authentication
Backend uses JWT tokens configured in `appsettings.json`:
```json
{
  "JWT": {
    "Issuer": "YourIssuer",
    "Audience": "YourAudience", 
    "Key": "YourSecretKey"
  }
}
```

### Database Connection
Backend connects to SQL Server using Entity Framework Core. Connection string in `appsettings.json`.

## Troubleshooting

### Common Issues

1. **API calls failing:**
   - Ensure backend is running on `https://localhost:7007`
   - Check CORS configuration in backend
   - Verify SSL certificate is trusted

2. **Authentication not working:**
   - Check JWT configuration in backend
   - Verify token is being sent in requests
   - Check browser localStorage for token

3. **Module not loading:**
   - Verify module is enabled in environment variables
   - Check user permissions in module configuration
   - Ensure routes are properly configured

4. **Build errors:**
   - Run `npm run type-check` to identify TypeScript issues
   - Check that all environment variables are defined
   - Ensure all dependencies are installed

### Debug Mode

Enable debug mode in `.env.local`:
```bash
VITE_DEBUG_MODE=true
VITE_LOG_LEVEL=debug
```

This will enable detailed API logging and additional debug information.

## Production Deployment

### Build for Production
```bash
npm run build
```

### Environment Configuration
Update `.env.production` with production API endpoints and settings.

### Deployment Checklist
- [ ] Update API base URL to production endpoint
- [ ] Disable debug mode
- [ ] Configure proper CORS on backend
- [ ] Set up HTTPS certificates
- [ ] Configure database connection strings
- [ ] Test all module functionality

## Contributing

### Code Style
- Follow existing TypeScript and React patterns
- Use the Fieldpoint design system components
- Maintain consistent file structure within modules
- Add proper TypeScript types for all new code

### Module Development
- Follow the established module patterns
- Use shared layout components
- Implement proper permission checking
- Add comprehensive error handling

For detailed component development guidelines, see `COMPONENT_AUDIT.md` and `FIELDPOINT_STYLE_GUIDE.md`.