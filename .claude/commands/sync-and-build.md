# Sync and Build

Ensures both agents are synchronized through develop branch and prepares for VS2022 build.

## What This Command Does

1. Commits current agent's work
2. Pushes to feature branch
3. Merges to develop (if needed)
4. Pulls latest develop (gets other agent's work)
5. Ready for VS2022 build

## Full Sync Command

```bash
# 1. Save current work
git add -A
git commit -m "wip: $(git branch --show-current) checkpoint"

# 2. Push to feature branch
git push origin $(git branch --show-current)

# 3. Integrate to develop
git checkout develop
git pull origin develop
git merge $(git branch --show-current) --no-ff -m "integrate: $(git branch --show-current) changes"
git push origin develop

# 4. Return to feature branch with latest
git checkout -
git merge develop

echo "✅ Synced with develop! VS2022 can now build."
```

## Quick Copy-Paste Version

```bash
git add -A && git commit -m "wip: $(git branch --show-current) checkpoint" && git push origin $(git branch --show-current) && git checkout develop && git pull origin develop && git merge $(git branch --show-current) --no-ff -m "integrate: $(git branch --show-current) changes" && git push origin develop && git checkout - && git merge develop && echo "✅ Synced! Ready for VS2022 build."
```

## When to Use This

- **Before building in VS2022** - Ensures clean build
- **After completing a feature** - Shares with other agent
- **Before switching agents** - Prevents lost work
- **At end of session** - Everything saved and shared

## What Each Agent Sees

**Agent 1** (after running sync):
- Has all of Agent 2's backend changes
- Can build and test full stack

**Agent 2** (after running sync):  
- Has all of Agent 1's frontend changes
- Can see UI updates for API testing

## Result

✅ Both agents have latest code
✅ Develop branch is up to date
✅ VS2022 can build without errors
✅ No lost work between agents