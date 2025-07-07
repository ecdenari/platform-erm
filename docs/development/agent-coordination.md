# Agent Coordination Protocol

This document establishes coordination protocols for multiple Claude Code agents working on Platform-ERM development.

## Required Reading Checklist

Before starting any development work, agents MUST read these documents in order:

### 1. Master Configuration (REQUIRED)
- [ ] `/docs/development/CLAUDE.md` - Primary development rules and architecture guidelines
- [ ] `/docs/development/architecture-guide.md` - Technical architecture and patterns
- [ ] `/docs/development/agent-coordination.md` - This coordination protocol

### 2. Current Work Status (REQUIRED)
- [ ] `/docs/tracking/completion-log.md` - Live tracking of completed work and current status
- [ ] TodoRead tool output - Current todo list and pending tasks

### 3. Project Context (RECOMMENDED)
- [ ] Main README.md - Project overview and setup instructions
- [ ] `/docs/features/` directory - Existing feature documentation
- [ ] `/docs/UI_DESIGN_SYSTEM.md` - UI component standards and three-platform approach

## Startup Protocol

### Step 1: Document Review
1. **Read CLAUDE.md first** - Contains critical architecture rules and requirements
2. **Check completion-log.md** - Understand what has been completed and current project state
3. **Use TodoRead** - Check for existing todos and understand current work phase
4. **Review relevant feature docs** - Read any `/docs/features/` documentation related to your task

### Step 2: Work Coordination
1. **Create or update todo list** using TodoWrite tool for multi-step tasks
2. **Mark tasks as in_progress** when starting work
3. **Only work on one task at a time** - Mark as in_progress, complete, then move to next
4. **Update completion-log.md** when finishing significant work

### Step 3: Architecture Compliance
1. **Verify multi-tenancy** - All entities must include TenantId
2. **Check API structure** - Internal vs Public API placement
3. **Follow naming conventions** - Backend and frontend naming standards
4. **Preserve existing layout** - Never modify sidebar, topbar, or LayoutDemo

## Work Coordination Rules

### Todo Management
- **Always use TodoWrite/TodoRead** for multi-step tasks (required by CLAUDE.md)
- **Real-time updates** - Mark in_progress when starting, completed when done
- **One active task** - Only one todo should be in_progress at a time
- **Complete before continuing** - Finish current task before starting new ones
- **Remove irrelevant tasks** - Clean up todos that are no longer needed

### Task Completion Requirements
Mark tasks as completed ONLY when:
- ✅ Implementation is fully functional
- ✅ All tests pass (if applicable)
- ✅ Code follows architecture guidelines
- ✅ Multi-tenancy is properly implemented
- ✅ No blocking errors remain

Do NOT mark as completed if:
- ❌ Tests are failing
- ❌ Implementation is partial
- ❌ Unresolved errors exist
- ❌ Architecture violations present

### Communication Between Agents
1. **Use completion-log.md** - Document your work for future agents
2. **Update CLAUDE.md** - Add new requirements or clarifications if needed
3. **Create feature docs** - Add `/docs/features/[feature-name]-plan.md` for new modules
4. **Note blockers** - Document any issues that prevent completion

## Completion Documentation Requirements

When completing significant work, agents must:

### 1. Update Completion Log
Add entry to `/docs/tracking/completion-log.md` with:
- **Date/time** of completion
- **Agent identification** (session info)
- **Summary** of work accomplished
- **Todos completed** with checkboxes
- **Files created/modified** 
- **Next steps** or follow-up work needed
- **Issues or blockers** encountered

### 2. Feature Documentation
For new features or modules:
- Create `/docs/features/[feature-name]-plan.md`
- Include overview, technical approach, API endpoints, UI components
- Update existing feature docs if extending functionality

### 3. Architecture Updates
If adding new patterns or requirements:
- Update CLAUDE.md with new guidelines
- Document new conventions or standards
- Add security considerations if applicable

## Multi-Agent Workflow Examples

### Scenario 1: New Feature Development
```
Agent A: Creates feature plan → Implements backend entities → Updates completion log
Agent B: Reads completion log → Implements services/controllers → Updates completion log  
Agent C: Reads completion log → Implements frontend components → Completes feature
```

### Scenario 2: Bug Fix or Enhancement
```
Agent A: Identifies issue → Creates todos → Fixes backend → Updates completion log
Agent B: Reads completion log → Handles frontend updates → Tests → Completes work
```

### Scenario 3: Architecture Refactoring
```
Agent A: Plans refactoring → Updates multiple files → Documents changes
Agent B: Continues refactoring → Updates dependent components → Tests
Agent C: Validates architecture compliance → Updates documentation → Completes
```

## File Organization Standards

### Documentation Hierarchy
```
docs/
├── development/           # Core development guides
│   ├── CLAUDE.md         # Master rules (moved from root)
│   ├── architecture-guide.md
│   └── agent-coordination.md
├── legacy/               # Archived files
│   ├── CLAUDE_COMPONENT_PROMPTS.md
│   ├── CLAUDE_PROMPTS.md
│   └── SCAFFOLD.md
├── tracking/             # Work tracking
│   └── completion-log.md
├── features/             # Feature-specific documentation
└── [existing docs]       # UI_DESIGN_SYSTEM.md, etc.
```

### Code Organization
- **Backend**: Follow Domain/Application/Infrastructure layers
- **Frontend**: Module-based with `/components/iterations/` for UI variants
- **Tests**: Mirror source structure
- **References**: Keep separate for pattern reference only

## Emergency Protocols

### If Previous Work is Unclear
1. **Read completion-log.md** - Check recent entries for context
2. **Use TodoRead** - Check current todo status
3. **Search codebase** - Use grep/find tools to understand current state
4. **Ask for clarification** - Request user input if critical context is missing

### If Architecture Violations Found
1. **Document the violation** in completion-log.md
2. **Create todo** to fix the violation
3. **Don't proceed** with new work until fixed
4. **Update CLAUDE.md** with clarification to prevent future violations

### If Conflicting Instructions
1. **CLAUDE.md takes precedence** - Master development rules override all else
2. **Document the conflict** in completion-log.md
3. **Request clarification** from user if needed
4. **Update documentation** once resolved

## Success Metrics

Successful agent coordination means:
- **No duplicate work** - Agents build on previous work efficiently
- **Consistent architecture** - All code follows Platform-ERM patterns
- **Complete documentation** - Future agents can understand and continue work
- **Working software** - Each handoff leaves the system in a functional state
- **Clear next steps** - Always documented what needs to happen next

This protocol ensures smooth collaboration and maintains Platform-ERM's architectural integrity across multiple development sessions.