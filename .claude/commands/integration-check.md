# Integration Check

Ensures changes are integrated to develop branch for cross-agent visibility.

## When to Use

Run this command:
- Every hour during active development
- After creating shared types or API contracts
- Before switching tasks
- When other agents need your changes

## Instructions

1. **Check Integration Status**
   ```bash
   # See what changes you have that aren't in develop
   git log develop..HEAD --oneline
   
   # Check for shared files
   git diff develop...HEAD --name-only | grep -E "(shared/|\.types\.ts|api/|frontend/src/types/)"
   ```

2. **Integration Decision Tree**

   **Have you modified shared files?** (types, API contracts, shared components)
   → YES: Integrate immediately
   → NO: Continue to next question
   
   **Have you been working for >1 hour?**
   → YES: Integrate now
   → NO: Continue to next question
   
   **Are other agents blocked waiting for your changes?**
   → YES: Integrate immediately
   → NO: Continue working, integrate within 2 hours

3. **Perform Integration**
   ```bash
   # Commit current work
   git add .
   git commit -m "feat(module): description"
   git push origin feature/your-branch
   
   # Integrate to develop
   git checkout develop
   git pull origin develop
   git merge feature/your-branch --no-ff -m "integrate: [module] changes for visibility"
   git push origin develop
   
   # Return to feature branch
   git checkout feature/your-branch
   ```

4. **Manual Push Commands**
   ```bash
   # If authentication fails, user must run:
   git push -u origin feature/your-branch
   git checkout develop
   git push origin develop
   ```

## Integration Triggers

**Immediate Integration Required:**
- ✅ Any `*.types.ts` files
- ✅ Files in `/shared/` directory
- ✅ API contracts in `/shared/api-contracts/`
- ✅ Frontend API client (`/frontend/src/api/`)
- ✅ Backend DTOs
- ✅ Database migrations

**Can Wait (but integrate within 2 hours):**
- Module-specific UI components
- Business logic implementations
- Test files
- Documentation

## Quick Check Script

```bash
# Run this to see if you need to integrate
echo "Checking for integration needs..."

# Check time since last integration
last_merge=$(git log develop --merges --author="$(git config user.name)" -1 --format="%ar")
echo "Your last integration: $last_merge"

# Check for shared files
if git diff develop...HEAD --name-only 2>/dev/null | grep -E "(shared/|\.types\.ts|api/|frontend/src/types/)" > /dev/null; then
    echo "⚠️  SHARED FILES DETECTED - Integration required!"
else
    echo "✅ No shared files detected"
fi

# Count uncommitted changes
changes=$(git diff develop...HEAD --name-only 2>/dev/null | wc -l)
echo "📊 You have $changes changed files not in develop"
```

## Best Practices

1. **Small, Frequent Integrations** - Less chance of conflicts
2. **Clear Commit Messages** - Use "integrate:" prefix for merge commits
3. **Test Before Integrating** - Ensure your changes work
4. **Communicate Breaking Changes** - Create GitHub issue if needed
5. **Pull Before Pushing** - Always get latest develop first

Remember: The goal is continuous visibility, not perfect code. Work-in-progress is fine to integrate!