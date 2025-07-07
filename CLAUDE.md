# CLAUDE.md

This file provides rules and context for Claude Code when working with the Platform-ERM codebase.

## Critical Context

**Platform-ERM is a STANDALONE system** - This is NOT like Fieldpoint-FMRS:
- Fieldpoint-FMRS pulls data from Aspire ERP (properties, contacts, etc.)
- Platform-ERM owns ALL its data - it is the source of truth
- Other systems (including Aspire) can integrate with Platform-ERM via our public API
- We expose APIs for others to consume, not the other way around

## Architecture Rules

### 1. Multi-Tenancy First
- EVERY entity must include `TenantId` property (except the Tenants table itself)
- ALWAYS use the base entity class that includes tenant support
- NEVER allow cross-tenant data access
- Global query filters must be applied to all tenant-scoped entities

### 2. API Structure
**Internal API** (`/api/internal/*`):
- Full CRUD operations
- Used only by Platform-ERM frontend
- JWT Bearer authentication
- Complete access to all features

**Public API** (`/api/public/*`):
- Limited, controlled endpoints
- Used by external systems
- API Key authentication
- Read-heavy, limited write operations
- Always version public endpoints

### 3. Reference Code Usage
The `references/` folder contains Fieldpoint-FMRS code:
- Use it for PATTERNS and STRUCTURE only
- DO NOT copy Aspire integration code
- DO NOT copy external data fetching logic
- DO adapt: authentication, clean architecture, UI components, design patterns

### 4. Database Design
- PostgreSQL with PostGIS for spatial data
- Use `GEOGRAPHY` type for location data, not separate lat/lng columns
- Always include audit fields: CreatedAt, UpdatedAt, CreatedBy, UpdatedBy
- Use soft deletes (IsDeleted flag) for critical entities

### 5. Frontend Patterns
- Module-based architecture with lazy loading
- Every module should be self-contained
- Use React Query for all data fetching
- Tenant context must be available globally
- API calls must use the centralized client with interceptors

## Naming Conventions

### Backend
- **Entities**: Singular (e.g., `Property`, `Contact`, `WorkOrder`)
- **DTOs**: Suffix with `Dto` (e.g., `PropertyDto`, `CreatePropertyDto`)
- **Services**: Prefix with `I` for interfaces (e.g., `IPropertyService`)
- **Controllers**: Plural (e.g., `PropertiesController`)

### Frontend
- **Components**: PascalCase (e.g., `PropertyList`, `ContactForm`)
- **Hooks**: Prefix with `use` (e.g., `useProperties`, `useTenant`)
- **API Functions**: Descriptive names (e.g., `getProperties`, `createContact`)
- **Types**: Match backend DTOs but in TypeScript

## Code Generation Guidelines

When generating code:
1. **Check for TenantId** - Every entity creation must consider multi-tenancy
2. **Validate API placement** - Internal vs Public API
3. **Include error handling** - Especially for tenant-related operations
4. **Add TSDoc/XML comments** - Document public APIs thoroughly
5. **Consider mobile** - UI components should be responsive by default

## Security Requirements

1. **Never expose TenantId in URLs** - Use JWT claims or headers
2. **Validate tenant access** on every request
3. **API keys are tenant-specific** - One tenant cannot use another's key
4. **Log all public API access** for audit trails
5. **Rate limit public endpoints** per API key

## Common Pitfalls to Avoid

1. ❌ Don't copy Aspire integration code from Fieldpoint
2. ❌ Don't create entities without TenantId
3. ❌ Don't expose internal endpoints publicly
4. ❌ Don't allow raw SQL without tenant filtering
5. ❌ Don't implement cross-tenant features without explicit design

## Development Workflow

1. Backend changes → Update DTOs → Update TypeScript types → Update frontend
2. New entity → Add to Domain → Add repository → Add service → Add controller → Add frontend module
3. Public API changes → Update version → Update documentation → Notify API consumers

## Testing Requirements

- Unit tests must mock tenant context
- Integration tests must test tenant isolation
- API tests must verify both authentication methods
- Frontend tests must include multi-tenant scenarios

## Development Environment

### Local Development Ports
**Frontend (Vite React)**:
- URL: http://localhost:5173
- Command: `npm run dev` (from `/frontend` directory)
- Auto-proxies `/api` requests to backend at http://localhost:5000

**Backend API (.NET Core)**:
- HTTP: http://localhost:59819
- HTTPS: https://localhost:59818
- Command: `dotnet run` (from `/backend/src/PlatformERM.API` directory)
- Swagger UI: https://localhost:59818/swagger

