# Contributing to Platform-ERM

Welcome to Platform-ERM development! This guide will help you understand our multi-agent development process and standards.

## 🎯 Development Philosophy

Platform-ERM is built to solve real problems in the landscape industry, specifically addressing limitations in existing ERPs like Aspire and LMN. Every contribution should:

1. **Solve Real Problems**: Address documented pain points in landscape business management
2. **Improve User Experience**: Make workflows faster and more intuitive than Aspire/LMN
3. **Maintain Quality**: Follow established patterns and multi-tenant architecture
4. **Enable Growth**: Build for scale and future enhancement

## 🤝 Agent Coordination System

### Multi-Agent Development Overview
Platform-ERM uses a coordinated multi-agent development approach with clear specializations:

- **Agent 1**: Properties Frontend Specialist
- **Agent 2**: Backend & Systems Specialist  
- **Agent 3**: Mobile & Integration Specialist (future)

### Required Reading Before Contributing
1. **[CLAUDE.md](./CLAUDE.md)** - Master coordination requirements and architecture rules
2. **[Agent Coordination Guide](./docs/development/agent-coordination.md)** - Detailed coordination protocols
3. **[Multi-Agent Coordination](./docs/development/multi-agent-coordination.md)** - Comprehensive coordination documentation
4. **[Your Agent Role](./docs/agents/)** - If you're working as a specific agent

### Coordination Requirements
- **Daily Sync**: All agents sync with `develop` branch daily
- **Cross-Communication**: Use GitHub Issues with `coordination` label for cross-agent needs
- **File Ownership**: Respect agent boundaries, coordinate on shared files
- **Documentation**: Update relevant docs with any changes that affect other agents

## 🏗️ Development Workflow

### 1. Environment Setup

```bash
# Fork and clone (or use existing repository)
git clone https://github.com/your-username/platform-erm.git
cd platform-erm

# Backend setup
cd backend
dotnet restore
cp .env.example .env
# Edit .env with your settings

# Frontend setup  
cd frontend
npm install
cp .env.example .env
# Edit .env with your settings

# Database setup
docker-compose up -d postgres postgres-dev
cd backend
dotnet ef database update -p src/PlatformERM.Infrastructure -s src/PlatformERM.API
```

### 2. Agent-Specific Workflow

#### Agent 1 (Properties Frontend)
```bash
# Sync with develop
git checkout develop && git pull origin develop

# Create feature branch
git checkout -b feature/properties-[description]

# Work on frontend components using enterprise tokens
# Follow three-platform approach (ServiceTitan, LMN, Aspire)
# Respect three-level navigation hierarchy

# Coordinate API needs with Agent 2 via GitHub Issues
```

#### Agent 2 (Backend & Systems)
```bash
# Sync with develop
git checkout develop && git pull origin develop

# Create feature branch
git checkout -b feature/backend-[description]
# or feature/api-[description]
# or feature/docs-[description]

# Work on backend APIs, database, documentation
# Maintain multi-tenant architecture
# Coordinate breaking changes with other agents
```

### 3. Development Standards

#### Code Quality Standards
- **Backend**: Follow Clean Architecture patterns with multi-tenant support
- **Frontend**: Use enterprise token system (`enterpriseTokens.ts`) and three-platform component variants
- **Testing**: Maintain test coverage above 80%
- **Documentation**: Update relevant docs with any API or workflow changes
- **Security**: Multi-tenant isolation must be maintained in all changes

#### Naming Conventions
- **Branches**: `feature/[agent-scope]-[description]`
  - `feature/properties-list-component`
  - `feature/backend-purchase-orders`
  - `feature/mobile-responsive-cards`
