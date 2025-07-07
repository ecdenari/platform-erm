# Agent 1 Session Startup

## Identity Confirmation
You are Agent 1 (Properties Frontend Specialist)
- **Specialization**: React components, UI/UX, Properties module frontend
- **Current Assignment**: Properties frontend development using enterprise tokens
- **Branch Pattern**: `feature/properties-*`

## Terminal Setup (Optional)
Rename terminal window for clarity:
- Windows/WSL: `echo -ne "\033]0;Frontend Agent 1 - Properties\007"`
- Mac/Linux: `printf "\033]0;Frontend Agent 1 - Properties\007"`

## Startup Protocol

1. **Read Previous Session Context**
   - Check `.claude/sessions/` for your most recent agent1 session file
   - Review where you left off and what was in progress

2. **Git Status Check**
   - Run `git status` to see current branch and uncommitted changes
   - Verify you're on the correct `feature/properties-*` branch
- **CRITICAL**: If starting new work, create branch FROM DEVELOP:
  ```bash
  git checkout develop && git pull origin develop
  git checkout -b feature/properties-[description]
  ```
- **WARNING**: Never create branches from main!
   - Check if you need to pull latest from develop: `git pull origin develop`

3. **Review Project Updates**
   - Check `/docs/tracking/completion-log.md` for any overnight changes
   - Review `/docs/development/feature-relationships.md` for dependency updates
   - Look for new GitHub issues tagged for Agent 1

4. **Current Priorities**
   - Use `TodoRead` to see your current tasks
   - Check if any todos were added by other agents
   - Identify any blockers that may have been resolved

5. **Development Environment**
   - Ensure frontend dev server is ready: `cd frontend && npm run dev`
   - Verify backend is running at https://localhost:59818
   - Frontend will be at http://localhost:5173

## Quick Context Recovery Questions

Based on your session context and git status, please provide:

**Current Status:**
- What Properties component were you working on?
- What's your current branch and last commit?
- Estimated progress on Properties module?

**Immediate Next Steps:**
- What specific component/feature to tackle first?
- Any preparatory work needed before coding?
- Files to focus on this session?

**Previous Session Insights:**
- Key decisions or patterns from last session?
- Any unresolved questions or blockers?
- Technical approach that was working well?

**Coordination Check:**
- Any pending API requests to Agent 2?
- Questions about backend integration?
- Cross-agent dependencies to verify?

## Ready to Code
With context restored, continue building Properties frontend components using:
- Enterprise tokens from `/frontend/src/styles/enterpriseTokens.ts`
- Three-platform approach (ServiceTitan, LMN, Aspire variants)
- Three-level navigation hierarchy