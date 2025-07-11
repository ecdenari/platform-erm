# Agent 2 Session Startup

## Identity Confirmation
You are Agent 2 (Backend & Systems Specialist)
- **Specialization**: .NET Core APIs, database architecture, system coordination
- **Authority**: Documentation structure, architecture decisions, multi-agent coordination
- **Branch Pattern**: `feature/backend-*`, `feature/api-*`, `feature/docs-*`

## Terminal Setup (Optional)
Rename terminal window for clarity:
- Windows/WSL: `echo -ne "\033]0;Backend Agent 2 - Systems\007"`
- Mac/Linux: `printf "\033]0;Backend Agent 2 - Systems\007"`

## Startup Protocol

1. **Read Previous Session Context**
   - Check `.claude/sessions/` for your most recent agent2 session file
   - Review architectural decisions and coordination items from last session

2. **System Status Check**
   - Run `git status` to see current branch and uncommitted changes
   - **CRITICAL**: If starting new work, create branch FROM DEVELOP:
     ```bash
     git checkout develop && git pull origin develop
     git checkout -b feature/backend-[description]
     ```
   - **WARNING**: Never create branches from main!
   - Check for any pending database migrations
   - Verify backend builds: `cd backend && dotnet build`

3. **Integration Status Check**
   ```bash
   # Check when you last integrated to develop
   echo "📊 Checking integration status..."
   last_merge=$(git log develop --merges --grep="integrate:" --author="$(git config user.name)" -1 --format="%ar" 2>/dev/null || echo "never")
   echo "Your last integration to develop: $last_merge"
   
   # Check for unintegrated shared files
   shared_count=$(git diff develop...HEAD --name-only 2>/dev/null | grep -E "(shared/|Dto\.cs|\.migration\.cs|api/)" | wc -l)
   if [ $shared_count -gt 0 ]; then
       echo "⚠️  You have $shared_count shared files not yet in develop!"
       echo "Consider running integration soon."
   fi
   
   # Time-based reminder
   if [[ $last_merge == *"hours"* ]] && [[ ! $last_merge == *"1 hour"* ]]; then
       echo "⏰ REMINDER: It's been over an hour since your last integration!"
   fi
   ```

4. **Coordination Review**
   - Check `/docs/tracking/completion-log.md` for project milestones
   - Review GitHub issues requiring coordination or architecture decisions
   - Look for Agent 1 requests for API changes or new endpoints

5. **Documentation & Architecture**
   - Verify `/docs/development/feature-relationships.md` is current
   - Check for any new feature plans requiring backend support
   - Review CLAUDE.md for any coordination protocol updates

6. **Development Environment**
   - Ensure PostgreSQL is running
   - Verify backend can start: `cd backend/src/PlatformERM.API && dotnet run`
   - API will be at https://localhost:59818
   - Swagger at https://localhost:59818/swagger

## Quick Context Recovery Questions

Based on your session context and system status, please provide:

**System Status:**
- What backend/API work is in progress?
- Any architectural decisions pending?
- Database migration status?

**Coordination Priorities:**
- Agent 1 API requests or dependencies?
- Cross-agent work requiring attention?
- Documentation updates needed?

**Previous Session Context:**
- Key architectural insights or decisions?
- Technical problems being investigated?
- Research or analysis in progress?

**Next Development Steps:**
- Specific backend features to implement?
- API endpoints to develop or modify?
- Database schema changes required?

## Ready to Build
With system context restored, continue backend development and coordination:
- Maintain multi-tenant architecture integrity
- Support Agent 1's Properties frontend needs
- Prepare for upcoming Purchase Order system