- **Commits**: Follow [Conventional Commits](https://www.conventionalcommits.org/)
  - `feat(properties): add hierarchical contact management`
  - `fix(api): resolve tenant isolation in JWT tokens`
  - `docs(coordination): update multi-agent protocols`
- **Components**: PascalCase with platform suffixes
  - `PropertyListAspire.tsx`
  - `PropertyListServiceTitan.tsx`
- **APIs**: RESTful conventions with clear resource naming

### 4. File Ownership Rules

#### Agent 1 Owns
- `/frontend/src/components/` (UI components)
- `/frontend/src/modules/properties/` (Properties module)
- `/frontend/src/styles/` (Design tokens and styling)
- `/docs/features/ui-*` (UI feature documentation)
- `/docs/UI_*` (UI design system files)

#### Agent 2 Owns
- `/backend/src/` (All backend code)
- `/docs/features/api-*` (API feature documentation)
- `/docs/development/` (Architecture and development guides)
- Database migration files
- `/docs/tracking/` (Work tracking and coordination)
- Root documentation files (CLAUDE.md, README.md)

#### Shared Files (Coordination Required)
- `/frontend/src/api/` (API client interfaces)
- `/frontend/src/types/` (TypeScript definitions)
- `package.json` and dependencies
- Database schema changes
- Navigation structure changes

## 🔄 Pull Request Process

### PR Requirements
- [ ] Clear description of changes and business value
- [ ] Links to related issues (especially coordination issues)
- [ ] All tests passing
- [ ] Documentation updated
- [ ] Self-review completed
- [ ] Cross-agent impacts noted and coordinated
- [ ] Multi-tenant isolation verified

### PR Template Usage
Use our comprehensive PR template that includes:
- Type of change and modules affected
- Agent assignment and coordination status
- API and database change documentation
- Multi-agent coordination checklist
- Screenshots for UI changes (three-platform variants)

### Review Process
1. **Self-Review**: Complete self-review checklist
2. **Agent Review**: Other agents review if cross-cutting changes
3. **Integration Testing**: Test coordination points between agents
4. **Approval**: At least one approval required
5. **Merge**: Squash and merge to maintain clean history

## 🧪 Testing Standards

### Test Coverage Requirements
- **Unit Tests**: 80% minimum coverage
- **Integration Tests**: All API endpoints and cross-agent integration points
- **Multi-Tenant Tests**: Verify tenant isolation in all tests
- **Component Tests**: Frontend components with three-platform variants
- **E2E Tests**: Critical user workflows

### Testing Commands
```bash
# Backend tests
cd backend && dotnet test

# Frontend tests
cd frontend && npm run test

# Integration tests
npm run test:integration

# E2E tests (when available)
npm run test:e2e
```

### Multi-Agent Integration Testing
- Test API contracts between backend and frontend
- Verify TypeScript type alignment
- Test tenant isolation across all layers
- Validate navigation hierarchy functionality

## 🎨 UI/UX Standards

### Enterprise Design System
- **Design Tokens**: Use `enterpriseTokens.ts` for all styling
- **Three-Platform Approach**: Create ServiceTitan, LMN, and Aspire variants
- **Navigation Hierarchy**: Respect Primary Sidebar → SubNav → Page Tabs structure
- **Accessibility**: WCAG 2.1 AA compliance required
- **Mobile**: Progressive Web App standards with offline capabilities

### Component Development Pattern
```typescript
// Import enterprise tokens
import { enterpriseTokens, platformStyles } from '@/styles/enterpriseTokens';

// Create three-platform variants
export const PropertyCardVariants = {
  serviceTitan: {
    // Dense, efficient, maximum information density
    styles: platformStyles.serviceTitan.card
  },
  lmn: {
    // Landscape-specific features, comfortable spacing
    styles: platformStyles.lmn.card
  },
  aspire: {
    // Commercial hierarchy, professional B2B
    styles: platformStyles.aspire.card
  }
};
```

## 🔧 Technical Standards

### Backend Architecture Requirements
- **Clean Architecture**: Domain/Application/Infrastructure/API layers
- **Multi-Tenancy**: Every entity must inherit from `BaseEntity` with `TenantId`
- **Database**: Entity Framework with proper migrations
- **APIs**: RESTful with OpenAPI documentation
- **Security**: JWT with tenant isolation, API key authentication for public endpoints
- **Performance**: <200ms API response times for 90% of requests

### Frontend Architecture Requirements
- **Framework**: React 18 + TypeScript + Vite
- **State Management**: React Query for server state, React Context for app state
- **Styling**: Tailwind CSS with enterprise design tokens
- **Testing**: Vitest + React Testing Library
- **Bundle**: Code splitting and lazy loading for modules
- **PWA**: Service worker for offline capabilities

### Database Requirements
- **Migrations**: All schema changes via Entity Framework migrations
- **Multi-Tenancy**: Global query filters on all tenant-scoped entities
- **Indexing**: Performance-optimized indexing with tenant consideration
- **Spatial Data**: PostGIS for location data
- **Audit**: Comprehensive audit trails with tenant context

## 🔐 Security Guidelines

### Multi-Tenant Security
- **Tenant Isolation**: Verify tenant context in every database query
- **JWT Validation**: Proper token validation with tenant claims
- **API Security**: Rate limiting and input validation on all endpoints
- **Data Protection**: Never expose cross-tenant data
- **Audit Logging**: Log all significant actions with tenant context

### Data Protection Standards
- **Never commit**: API keys, passwords, connection strings, tenant data
- **Environment variables**: Use for all sensitive configuration
- **Input validation**: Validate and sanitize all user inputs
- **SQL injection prevention**: Use parameterized queries exclusively
- **XSS protection**: Sanitize all outputs and use CSP headers

## 📚 Documentation Requirements

### Agent-Specific Documentation
- **Agent 1**: UI component documentation, design system updates
- **Agent 2**: API documentation, architecture guides, coordination protocols
- **Agent 3**: Mobile guides, integration documentation (future)

### Documentation Standards
- **Format**: Markdown with consistent structure and cross-references
- **API Documentation**: OpenAPI/Swagger with comprehensive examples
- **Code Comments**: TSDoc for TypeScript, XML comments for C#
- **Workflow Documentation**: Step-by-step guides with screenshots
- **Integration Guides**: Clear setup and configuration instructions

### Required Documentation Updates
- Update completion-log.md for major milestones
- Update feature documentation for new functionality
- Update API documentation for endpoint changes
- Update coordination protocols for process improvements

## 🚨 Issue Management

### Issue Types and Labels
- **Bug**: `bug` label with priority (critical/high/medium/low)
- **Feature**: `feature` label with complexity assessment
- **Coordination**: `coordination` label for cross-agent work
- **Documentation**: `documentation` label for doc updates
- **Agent-Specific**: `agent-1`, `agent-2`, `agent-3` labels

### Agent Coordination Issues
Use the agent coordination issue template for:
- API contract changes affecting multiple agents
- Database schema changes with frontend impact
- Navigation hierarchy modifications
- Breaking changes requiring migration
- Integration testing coordination

### Issue Assignment Process
1. **Bug Reports**: Assigned based on affected module and agent ownership
2. **Feature Requests**: Assigned based on primary implementation agent
3. **Coordination Issues**: Multiple agents assigned as needed
4. **Documentation**: Usually assigned to Agent 2 (documentation authority)

## 🎯 Success Metrics

### Individual Agent Success
- **Code Quality**: Maintainable, tested, documented code
- **Coordination**: Smooth collaboration with other agents
- **Productivity**: Regular, meaningful contributions
- **Standards Compliance**: Adherence to architectural and coding standards

### Project Success Metrics
- **User Experience**: Superior to Aspire/LMN workflows
- **Performance**: Fast, responsive application
- **Quality**: Low bug rates, high test coverage
- **Architecture**: Maintainable, scalable multi-tenant system

## 🆘 Getting Help

### Documentation Resources
- **[CLAUDE.md](./CLAUDE.md)**: Master coordination requirements
- **[Architecture Guide](./docs/development/architecture-guide.md)**: Technical patterns
- **[Agent Roles](./docs/agents/)**: Agent-specific guidance
- **[Multi-Agent Coordination](./docs/development/multi-agent-coordination.md)**: Detailed coordination protocols

### Communication Channels
- **GitHub Issues**: Primary communication method
- **Pull Request Reviews**: Code-specific discussions
- **Documentation**: Comprehensive guides for common scenarios
- **Agent Coordination Issues**: Cross-agent communication

### Emergency Procedures
- **Critical Bugs**: Use `[URGENT]` prefix and `critical` label
- **Security Issues**: Contact project maintainers immediately
- **Architecture Questions**: Create issue with Agent 2 assignment
- **Coordination Conflicts**: Use agent coordination issue template

## ✅ Contribution Checklist

Before submitting any contribution:

- [ ] **Coordination Compliance**: Read CLAUDE.md and follow agent coordination requirements
- [ ] **Standards Adherence**: Code follows established patterns and architecture rules
- [ ] **Testing Complete**: All tests pass and coverage maintained/improved
- [ ] **Documentation Updated**: Relevant docs updated for any changes
- [ ] **Multi-Tenant Verified**: Tenant isolation maintained and tested
- [ ] **Cross-Agent Coordination**: Other agents notified of impacts via issues
- [ ] **Security Review**: Security implications considered and addressed
- [ ] **Performance Assessment**: Performance impact evaluated and acceptable
- [ ] **PR Template**: Complete PR template with all required information
- [ ] **Agent File Ownership**: Respected file ownership or coordinated shared file changes

## 🎉 Recognition

Contributors are recognized through:
- **Release Notes**: Major contributors listed in each release
- **Documentation**: Contributor acknowledgments in project docs
- **GitHub**: Contributor statistics and commit history
- **Agent Leaderboards**: Recognition for exceptional coordination and quality

Thank you for contributing to Platform-ERM! Your work helps transform landscape business management and provides superior alternatives to existing ERP limitations.

---

**Remember**: Platform-ERM isn't just code - it's a solution to real business problems. Every contribution should make landscape companies more efficient, profitable, and successful.