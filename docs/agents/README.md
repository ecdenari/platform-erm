# Agent Identity System

## Terminal Name = Agent Identity
- **"Claude Code Agent 1"** = Properties Frontend Specialist
- **"Claude Code Agent 2"** = Backend & Systems Specialist  
- **"Claude Code Agent 3"** = Mobile & Integration Specialist (future)

## Daily Startup Process
1. **Check your terminal name** to identify your role
2. **Read your agent role file**: `/docs/agents/agent-[number]-role.md`
3. **Use the Quick Startup Prompt** from your role file
4. **Follow the startup checklist** in your role documentation

## Current Active Agents

### Agent 1: Properties Frontend Specialist
- **Role File**: `/docs/agents/agent-1-role.md`
- **Scope**: React components, UI/UX, Properties module frontend
- **Branch Pattern**: `feature/properties-*`
- **Current Work**: Building Properties module components with enterprise design tokens
- **Coordination**: GitHub Issues for API needs with Agent 2

### Agent 2: Backend & Systems Specialist
- **Role File**: `/docs/agents/agent-2-role.md`
- **Scope**: .NET APIs, database, system architecture, DevOps, documentation
- **Branch Pattern**: `feature/backend-*`, `feature/api-*`, `feature/docs-*`
- **Current Work**: GitHub integration, multi-agent coordination, backend system development
- **Authority**: Documentation structure, architecture decisions, coordination protocols

### Agent 3: Mobile & Integration Specialist (Future)
- **Role File**: `/docs/agents/agent-3-role.md` (to be created when needed)
- **Scope**: PWA/mobile features, external integrations, testing
- **Branch Pattern**: `feature/mobile-*`, `feature/integration-*`
- **Status**: Not yet active - will be created when mobile/integration work begins

## Agent Coordination Matrix

| Agent | Owns | Coordinates With | Communication Method |
|-------|------|------------------|---------------------|
| Agent 1 | Frontend, Properties UI, Styling | Agent 2 (API contracts) | GitHub Issues `[API]` |
| Agent 2 | Backend, APIs, Documentation, Architecture | Agent 1 (TypeScript types), Agent 3 (mobile APIs) | GitHub Issues `coordination` |
| Agent 3 | Mobile, Integrations, Testing | Agent 2 (API dependencies) | GitHub Issues `integration` |

## Quick Reference Guide

### Starting a New Session
1. **Identify yourself**: Check terminal name → Find your agent number
2. **Read role file**: `/docs/agents/agent-[number]-role.md`
3. **Copy startup prompt**: Use the "Quick Startup Prompt" from your role file
4. **Check current status**: Review completion-log.md and TodoRead

### Working on Tasks
1. **Create feature branch**: `feature/[agent-scope]-[description]`
2. **Follow file ownership**: Work only on files you own, coordinate on shared files
3. **Communicate changes**: Use GitHub Issues for coordination needs
4. **Update progress**: Mark todos as completed, update completion-log.md for milestones

### Coordination Scenarios

#### API Changes (Agent 2 → Agent 1)
1. Agent 2 creates GitHub Issue: `[API] Description of change`
2. Include current behavior, proposed changes, frontend impact
3. Agent 1 reviews and provides feedback
4. Implement in sequence: backend → frontend

#### UI Navigation Changes (Agent 1 → Agent 2)
1. Agent 1 creates GitHub Issue: `[UI] Navigation hierarchy change`
2. Include impact on three-level hierarchy, API implications
3. Agent 2 reviews backend impact
4. Coordinate implementation

#### Cross-Cutting Features (Multiple Agents)
1. Create coordination GitHub Issue
2. Use `coordination` label
3. Mention all affected agents
4. Define integration points and dependencies
5. Implement in coordinated sequence

## Agent Handoff Protocol

### When Completing Work
1. **Update completion-log.md** with work summary and next steps
2. **Mark all todos completed** that were finished
3. **Create/update feature documentation** for significant work
4. **Note any blockers or coordination needs** for future agents
5. **Push all changes** to feature branch

### When Starting After Another Agent
1. **Read completion-log.md** to understand current state
2. **Check TodoRead** for pending tasks
3. **Review your role file** for context and current assignment
4. **Check GitHub Issues** for any coordination items
5. **Start with git pull** and create your feature branch

## Communication Standards

### GitHub Issue Titles
- **API Changes**: `[API] Description`
- **UI Changes**: `[UI] Description` 
- **Documentation**: `[DOCS] Description`
- **Coordination**: `[COORDINATION] Description`
- **Urgent**: `[URGENT] Description`

### Labels
- `coordination` - Cross-agent coordination needed
- `api-change` - API contract modification
- `urgent` - Requires immediate attention
- `agent-1`, `agent-2`, `agent-3` - Agent-specific work

### @Mentions
- Use @Agent1, @Agent2, @Agent3 in issues (when GitHub is configured)
- Provide clear action items and deadlines
- Follow up within 24 hours for urgent items

## File Ownership Quick Reference

### Agent 1 (Properties Frontend)
```
✅ /frontend/src/components/
✅ /frontend/src/modules/properties/
✅ /frontend/src/styles/
✅ /docs/features/ui-*
✅ /docs/UI_*
🤝 /frontend/src/api/ (coordinate)
🤝 /frontend/src/types/ (coordinate)
```

### Agent 2 (Backend & Systems)
```
✅ /backend/src/
✅ /docs/features/api-*
✅ /docs/development/
✅ /docs/tracking/
✅ Database migrations
✅ CLAUDE.md, README.md
🤝 API contracts (define)
🤝 TypeScript types (coordinate)
```

### Agent 3 (Mobile & Integration) - Future
```
✅ /frontend/src/mobile/
✅ /docs/features/mobile-*
✅ Integration tests
✅ /frontend/src/api/integrations/
🤝 Mobile API requirements (coordinate)
🤝 External integration APIs (coordinate)
```

## Success Indicators

### Smooth Coordination
- ✅ No merge conflicts on shared files
- ✅ Clear communication via GitHub Issues
- ✅ Regular completion-log.md updates
- ✅ Agents work efficiently in parallel

### Quality Maintenance
- ✅ Architecture rules followed by all agents
- ✅ Multi-tenant patterns maintained
- ✅ Documentation stays current
- ✅ No cross-cutting feature conflicts

This agent identity system ensures clear roles, smooth coordination, and efficient parallel development while maintaining Platform-ERM's architectural integrity.