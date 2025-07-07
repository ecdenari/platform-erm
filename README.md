# Platform-ERM

> Modern landscape business management platform designed to replace Aspire with superior workflows and user experience.

[![CI/CD Status](https://github.com/your-username/platform-erm/workflows/Platform-ERM%20CI/CD/badge.svg)](https://github.com/your-username/platform-erm/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🎯 Mission

Platform-ERM addresses critical limitations in current landscape ERP systems (particularly Aspire) by providing:

- **Superior Contact Management**: Hierarchical contact structure vs Aspire's lumped approach
- **Flexible Purchase Orders**: Multi-strategy PO generation vs Aspire's rigid "Purchase Receipts"
- **Real-time Job Costing**: Live profitability tracking vs manual entry systems
- **Modern Mobile Experience**: Offline-capable PWA vs inferior mobile apps
- **Professional B2B Workflows**: Commercial-focused vs consumer-oriented interfaces

A standalone multi-tenant SaaS platform for landscape business management. Platform-ERM is the source of truth for all business data and provides APIs for external integrations.

## 🏗️ Architecture

Platform-ERM follows Clean Architecture patterns with multi-tenant support:

- **Backend**: .NET Core 8 Web API with Entity Framework Core
- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **Database**: PostgreSQL with PostGIS for spatial data
- **Multi-Tenancy**: Tenant isolation with global query filters

## 🚀 Getting Started

### Prerequisites

- .NET 8 SDK
- Node.js 18+ and npm
- Docker and Docker Compose
- PostgreSQL 15+ (or use Docker)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd platform-erm
   ```

2. **Start the database**
   ```bash
   docker-compose up -d postgres postgres-dev
   ```

3. **Setup the backend**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your settings
   dotnet restore
   dotnet ef database update -p src/PlatformERM.Infrastructure -s src/PlatformERM.API
   ```

4. **Setup the frontend**
   ```bash
   cd frontend
   cp .env.example .env
   # Edit .env with your settings
   npm install
   ```

5. **Run the application**
   ```bash
   # Terminal 1 - Backend
   cd backend/src/PlatformERM.API
   dotnet run

   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
   - Swagger (Internal): http://localhost:5000/swagger
   - PgAdmin: http://localhost:5050 (admin@platformerm.com / admin)

## 📁 Project Structure

```
platform-erm/
├── backend/                    # .NET Core 8 API
│   ├── src/
│   │   ├── PlatformERM.API/           # Web API layer
│   │   ├── PlatformERM.Application/   # Application services
│   │   ├── PlatformERM.Domain/        # Domain entities
│   │   ├── PlatformERM.Infrastructure/ # Data access & external services
│   │   └── PlatformERM.Shared/        # Shared utilities
│   └── tests/
├── frontend/                   # React + TypeScript
│   ├── src/
│   │   ├── api/               # API client
│   │   ├── components/        # Reusable UI components
│   │   ├── contexts/          # React contexts
│   │   ├── hooks/             # Custom hooks
│   │   ├── modules/           # Feature modules
│   │   └── types/             # TypeScript definitions
│   └── public/
├── database/                   # Database initialization
├── references/                 # Reference code from other projects
└── docs/                      # Documentation
```

## 🔧 Development

### Backend Development

The backend uses Clean Architecture with the following layers:

- **Domain**: Core business entities and interfaces
- **Application**: Business logic and application services
- **Infrastructure**: Data access, external services, and infrastructure concerns
- **API**: Controllers, middleware, and API configuration

**Key Features:**
- Multi-tenant architecture with automatic tenant isolation
- Dual API structure (Internal + Public)
- JWT authentication for internal API
- API Key authentication for public API
- Entity Framework Core with PostgreSQL
- Swagger documentation for both APIs

### Frontend Development

The frontend is built with React 18 and TypeScript:

- **Module-based architecture** with feature modules
- **React Query** for data fetching and caching
- **Tailwind CSS** for styling
- **Multi-tenant context** for tenant-aware components
- **Responsive design** with mobile-first approach

### Database Migrations

```bash
# Create a new migration
dotnet ef migrations add <MigrationName> -p src/PlatformERM.Infrastructure -s src/PlatformERM.API

# Apply migrations
dotnet ef database update -p src/PlatformERM.Infrastructure -s src/PlatformERM.API
```

## 🔒 Multi-Tenancy

Platform-ERM implements multi-tenancy with the following strategies:

1. **Tenant Resolution**:
   - Subdomain-based (e.g., `demo.platformerm.com`)
   - Header-based (`X-Tenant-Id`)
   - JWT claims (`tenant_id`)
   - API Key-based (for public API)

2. **Data Isolation**:
   - Every entity includes `TenantId` (except Tenants table)
   - Global query filters ensure tenant isolation
   - Automatic tenant assignment on entity creation

3. **Security**:
   - Cross-tenant data access is prevented
   - API keys are tenant-specific
   - Tenant validation on every request

## 🌐 API Documentation

### Internal API (`/api/internal/*`)
- Full CRUD operations for all entities
- Used by Platform-ERM frontend
- JWT Bearer authentication
- Complete access to all features

### Public API (`/api/public/*`)
- Limited, controlled endpoints
- Used by external systems
- API Key authentication
- Read-heavy operations with limited write access

Access Swagger documentation at:
- Internal API: http://localhost:5000/swagger
- Public API: http://localhost:5000/swagger (Public tab)

## 🧪 Testing

### Backend Tests
```bash
# Run unit tests
dotnet test backend/tests/PlatformERM.Tests.Unit

# Run integration tests
dotnet test backend/tests/PlatformERM.Tests.Integration
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 🚢 Deployment

### Environment Variables

**Backend (.env)**:
- `CONNECTION_STRING`: PostgreSQL connection string
- `JWT_SECRET`: JWT signing secret
- `CORS_ORIGINS`: Allowed CORS origins

**Frontend (.env)**:
- `VITE_API_URL`: Backend API URL

### Docker Deployment

```bash
# Build and run all services
docker-compose up --build

# Production deployment
docker-compose -f docker-compose.prod.yml up -d
```

## 📝 Key Concepts

### Tenant Management
- Each tenant has its own subdomain and API key
- Tenant settings stored as JSON for flexibility
- Tenant-specific branding support

### Data Ownership
- Platform-ERM owns all data (unlike Fieldpoint-FMRS)
- No dependency on external ERP systems
- Other systems integrate with Platform-ERM via public API

### Security Best Practices
- Never expose `TenantId` in URLs
- Validate tenant access on every request
- Rate limiting on public API endpoints
- Comprehensive audit logging

## 🧑‍💻 Development

### Agent Coordination
This project uses a multi-agent development approach. See [CLAUDE.md](./CLAUDE.md) for agent coordination protocols.

### Branching Strategy
- `main`: Production-ready code
- `develop`: Integration branch
- `feature/*`: Feature development branches

### Commit Standards
Follow [Conventional Commits](https://www.conventionalcommits.org/):
```
feat(properties): add hierarchical contact management
fix(auth): resolve tenant isolation issue
docs(api): update purchase order endpoints
```

## 📚 Documentation

- [Architecture Guide](./docs/development/architecture-guide.md)
- [Agent Coordination](./docs/development/agent-coordination.md)
- [Multi-Agent Coordination](./docs/development/multi-agent-coordination.md)
- [Feature Documentation](./docs/features/)
- [Agent Roles](./docs/agents/)

## 🧪 Testing

```bash
# Backend tests
cd backend
dotnet test

# Frontend tests
cd frontend
npm run test

# Integration tests
npm run test:integration
```

## 🚢 Deployment

### Development
```bash
docker-compose up -d
```

### Production
See [deployment documentation](./docs/deployment/) for production setup.

## 📊 Project Status

### Completed ✅
- Multi-tenant architecture foundation
- Properties & Contacts hierarchical system
- Aspire workflow implementation (Property → Opportunity → Contract → Work Tickets)
- Enterprise UI design system with three-platform approach
- Multi-agent coordination protocols
- Documentation consolidation and auto-reference system

### In Progress 🔄
- Properties frontend components (Agent 1)
- GitHub integration and CI/CD pipeline
- Multi-agent coordination testing

### Planned 📋
- Purchase Order multi-strategy system
- Real-time job costing engine
- Equipment lifecycle management
- Mobile app foundation

## 🎯 Competitive Advantages

### vs Aspire
- ✅ **Contact Management**: Hierarchical vs lumped together
- ✅ **Purchase Orders**: Flexible strategies vs rigid "Purchase Receipts"
- ✅ **Mobile Experience**: Modern PWA vs "pretty useless" app
- ✅ **Billing Contacts**: Project-specific vs property-level only
- ✅ **Workflow Hierarchy**: Property → Opportunity → Contract → Work Tickets

### vs LMN
- ✅ **Job Costing**: Real-time vs manual entry only
- ✅ **User Experience**: Professional vs "held together with tape"
- ✅ **Integration**: Native vs external dependencies

## 📈 Success Metrics

- **User Experience**: 50%+ improvement over Aspire workflows
- **Efficiency**: 25-75% reduction in administrative time
- **Cost Savings**: Eliminate 2-3 separate software tools
- **Revenue Impact**: Enable 15-30% operational efficiency gains

## 🤝 Contributing

1. Read [CONTRIBUTING.md](./CONTRIBUTING.md)
2. Check [CLAUDE.md](./CLAUDE.md) for agent coordination
3. Create feature branch from `develop`
4. Submit Pull Request with proper description

**Agent-Specific Guidelines**:
- **Agent 1**: Properties frontend, UI components, styling
- **Agent 2**: Backend APIs, database, documentation, coordination
- **Agent 3**: Mobile app, integrations, testing (future)

## 📄 License

This project is proprietary software. All rights reserved.

## 🆘 Support

For development support and questions:
- Check the `references/` folder for code patterns
- Review the SCAFFOLD.md for detailed architecture guidance
- Consult the CLAUDE.md for AI assistant instructions