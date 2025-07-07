# End Session Protocol

Complete your development session with proper Git workflow, progress tracking, and session context capture.

## Instructions

1. **Review Current Changes**
   - Run `git status` to see modified files
   - Review what work was completed this session

2. **Commit Changes**
   - Stage changes: `git add .`
   - Create commit with conventional format:
     - `feat(scope): description` for new features
     - `fix(scope): description` for bug fixes
     - `docs(scope): description` for documentation

3. **Push to Feature Branch**
   - Attempt push: `git push origin [current-branch]`
   - If authentication fails, provide manual command:
     ```bash
     # Manual push command for user to run:
     git push -u origin [current-branch]
     ```
   - Ensure all work is safely stored on GitHub

4. **Update Progress Tracking**
   - Mark completed todos as done using TodoWrite
   - Update completion-log.md if significant milestones reached
   - Document next steps for tomorrow's session
   - Note any cross-agent coordination needed

5. **Capture Session Context**
   Create/update your session context file at `.claude/sessions/YYYY-MM-DD-agent[X].md` with:

   **Current Work Status:**
   - What specific task/component were you working on?
   - What percentage complete would you estimate?
   - What's currently working vs. not working?
   - Which files were you primarily editing?

   **Mental State & Approach:**
   - What problem were you actively solving?
   - What approach/strategy were you using?
   - Any recent insights or key decisions?
   - Technical patterns that worked well?

   **Blockers & Questions:**
   - What's preventing progress?
   - Questions for other agents?
   - External dependencies needed?

   **Next Session Plan:**
   - Specific next steps (not just "continue work")
   - Priority order for tomorrow's tasks
   - Files/components to focus on first

   **Cross-Agent Notes:**
   - Work that affects other agents
   - API contracts or interfaces changed
   - Coordination needed

6. **Session Summary**
   - Confirm all changes are committed and pushed
   - Verify todos reflect current status
   - Session context file created/updated
   - Ready for seamless handoff to next session

## Verification Checklist
- [ ] All changes committed with descriptive messages
- [ ] Feature branch pushed to GitHub  
- [ ] Todos updated to reflect current status
- [ ] Session context file created/updated
- [ ] Next session starting point documented
- [ ] Cross-agent coordination needs noted