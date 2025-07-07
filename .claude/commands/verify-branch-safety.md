# Branch Safety Verification

Ensure you're working on the correct branch and following Platform-ERM's Git workflow.

## Instructions

1. **Check Current Branch**
   ```bash
   git branch --show-current
   ```

2. **Verify Branch Rules**
   - ✅ **ALLOWED**: Working on `develop` branch for quick documentation updates
   - ✅ **ALLOWED**: Working on `feature/*` branches for development
   - ✅ **ALLOWED**: Working on `integration/*` branches for API coordination
   - ❌ **FORBIDDEN**: Making changes directly on `main` branch
   - ❌ **FORBIDDEN**: Creating feature branches from `main`

3. **If on Main Branch**
   ```bash
   # STOP! Don't make changes on main
   # Switch to develop immediately:
   git checkout develop
   git pull origin develop
   ```

4. **Creating New Feature Branch**
   ```bash
   # ALWAYS create from develop:
   git checkout develop
   git pull origin develop
   git checkout -b feature/[agent-scope]-[description]
   ```

5. **Branch Patterns by Agent**
   - **Agent 1**: `feature/properties-*`
   - **Agent 2**: `feature/backend-*`, `feature/api-*`, `feature/docs-*`
   - **Agent 3**: `feature/mobile-*`, `feature/integration-*`, `feature/testing-*`

## Safety Checks

Run these checks before starting work:

```bash
# 1. What branch am I on?
git branch --show-current

# 2. Is it up to date with develop?
git fetch origin
git log --oneline develop..HEAD  # Shows commits not in develop
git log --oneline HEAD..develop  # Shows commits in develop not in your branch

# 3. Do I need to sync with develop?
git merge origin/develop  # If you need latest changes
```

## Common Mistakes to Avoid

1. **Creating branches while on main**
   ```bash
   # WRONG - This creates branch from main
   git checkout main
   git checkout -b feature/new-feature
   
   # RIGHT - Always from develop
   git checkout develop
   git pull origin develop
   git checkout -b feature/new-feature
   ```

2. **Working directly on main**
   ```bash
   # WRONG - Never edit on main
   git checkout main
   # [making changes]
   
   # RIGHT - Use feature branches
   git checkout -b feature/my-changes
   ```

3. **Not syncing with develop**
   ```bash
   # WRONG - Working with outdated code
   git checkout -b feature/new-work  # From old state
   
   # RIGHT - Always pull latest first
   git checkout develop
   git pull origin develop
   git checkout -b feature/new-work
   ```

## Emergency Recovery

If you accidentally committed to main:

```bash
# 1. Create a feature branch with your changes
git checkout -b feature/emergency-recovery

# 2. Switch back to main
git checkout main

# 3. Reset main to origin (WARNING: This removes local changes)
git reset --hard origin/main

# 4. Continue work on feature branch
git checkout feature/emergency-recovery
```

Remember: Platform-ERM uses `develop` as the integration branch. All feature work should branch from and merge back to `develop`. The `main` branch is for stable, production-ready code only.