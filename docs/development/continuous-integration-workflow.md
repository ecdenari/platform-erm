# Continuous Integration Workflow for Multi-Agent Development

## The Problem

With multiple agents working simultaneously, changes need to be visible across branches multiple times per day to:
- Prevent duplicate work
- Enable API contract coordination
- Share TypeScript types immediately
- Avoid merge conflicts
- Keep all agents in sync

## The Solution: Frequent Integration Pattern

### 1. Hourly Integration Cycles

**Every Hour (or after significant changes):**

```bash
# Agent workflow - BEFORE taking a break or switching tasks
git add .
git commit -m "feat(module): description of changes"
git push origin feature/your-branch

# If changes affect other agents (API, types, shared components):
git checkout develop
git pull origin develop
git merge feature/your-branch --no-ff -m "merge: integrate [module] changes for cross-agent visibility"
git push origin develop

# Return to feature branch
git checkout feature/your-branch
```

### 2. Automated Integration Reminders

Add to `.claude/commands/integration-check.md`:

```markdown
# Integration Check Command

Reminds agents to integrate changes frequently.

## When to Run
- Every hour during active development
- Before switching to a different task
- After creating shared components/types
- Before ending work session

## Integration Checklist
1. Have you created/modified shared types? → Integrate now
2. Have you changed API contracts? → Integrate now
3. Have you been working for >1 hour? → Integrate now
4. Are other agents waiting for your changes? → Integrate now
```

### 3. Enhanced Agent Workflows

#### Start of Work Session
```bash
# ALWAYS start by syncing
git checkout develop
git pull origin develop
git checkout feature/your-branch
git merge develop  # Get others' changes
```

#### During Work (Hourly)
```bash
# Quick integration
git add . && git commit -m "wip: [description]"
git push origin feature/your-branch

# If sharing is needed
git checkout develop
git pull origin develop
git merge feature/your-branch --no-ff
git push origin develop
git checkout feature/your-branch
```

#### End of Work Session
```bash
# Always integrate before leaving
/project:end-session  # This now includes integration
```

### 4. Modified End-Session Command

Update `.claude/commands/end-session.md` to include:

```bash
# After committing changes
echo "Checking if integration to develop is needed..."

# Check for shared file changes
if git diff develop...HEAD --name-only | grep -E "(shared/|\.types\.ts|api/|frontend/src/types/)" > /dev/null; then
    echo "⚠️ Shared files detected! Merging to develop for other agents..."
    git checkout develop
    git pull origin develop
    git merge feature/[current-branch] --no-ff -m "integrate: [module] shared changes"
    git push origin develop
    git checkout feature/[current-branch]
fi
```

### 5. What to Integrate Immediately

**Always integrate these changes IMMEDIATELY:**

1. **TypeScript Types** (`*.types.ts`)
   - Other agents need these for their work
   
2. **API Contracts** (`/shared/api-contracts/`)
   - Critical for frontend/backend coordination
   
3. **Shared Components** (`/shared/`)
   - Common utilities everyone uses
   
4. **API Client Changes** (`/frontend/src/api/`)
   - Frontend agents need these

5. **Database Migrations**
   - Other agents need schema changes

**Can wait for PR review:**
- Module-specific UI components
- Internal business logic
- Documentation updates
- Test files

### 6. Branch Protection Rules

For GitHub (when ready):
```yaml
# develop branch protection
- Require pull request reviews: OFF (for now)
- Require status checks: YES
- Include administrators: NO
- Allow force pushes: NO
- Allow deletions: NO
```

This allows frequent integration while maintaining quality through CI/CD.

### 7. Communication Protocol

**When integrating shared changes:**

1. **Commit message format**:
   ```
   integrate: [module] brief description of shared changes
   
   - Added TypeScript types for X
   - Updated API contract for Y
   - Created shared component Z
   ```

2. **Notify via commit** (others will see on pull):
   No need for constant messages - the commit log tells the story

3. **For breaking changes only**:
   Create GitHub issue with `[BREAKING]` prefix

### 8. Conflict Resolution

**If merge conflicts occur:**

```bash
# Always pull latest first
git checkout develop
git pull origin develop
git checkout feature/your-branch
git merge develop

# Resolve conflicts
# Then continue with integration
```

**Conflict prevention:**
- Smaller, frequent merges = fewer conflicts
- Clear file ownership = less overlap
- Communication for shared files

### 9. Integration Frequency Guidelines

| Change Type | Integration Frequency |
|------------|---------------------|
| New types/interfaces | Immediately |
| API contract changes | Immediately |
| Shared utilities | Within 1 hour |
| New API endpoints | Within 2 hours |
| UI components (shared) | Within 2 hours |
| Module-specific UI | End of day |
| Bug fixes | Based on severity |
| Documentation | End of day |

### 10. Daily Workflow Example

**9:00 AM - Start**
```bash
git checkout develop && git pull
git checkout feature/properties-ui
git merge develop
```

**10:30 AM - Created shared types**
```bash
git add . && git commit -m "feat(properties): add property filter types"
git push origin feature/properties-ui
# Integrate immediately
git checkout develop && git pull
git merge feature/properties-ui --no-ff
git push origin develop
git checkout feature/properties-ui
```

**12:00 PM - Lunch break**
```bash
# Quick integration of morning work
git add . && git commit -m "feat(properties): complete list component"
git push origin feature/properties-ui
git checkout develop && git merge feature/properties-ui --no-ff
git push origin develop
```

**3:00 PM - API changes**
```bash
# Immediate integration for API changes
git add . && git commit -m "feat(api): add property search endpoint"
git push origin feature/backend-api
git checkout develop && git merge feature/backend-api --no-ff
git push origin develop
```

**5:00 PM - End of day**
```bash
/project:end-session  # Handles final integration
```

## Benefits

1. **Always Fresh**: Everyone has latest changes within hours
2. **Fewer Conflicts**: Small, frequent merges
3. **Better Coordination**: Shared work visible immediately
4. **Continuous Integration**: Not just at PR time
5. **Faster Development**: No waiting for PR approvals for WIP

## Rules Summary

1. **Integrate shared files immediately**
2. **Integrate all work at least every 2 hours**
3. **Always integrate before breaks/end of session**
4. **Pull develop at start of each work block**
5. **Use `--no-ff` for merge commits (visibility)**

## Monitoring Integration

Check integration frequency:
```bash
# See recent integrations to develop
git log develop --merges --oneline -20

# See who integrated what today
git log develop --merges --since="1 day ago" --pretty=format:"%h %an %s"

# Check if you have unintegrated changes
git log develop..HEAD --oneline
```

This workflow ensures all agents stay synchronized throughout the day, not just at PR time!