## Description
Brief description of changes and the problem they solve.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Refactoring (no functional changes)
- [ ] Performance improvement
- [ ] Code cleanup

## Agent Information
**Submitting Agent**: Agent [1/2/3] - [Frontend/Backend/Mobile]
**Current Branch**: `feature/[branch-name]`

## Cross-Agent Impact
- [ ] No impact on other agents
- [ ] Requires coordination with Agent 1 (Frontend)
- [ ] Requires coordination with Agent 2 (Backend)
- [ ] Requires coordination with Agent 3 (Mobile)

**Shared files modified:**
- List any shared types, API contracts, or cross-agent files

## Testing Checklist
- [ ] Unit tests pass
- [ ] Integration tests pass (if applicable)
- [ ] Manual testing completed
- [ ] Multi-tenant scenarios tested
- [ ] No cross-tenant data leakage

## Multi-Tenant Compliance
- [ ] TenantId properly scoped in all queries
- [ ] Global query filters applied where needed
- [ ] Audit fields include tenant context
- [ ] API endpoints validate tenant access

## Code Quality
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Complex logic is commented
- [ ] No hardcoded values or secrets
- [ ] Error handling implemented

## Documentation
- [ ] Code changes are documented
- [ ] API changes documented (if applicable)
- [ ] README updated (if needed)
- [ ] CLAUDE.md updated (if architecture changes)

## Screenshots (if UI changes)
Add screenshots to help reviewers understand visual changes.

## Database Changes
- [ ] No database changes
- [ ] Migration files included
- [ ] Migration tested up and down
- [ ] Seed data updated if needed

## Performance Impact
- [ ] No significant performance impact
- [ ] Performance improvements made
- [ ] Potential performance concerns (explain below)

## Security Checklist
- [ ] No security vulnerabilities introduced
- [ ] Authentication/authorization properly implemented
- [ ] Input validation added where needed
- [ ] No sensitive data exposed in logs

## Related Issues
Closes #[issue number]

## Next Steps
- [ ] Merge to develop branch for integration
- [ ] Other agents need to pull latest develop
- [ ] Follow-up tasks needed (list below)

## Reviewer Notes
**Specific areas to review:**
- 
- 

**Questions for reviewers:**
- 
- 