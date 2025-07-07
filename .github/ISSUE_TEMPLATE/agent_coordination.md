---
name: Cross-Agent Coordination
about: Coordinate work between agents on Platform-ERM
title: '[COORDINATION] '
labels: coordination, cross-agent
assignees: ''
---

## Coordination Type
- [ ] API Contract Changes
- [ ] Feature Dependencies Updated
- [ ] Integration Testing Required
- [ ] Breaking Changes
- [ ] Multi-Tenant Compliance Issue
- [ ] Performance Optimization
- [ ] Security Review
- [ ] Epic Branch Coordination

## Agents Involved
- [ ] Agent 1 (Properties Frontend) - @agent1-handle
- [ ] Agent 2 (Backend & Systems) - @agent2-handle
- [ ] Agent 3 (Mobile & Integration) - @agent3-handle

## Feature Impact Analysis
**Primary Feature:** [e.g., Purchase Order System]
**Related Features:** [Check `/docs/development/feature-relationships.md`]
**Dependency Changes:** [How this affects other agents' work]

## Business Context
**Aspire Limitation Addressed:** [Which Aspire pain point this solves]
**LMN Improvement:** [How we're better than LMN's approach]
**Competitive Advantage:** [Key differentiator]
**Success Metrics:** [How we'll measure success]

## Technical Details

### API Changes
- [ ] New endpoints added
- [ ] Existing endpoints modified
- [ ] TypeScript interfaces updated
- [ ] Database schema changes
- [ ] Breaking changes (requires version bump)

**Endpoint Details:**
```
GET/POST/PUT/DELETE /api/internal/[endpoint]
Request: { ... }
Response: { ... }
```

### Multi-Tenant Considerations
- [ ] TenantId isolation verified
- [ ] Global query filters applied
- [ ] API authentication updated
- [ ] Cross-tenant data access prevented
- [ ] Audit trails include tenant context

### Database Changes
**Schema Modifications:**
- Tables affected:
- New columns:
- Relationships:
- Indexes:

**Migration Requirements:**
- [ ] Entity Framework migration created
- [ ] Rollback strategy defined
- [ ] Data migration needed

### Frontend Integration
**Component Updates:**
- Affected components:
- New components needed:
- Three-platform variants required:

**Type Definitions:**
```typescript
// Shared types needed
interface NewType {
  // ...
}
```

### Mobile/PWA Considerations
- [ ] Offline functionality impact
- [ ] Mobile performance optimization needed
- [ ] Touch interactions required
- [ ] Service worker updates needed

## Implementation Approach

### Branch Strategy
- [ ] Standard feature branches
- [ ] Epic branch needed for complex coordination
- [ ] Integration branch for API contracts

**Epic Branch Structure (if applicable):**
```
feature/epic-[feature-name]/
├── feature/[agent1-work]
├── feature/[agent2-work]
└── feature/[agent3-work]
```

### Implementation Sequence
1. **[Agent X]**: [Specific task] - Timeline: [dates]
   - Dependencies: [what must be complete first]
   - Deliverables: [what will be produced]

2. **[Agent Y]**: [Specific task] - Timeline: [dates]
   - Dependencies: [from step 1]
   - Deliverables: [what will be produced]

3. **Integration Testing**: [All agents] - Timeline: [dates]
   - Test scenarios: [list key scenarios]
   - Success criteria: [measurable outcomes]

## File Ownership & Coordination

### Agent 1 Ownership
- `/frontend/src/modules/[module]/`
- `/frontend/src/components/[components]/`
- Specific files: [list if needed]

### Agent 2 Ownership
- `/backend/src/PlatformERM.[layer]/`
- `/docs/development/`
- Specific files: [list if needed]

### Shared Files (Coordination Required)
- [ ] `/frontend/src/api/` - API client updates
- [ ] `/frontend/src/types/` - TypeScript definitions
- [ ] `package.json` - Dependency updates
- [ ] Database migrations - Schema changes

## Testing & Quality Assurance

### Unit Testing
- [ ] Agent 1: Frontend component tests
- [ ] Agent 2: Backend service tests
- [ ] Agent 3: Integration tests

### Integration Testing
- [ ] API contract validation
- [ ] Multi-tenant isolation verification
- [ ] Performance benchmarks met
- [ ] Security audit passed

### Acceptance Criteria
- [ ] Feature works as designed
- [ ] No regression in existing features
- [ ] Documentation updated
- [ ] All tests passing
- [ ] Code review completed

## Documentation Requirements
- [ ] Update `/docs/development/feature-relationships.md`
- [ ] Update feature documentation in `/docs/features/`
- [ ] Update API documentation
- [ ] Update completion-log.md when complete
- [ ] Update CLAUDE.md if architectural changes

## Risk Mitigation
**Identified Risks:**
1. [Risk description] - Mitigation: [approach]
2. [Risk description] - Mitigation: [approach]

**Contingency Plans:**
- Rollback strategy:
- Feature flags:
- Partial deployment:

## Communication & Progress

### Check-in Schedule
- Daily: [async updates in this issue]
- Weekly: [sync meeting if needed]
- On completion: [notification plan]

### Escalation Path
1. Attempt resolution via GitHub comments
2. Create urgent label if blocking
3. Request sync meeting if needed

## Resolution Checklist
- [ ] All agents understand scope and timeline
- [ ] Dependencies mapped and scheduled
- [ ] API contracts defined and agreed
- [ ] Test scenarios documented
- [ ] Documentation plan confirmed
- [ ] Feature relationships updated
- [ ] Success metrics defined
- [ ] All agents have reviewed and approved plan

## Next Steps
1. [ ] **Immediate Action**: [What happens right after this issue is created]
2. [ ] **Agent Assignments**: [Who does what first]
3. [ ] **First Milestone**: [What defines early success]

---
**Remember**: Check `/docs/development/feature-relationships.md` before starting any work!