### Development Workflow
1. **Start Backend First**:
   ```bash
   cd backend/src/PlatformERM.API
   dotnet run
   ```

2. **Start Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```

3. **Access Application**:
   - Frontend: http://localhost:5173
   - API Direct: https://localhost:59818/api/internal/properties
   - Swagger Docs: https://localhost:59818/swagger

### Git Push Authentication
Due to environment limitations, agents cannot push to GitHub directly. When completing work:
1. Agent will commit changes locally
2. Agent will provide manual push command
3. User must run the push command:
   ```bash
   git push -u origin [branch-name]
   ```

### Database Connection
- PostgreSQL runs on default port 5432
- Connection configured in backend `.env` file
- Ensure PostgreSQL service is running before starting backend

### Multi-Agent Development Tips
- Agent 1: Focus on http://localhost:5173 for UI development
- Agent 2: Monitor https://localhost:59818/swagger for API testing
- Use browser DevTools Network tab to verify API calls
- Check console for CORS or proxy issues

Remember: Platform-ERM is building the future of landscape business management as a true SaaS platform, not an add-on to existing systems.

## Agent Coordination Requirements

**CRITICAL**: All Claude Code agents MUST follow the coordination protocol before starting any work.

### Required Startup Protocol

1. **Read Documentation First** (in this order):
   - `CLAUDE.md` (this file in root - primary development rules)
   - `/docs/development/architecture-guide.md` (technical architecture patterns)
   - `/docs/development/agent-coordination.md` (coordination protocols)
   - `/docs/tracking/completion-log.md` (current work status and completed tasks)
   - `/docs/features/aspire-workflow-hierarchy.md` (if working on workflow features)

2. **Sync with Develop Branch** (CRITICAL):
   ```bash
   git fetch origin
   git merge origin/develop
   ```
   - This ensures you have latest documentation, API contracts, and shared interfaces
   - See `/docs/development/git-coordination-workflow.md` for detailed workflow

3. **Check Current Work Status**:
   - Use `TodoRead` tool to check existing todos and current work phase
   - Review completion-log.md to understand what has been completed
   - Identify where to continue or what new work is needed

4. **Follow Work Coordination Rules**:
   - **Always use TodoWrite/TodoRead** for multi-step tasks
   - **Mark todos in_progress** when starting work, **completed** when finished
   - **Only one todo in_progress at a time** - complete current work before starting new
   - **Update completion-log.md** when finishing significant work

### Documentation Structure

Platform-ERM uses this documentation hierarchy:
```
platform-erm/
├── CLAUDE.md             # Master rules (this file - always read first)
└── docs/
    ├── development/      # Core development guides
    │   ├── architecture-guide.md
    │   └── agent-coordination.md
    ├── legacy/           # Archived files (CLAUDE_COMPONENT_PROMPTS.md, etc.)
    ├── tracking/         # Work tracking
    │   └── completion-log.md
    └── features/         # Feature-specific documentation
