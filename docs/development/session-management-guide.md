# Session Management System Guide

## Overview

Platform-ERM uses a sophisticated session management system to enable seamless development continuity across multiple Claude Code sessions. This system is implemented through the `.claude` directory, which contains custom commands and session context files.

## Critical: `.claude` Directory Management

### Git Tracking
The `.claude` directory is **intentionally tracked by Git** and should remain so. This ensures:
- All agents have access to custom commands regardless of branch
- Session management tools are always available
- Command updates propagate to all developers

### Handling Updates to `.claude` Files

When updating files in the `.claude` directory:

1. **Commit Normally**: These files are part of the codebase
   ```bash
   git add .claude/commands/new-command.md
   git commit -m "feat(tools): Add new custom command for X workflow"
   ```

2. **Branch Strategy**: 
   - Command updates should typically be made on `develop` branch
   - Merge to `main` during regular release cycles
   - Critical fixes can be hotfixed directly to `main`

3. **Session Files Exception**:
   - `.claude/sessions/*.md` files are for temporary context
   - These can be committed for important handoffs
   - Old session files can be periodically cleaned up

### Best Practices

#### For Command Files (`.claude/commands/`)
- **DO**: Version control all command files
- **DO**: Update commands when workflows change
- **DO**: Document command purpose clearly
- **DON'T**: Add user-specific commands (keep generic)

#### For Session Files (`.claude/sessions/`)
- **DO**: Commit important transition sessions
- **DO**: Clean up old sessions periodically
- **DON'T**: Commit every single session file
- **DON'T**: Include sensitive information

### Common Scenarios

#### Adding a New Command
```bash
# Create command on feature branch
git checkout -b feature/new-workflow-command
# Create .claude/commands/new-command.md
git add .claude/commands/new-command.md
git commit -m "feat(tools): Add command for new workflow"
git push origin feature/new-workflow-command
# Create PR to develop
```

#### Updating Existing Command
```bash
# Work on develop or feature branch
git checkout develop
# Edit .claude/commands/existing-command.md
git add .claude/commands/existing-command.md
git commit -m "fix(tools): Update end-session command for new Git workflow"
git push origin develop
```

#### Important Session Handoff
```bash
# After critical work requiring handoff
git add .claude/sessions/2025-01-15-critical-handoff.md
git commit -m "docs(session): Critical session context for Purchase Order integration"
git push origin feature/purchase-orders
```

## Command Maintenance

### Regular Reviews
- Review commands quarterly for relevance
- Update for new Git workflows or processes
- Remove obsolete commands
- Ensure compatibility with latest Platform-ERM architecture

### Documentation Requirements
Each command file should include:
- Clear description of purpose
- Usage instructions
- Prerequisites
- Error handling guidance
- Related commands

## Integration with Development Workflow

### Branch Switching
Since `.claude` is tracked by Git:
- Commands available on all branches after merge
- New branches inherit commands from parent
- No manual copying needed

### Multi-Agent Coordination
- All agents share same command set
- Updates by one agent benefit all
- Consistent workflows across team

### CI/CD Considerations
- `.claude` directory included in deployments
- Commands available in all environments
- Can be used for deployment automation

## Troubleshooting

### Missing Commands After Branch Switch
This should not happen since `.claude` is tracked. If it does:
1. Check branch is up to date: `git pull origin [branch]`
2. Verify files exist: `ls -la .claude/commands/`
3. Check for merge conflicts

### Command Not Working
1. Verify command file syntax
2. Check for breaking changes in workflow
3. Update command if Platform-ERM structure changed

### Session File Conflicts
1. Session files rarely conflict (date-stamped)
2. If conflict occurs, keep both versions
3. Manually merge important context

## Summary

The `.claude` directory is a first-class citizen in Platform-ERM's codebase. Treat it with the same care as source code:
- Version control all commands
- Document changes clearly
- Review and maintain regularly
- Share improvements with team

This approach ensures consistent, powerful development workflows across all agents and sessions.