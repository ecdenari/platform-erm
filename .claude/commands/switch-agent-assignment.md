# Switch Agent Assignment

Transition an agent from current module/feature to a new assignment with automatic documentation updates.

## Usage

This command helps agents transition between assignments (e.g., from Properties to Purchase Orders) while preserving context and updating all necessary documentation.

## Instructions

1. **Current Assignment Review**
   - Identify which agent (1, 2, or 3) is switching
   - Review current work status in agent role file
   - Check todos for incomplete work
   - Verify feature completion percentage

2. **New Assignment Details**
   Gather the following information:
   - New module/feature name
   - Feature plan document (create if needed)
   - Branch naming pattern
   - Primary coordination agent
   - Priority level and timeline

3. **Assignment Transition Process**

   **Step 1: Complete Current Work**
   - Finish current task to logical stopping point
   - Commit and push all changes
   - Update todos to reflect handoff items
   
   **Step 2: Create Transition Context**
   Create session context entry for the transition:
   ```markdown
   ## Assignment Transition - [YYYY-MM-DD]
   
   **Previous Assignment**: [Module name]
   - Completion Status: [X]% complete
   - Final Branch: [branch name]
   - Handoff Items: [What needs to be passed to others]
   
   **New Assignment**: [Module name]
   - Feature Plan: [path to plan]
   - Starting Branch: [new branch pattern]
   - Initial Focus: [First tasks to tackle]
   
   **Transition Reason**: [Why switching - completion, priority, etc.]
   
   **Coordination Changes**:
   - Previous: [Who you coordinated with]
   - New: [Who you'll coordinate with]
   ```

   **Step 3: Update Agent Role File**
   Update `/docs/agents/agent-[X]-role.md`:
   ```markdown
   ## Current Assignment
   - **Primary Work**: [New module] development
   - **Feature Plan**: `/docs/features/[feature]-plan.md`
   - **Current Phase**: [Starting phase]
   - **Branch Pattern**: `feature/[pattern]-*`
   - **Coordination**: [Agent coordination needs]
   
   ## Assignment History
   - **[Date]**: [New Assignment] - Status: Active
   - **[Date]**: [Previous Assignment] - Status: [Complete/Transferred]
   ```

   **Step 4: Update Feature Relationships**
   - Check `/docs/development/feature-relationships.md`
   - Update agent assignments for affected features
   - Note any dependency changes
   
   **Step 5: Update Completion Log**
   Add entry to `/docs/tracking/completion-log.md`:
   ```markdown
   ### [Date]: Agent Assignment Transition
   **Agent**: Agent [X] ([Specialization])
   **Transition**: [Previous] → [New Assignment]
   
   #### Transition Details
   - **Previous Work**: [Status and key accomplishments]
   - **Handoff Notes**: [Items passed to other agents]
   - **New Assignment**: [New module/feature focus]
   - **Coordination**: [New coordination requirements]
   ```

4. **Verification Steps**
   - Confirm all current work is committed
   - Verify role file shows new assignment
   - Check feature relationships are updated
   - Ensure session context captures transition
   - Validate new branch pattern works

## Assignment Transition Template

When prompted, provide:

**Current Status:**
- Agent Number: [1/2/3]
- Current Assignment: [Module/Feature name]
- Completion Status: [X% complete]
- Handoff Required: [Yes/No - details]

**New Assignment:**
- Module/Feature: [Name]
- Feature Plan: [Path or "needs creation"]
- Branch Pattern: [e.g., feature/purchase-orders-*]
- Primary Coordination: [Agent X for Y]
- Priority: [High/Medium/Low]
- Timeline: [Expected duration]

**Transition Context:**
- Reason for Switch: [Completion/Priority change/etc.]
- Key Insights to Preserve: [Technical decisions, patterns]
- Blockers to Document: [Unresolved issues]
- Starting Point: [Where to begin new work]

## Quick Transition Checklist
- [ ] Current work at stopping point
- [ ] All changes committed and pushed
- [ ] Todos updated with handoff items
- [ ] Session context transition created
- [ ] Agent role file updated
- [ ] Assignment history added
- [ ] Feature relationships checked
- [ ] Completion log updated
- [ ] New feature plan reviewed
- [ ] Ready to start new assignment

## Integration with Session Management

This command works with the session context system:
- Creates special transition entries in `.claude/sessions/`
- Next `/project:start-session-agent[X]` will recognize the switch
- Preserves both technical and mental context across assignments
- Maintains complete assignment history for reference

## Common Transitions

**Properties → Purchase Orders** (Agent 1)
- Complete UI components to stable state
- Document component patterns used
- Note any API integration points
- Pass design tokens to Agent 2

**Backend API → Documentation** (Agent 2)
- Ensure all endpoints are stable
- Document any architectural decisions
- Update API documentation
- Note integration requirements

**Testing → Mobile Development** (Agent 3)
- Complete test suite to passing state
- Document test patterns established
- Note performance baselines
- Identify mobile optimization opportunities