```

### Agent Handoff Requirements

When completing work, agents MUST:
1. **Update completion-log.md** with work summary, files modified, and next steps
2. **Mark all todos as completed** that were finished
3. **Create feature documentation** in `/docs/features/` for new modules
4. **Note any blockers or issues** for future agents

### Violation Protocol

If an agent finds:
- **Architecture violations** - Document in completion-log.md, create todo to fix
- **Missing documentation** - Update this file or create appropriate docs
- **Coordination failures** - Report to user and update protocols

**This coordination system ensures smooth collaboration and maintains Platform-ERM's architectural integrity across multiple development sessions.**

## Task Management Requirements

When working on any feature or module:

1. **Use Claude's TodoWrite/TodoRead tools** - Always create and maintain a todo list for multi-step tasks
2. **Update todos in real-time** - Mark items as in_progress when starting, completed when done
3. **Create a feature plan document** - For each new module/feature, create `docs/features/[feature-name]-plan.md` with:
   - Overview and objectives
   - Technical approach
   - Entity relationships  
   - API endpoints (Internal/Public)
   - UI components needed
   - Progress tracking
   - Testing checklist

Example: When building the Properties module, create `docs/features/properties-plan.md` and update it as development progresses.

This ensures consistent documentation and progress tracking across all development work.

## UI Design System Requirements

### Three-Platform Inspiration Strategy

Platform-ERM UI development follows a systematic approach inspired by industry-leading platforms:

1. **ServiceTitan** (HVAC/Professional Services) - Dense, efficient, enterprise-grade interfaces
2. **LMN** (Landscape Management) - Industry-specific workflows and features  
3. **Aspire** (Commercial Landscaping) - Work Order hierarchy and B2B workflows

**Reference Repository**: https://github.com/ecdenari/software-references

### Component Development Standards

When creating or modifying UI components:

1. **Generate Three Variants** - Create ServiceTitan, LMN, and Aspire-inspired versions
2. **Reference Screenshots** - Analyze specific screenshots from the reference repository
3. **Document Decisions** - Record which platform patterns were adopted and why
4. **Preserve Existing Layout** - Never modify existing sidebar, topbar, or LayoutDemo functionality
5. **Extend Design Tokens** - Build upon existing tokens.ts and foundations.ts files

### Critical Design Requirements

#### Work Order Hierarchy (Aspire Model)
- **Two-Tier System**: Work Orders with unique IDs → Work Tickets with unique IDs
- **Granular Costing**: Track costs at Work Ticket level, not just Work Order level
- **Commercial Focus**: B2B aesthetic and workflows throughout
- **Clear Hierarchy**: Visual distinction between Work Order and Work Ticket levels

#### Enterprise Density (ServiceTitan Standards)
- **Information Density**: Maximum data visibility without scrolling
- **Professional Aesthetic**: Clean, technical appearance for power users
- **Efficient Interactions**: Hover actions, inline editing, bulk operations
- **Data Tables**: 12+ rows visible, compact spacing, quick actions

#### Landscape Industry Features (LMN Best Practices)
- **GPS/Location Integration**: Map views, route optimization, location data
- **Weather Awareness**: Weather-based scheduling and alerts
- **Equipment Tracking**: Vehicle and equipment assignment workflows
- **Seasonal Planning**: Service scheduling based on seasons
- **Field Worker Focus**: Mobile-friendly for outdoor work (but desktop-first)

#### Avoid These Patterns
- ❌ Consumer mobile app aesthetics (from LMN consumer features)
- ❌ Residential/homeowner-focused language and workflows
- ❌ Social media style interactions
- ❌ Single-tier job systems (must support Work Orders → Work Tickets)

### Three-Level Navigation Hierarchy

Platform-ERM follows a strict three-level navigation pattern:

```
Primary Sidebar → SubNav (Secondary Sidebar) → Page Tabs
```

#### Navigation Levels Defined

1. **Primary Sidebar**: Module-level navigation
   - Properties, Work Orders, Contacts, Companies, Dashboard
   - High-level business functions

2. **SubNav (Secondary Sidebar)**: Feature-level navigation within a module
   - Properties: Property List | Property Map | Property Reports
   - Work Orders: Active Orders | Scheduling Board | Order History
   - Different features/pages within the same module

3. **Page Tabs**: View-level navigation for the SAME entity
   - Property (ID: 12345): Overview | Details | Work Tickets | History | Documents
   - Work Order (WO-001): Overview | Work Tickets | Resources | Invoicing | Communication
   - Different views of the same record/entity

#### Critical Rule: Tab Usage

✅ **Correct Tab Usage** (different views of same entity):
- Viewing Property #12345: Overview | Details | Work Tickets | History | Documents
- Viewing Work Order WO-001: Overview | Work Tickets | Resources | Invoicing
- Viewing Contact John Doe: Information | History | Notes | Properties | Communications

❌ **Incorrect Tab Usage** (different entities - use SubNav instead):
- Properties vs Work Orders vs Contacts (use Primary Sidebar)
- Property List vs Property Map vs Property Reports (use SubNav)
- Active Orders vs Completed Orders vs Scheduled Orders (use SubNav)

### UI Component Commands

Use these standardized approaches for UI development:

- **`/ui-component [name]`** - Generate three platform-inspired variants
- **`/ui-layout [section]`** - Extend layout while preserving existing structure
- **`/ui-workorder`** - Create Work Order hierarchy components
- **`/ui-tabs [entity]`** - Generate tab navigation for entity detail views
- **`/ui-review`** - Validate against three-platform standards and navigation hierarchy

### Design System Files

The UI design system consists of:

1. **`docs/UI_DESIGN_SYSTEM.md`** - Enterprise design system specification
2. **`docs/COMPONENT_ITERATIONS.md`** - Three-platform comparison framework
3. **`docs/UI_CLAUDE_COMMANDS.md`** - Standardized component generation commands
4. **`docs/SCREENSHOTS/README.md`** - Screenshot analysis methodology
5. **`frontend/src/styles/enterpriseTokens.ts`** - Extended design tokens
6. **`frontend/src/components/iterations/`** - Platform-inspired component variants

### Multi-Tenant UI Considerations

- **Tenant Theming**: Support custom primary colors while maintaining professional standards
- **Component Consistency**: All UI variants must work with tenant branding
- **Layout Preservation**: Existing sidebar/topbar tenant integration must remain intact

### Mobile/Responsive Strategy

- **Desktop First**: Primary focus on desktop power users
- **Tablet Adaptation**: Maintain functionality with adjusted spacing
- **Mobile Field Use**: Simplified layouts for field workers checking information
- **Never Compromise Desktop**: Desktop efficiency is the priority

### Accessibility and Performance

- **WCAG 2.1 AA**: All components must meet accessibility standards
- **Keyboard Navigation**: Full keyboard support for all interactions
- **Screen Reader Support**: Proper ARIA labels and semantic markup
- **Performance**: Virtualization for large datasets, lazy loading for modules

## Multi-Agent Git Workflow Coordination

**CRITICAL**: Multi-agent development requires strict Git workflow coordination to prevent conflicts and maintain code quality.

### Agent Responsibilities & Boundaries

#### Agent 1 (Properties Frontend Specialist)
- **Scope**: React components, UI/UX, Properties module frontend
- **Branch Pattern**: `feature/properties-*`
- **Can work independently on**: UI components, styling, frontend logic, component iterations
- **Must coordinate on**: API contracts, shared TypeScript types, navigation changes

#### Agent 2 (Backend & Systems Specialist)  
- **Scope**: .NET APIs, database, system architecture, DevOps, documentation
- **Branch Pattern**: `feature/backend-*`, `feature/api-*`, `feature/docs-*`
- **Can work independently on**: Backend services, database schema, API endpoints, documentation
- **Must coordinate on**: API contracts, deployment changes, database migrations, breaking changes

#### Agent 3 (Mobile & Integration Specialist)
- **Scope**: PWA/mobile features, external integrations, testing
- **Branch Pattern**: `feature/mobile-*`, `feature/integration-*`
- **Can work independently on**: Mobile components, API integrations, test suites
- **Must coordinate on**: API dependencies, deployment configurations, shared interfaces

### Daily Git Coordination Protocol

1. **Start of Session**: 
   ```bash
   git checkout develop && git pull origin develop
   ```

2. **Create Feature Branch**:
   ```bash
   git checkout -b feature/[agent-scope]-[description]
   # Examples:
   # feature/properties-list-component
   # feature/backend-purchase-orders
   # feature/mobile-responsive-cards
   ```

3. **Work Progress**:
   - Commit frequently with descriptive messages
   - Push progress regularly to avoid data loss
   - Update completion-log.md for major milestones

4. **End of Session**: 
   - Push all changes to feature branch
   - Update todos and documentation if significant work completed

### API Contract Coordination (CRITICAL)

When frontend and backend agents need to coordinate on API contracts:

1. **Create Integration Branch**:
   ```bash
   git checkout develop
   git checkout -b integration/[feature]-api-contracts
   ```

2. **Both Agents Work Together**:
   - **Agent 2**: Creates DTOs in `/backend/src/PlatformERM.Application/DTOs/`
   - **Agent 1**: Creates matching TypeScript in `/frontend/src/types/`
   - Both push/pull frequently to stay in sync

3. **Merge When Stable**:
   ```bash
   git checkout develop
   git merge integration/[feature]-api-contracts
   git push origin develop
   ```

4. **Update Feature Branches**:
   ```bash
   # Each agent syncs their feature branch
   git checkout feature/[your-branch]
   git merge origin/develop
   ```

**See `/docs/development/git-coordination-workflow.md` for complete coordination patterns.**

5. **Cross-Agent Issues**: Use GitHub Issues with `coordination` label and @mentions

### File Ownership Rules

#### Agent 1 Owns:
- `/frontend/src/components/` (UI components)
- `/frontend/src/modules/properties/` (Properties module)
- `/frontend/src/styles/` (Design tokens and styling)
- `/docs/features/ui-*` (UI feature documentation)
- `/docs/UI_*` (UI design system files)

#### Agent 2 Owns:
- `/backend/src/` (All backend code)
- `/docs/features/api-*` (API feature documentation)
- `/docs/development/` (Architecture and development guides)
- Database migration files
- `/docs/tracking/` (Work tracking and coordination)
- Root documentation files (CLAUDE.md, README.md)

#### Agent 3 Owns:
- `/frontend/src/mobile/` (Mobile-specific components)
- `/docs/features/mobile-*` (Mobile feature documentation)
- Integration test files
- `/frontend/src/api/integrations/` (External API integrations)

#### Shared (Coordination Required):
- `/frontend/src/api/` (API client interfaces - coordinate API contracts)
- `/frontend/src/types/` (TypeScript definitions - coordinate data structures)
- `package.json` and dependencies (coordinate version changes)
- Database schema changes (coordinate with all agents using API)
- Navigation structure changes (coordinate UI hierarchy impacts)

### Cross-Agent Communication Rules

#### API Changes Protocol
1. **Create GitHub Issue** with title: `[API] Description of change`
2. **Tag relevant agents** with @mentions
3. **Include**: 
   - Current API behavior
   - Proposed changes
   - Impact on frontend/mobile
   - Timeline for implementation

#### Breaking Changes Protocol
1. **Discuss in GitHub Issues** before implementing
2. **Create coordination plan** with migration steps
3. **Notify all affected agents** with timeline
4. **Implement in coordinated sequence** (backend → frontend → mobile)

#### Integration Work Protocol
1. **Use coordination issue template** (when created)
2. **Define integration points** clearly
3. **Test coordination** with realistic data
4. **Document integration patterns** for future reference

#### Urgent Coordination
- **Use `urgent` label** on GitHub issues
- **Mention all agents** in issue description
- **Provide clear action items** and deadlines
- **Follow up within 24 hours**

### Commit Message Standards

Follow Conventional Commits format:
```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring
- `test`: Adding or modifying tests
- `chore`: Maintenance tasks

**Scopes by Agent:**
- Agent 1: `ui`, `properties`, `components`, `styles`
- Agent 2: `api`, `backend`, `database`, `docs`
- Agent 3: `mobile`, `integration`, `testing`

**Examples:**
```
feat(properties): add property list component with three platform variants
fix(api): resolve tenant isolation issue in properties controller
docs(coordination): update multi-agent workflow protocols
style(ui): apply enterprise design tokens to property cards
```

### Branch Management

#### Main Branches
- **`main`**: Production-ready code
- **`develop`**: Integration branch for ongoing development
- **`feature/*`**: Feature development branches

#### Branch Workflow
1. **Create feature branch** from `develop`
2. **Work on feature** with regular commits
3. **Create Pull Request** to `develop` when ready
4. **Code review** by other agents (if cross-cutting)
5. **Merge to develop** after approval
6. **Delete feature branch** after merge

#### Conflict Resolution
1. **Identify conflict source** (usually shared files)
2. **Create coordination issue** to discuss resolution
3. **Coordinate merge strategy** between affected agents
4. **Test integration** after conflict resolution
5. **Document resolution pattern** for future reference

### Agent Identity System

When starting a fresh session, agents must identify themselves using:

#### Agent Identification Process
1. **Check Terminal Name**: Match your terminal to your agent identity
   - "Claude Code Agent 1" = Properties Frontend Specialist
   - "Claude Code Agent 2" = Backend & Systems Specialist
   - "Claude Code Agent 3" = Mobile & Integration Specialist

2. **Read Role File**: `/docs/agents/agent-[number]-role.md` for your complete identity

3. **Use Quick Startup Prompt**: From your role file to establish context

4. **Follow Startup Checklist**: In your role documentation

#### Agent Quick Reference
- **Agent 1**: Properties Frontend (`feature/properties-*` branches)
- **Agent 2**: Backend & Systems (`feature/backend-*` branches)  
- **Agent 3**: Mobile & Integration (`feature/mobile-*` branches)

#### Daily Workflow
Every fresh session:
1. **Terminal name** → Agent identity
2. **Copy-paste startup prompt** from role file
3. **Follow CLAUDE.md startup protocol**
4. **Continue assigned work** on appropriate feature branch

This multi-agent coordination system ensures smooth parallel development while maintaining Platform-ERM's architectural integrity and preventing conflicts between concurrent development sessions.

## Advanced Feature Management System

### Feature Documentation Standards
When working on new features, follow these documentation practices:

1. **Check for Existing Documentation**: Always verify if feature documentation exists in `/docs/features/`
2. **Create Feature Plans**: For new modules, create `docs/features/[feature-name]-plan.md` with:
   - Business context and Aspire/LMN limitations addressed
   - Technical approach and architecture
   - Entity relationships and API design
   - UI/UX requirements with three-platform variants
   - Testing strategy and success metrics

3. **Update Feature Relationships**: Maintain `/docs/development/feature-relationships.md` with:
   - Dependencies on other features
   - Features that this enables
   - Cross-agent coordination requirements
   - Implementation sequence

### Epic Branch Management
For complex features spanning multiple agents:

```bash
# Epic branch pattern for large features
feature/epic-purchase-orders/
├── feature/properties-po-integration     # Agent 1 work
├── feature/backend-po-api                # Agent 2 work
└── feature/mobile-po-workflow           # Agent 3 work

# Integration branches for cross-agent coordination
feature/integration-api-contracts/
├── Agent 1 frontend API client updates
└── Agent 2 backend contract changes
```

**Epic Branch Rules**:
1. Create epic branch from `develop`
2. Create agent-specific branches from epic branch
3. Merge agent branches back to epic branch
4. Integration test on epic branch
5. Merge epic to `develop` when all agents complete

### Feature Coordination Checklist
Before starting any new feature:
- [ ] Check `/docs/development/feature-relationships.md` for dependencies
- [ ] Verify all prerequisite features are complete or in progress
- [ ] Create GitHub coordination issue if cross-agent work needed
- [ ] Document feature plan in `/docs/features/`
- [ ] Update feature relationships document

## Custom Slash Commands

### End-of-Session Protocol
Use `/project:end-session` to complete your development session with proper Git workflow and progress tracking.

### Available Commands
- `/project:end-session` - Complete session with commit, push, and progress updates
- `/project:start-session-agent1` - Agent 1 startup with Properties context restoration
- `/project:start-session-agent2` - Agent 2 startup with system coordination context
- `/project:start-session-agent3` - Agent 3 startup with integration testing context
- `/project:switch-agent-assignment` - Transition agent to new module/feature assignment

### Creating Additional Commands
Custom commands are stored in `.claude/commands/` directory as Markdown files. Each agent can create workflow-specific commands as needed.

## Enhanced Session Management

### Session Context System
Platform-ERM uses a session context system to eliminate the "empty terminal memory" problem and enable seamless handoffs between development sessions.

**Session Context Files**: Each agent maintains daily context files in `.claude/sessions/` that capture:
- Current work status and progress percentage
- Mental state and active problem-solving context
- Technical decisions and architectural insights
- Blockers, questions, and coordination needs
- Specific next steps for seamless continuation

**File Format**: `.claude/sessions/YYYY-MM-DD-agent[X].md`

### Daily Workflow Integration

**Starting a Session**:
1. Use `/project:start-session-agent[X]` command for your agent number
2. Command will guide you through context restoration
3. Review previous session's mental state and progress
4. Verify development environment readiness
5. Continue exactly where you left off

**Ending a Session**:
1. Use `/project:end-session` command as usual
2. Command now includes session context capture
3. Document your mental state and key decisions
4. Record specific next steps (not generic "continue work")
5. Note any cross-agent coordination needs

### Terminal Identity Management
Startup commands optionally rename terminal windows for clear agent identification:
- "Frontend Agent 1 - Properties"
- "Backend Agent 2 - Systems"
- "Mobile Agent 3 - Integration"

This visual identification helps prevent agent confusion in multi-terminal environments.

### Benefits of Session Context
- **Seamless Handoffs**: Next session starts with full context
- **Mental State Preservation**: Remember not just what, but why and how
- **Better Coordination**: Cross-agent needs clearly documented
- **Reduced Ramp-up Time**: No need to reconstruct previous thinking
- **Knowledge Retention**: Technical insights preserved between sessions

### Session System Maintenance
The `.claude` directory is version controlled and shared across all branches. For details on maintaining and updating session management files, see `/docs/development/session-management-guide.md`.

### Agent Assignment Management

Platform-ERM supports dynamic agent assignment transitions to optimize resource allocation and module development flow.

**Assignment Switching Process**:
1. Use `/project:switch-agent-assignment` command
2. Complete current work to logical stopping point
3. Document transition context in session files
4. Update agent role file with new assignment
5. Preserve assignment history for reference

**Assignment History Tracking**:
- Each agent role file maintains complete assignment history
- Transition reasons and handoff notes preserved
- Cross-agent coordination requirements updated
- Feature relationship dependencies adjusted

**Benefits**:
- Smooth transitions between modules
- No loss of context during reassignments
- Clear handoff documentation
- Complete audit trail of agent work