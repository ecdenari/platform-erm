---
name: Agent Coordination
about: Coordinate work between agents
title: '[COORDINATION] '
labels: coordination
assignees: ''
---

## Coordination Need
Describe what needs to be coordinated between agents.

## Affected Agents
- [ ] Agent 1 (Properties Frontend)
- [ ] Agent 2 (Backend & Systems) 
- [ ] Agent 3 (Mobile & Integration)

## Work Dependencies
- **Blocking**: What work is blocked waiting for this?
- **Prerequisites**: What needs to be completed first?
- **Timeline**: When does this coordination need to happen?
- **Impact**: What happens if this coordination is delayed?

## Technical Details

### API Changes
- **Endpoints affected**: List specific API endpoints
- **Request/Response changes**: Describe data structure changes
- **Breaking changes**: Yes/No - describe impact
- **Versioning**: API version implications

### Database Changes
- **Schema modifications**: Tables, columns, relationships affected
- **Migration requirements**: Data migration needs
- **Multi-tenant considerations**: Tenant isolation impacts

### Frontend Integration
- **TypeScript types**: Shared type definitions needed
- **Component impacts**: Which components need updates
- **Navigation changes**: Three-level hierarchy modifications
- **Design token usage**: Enterprise token requirements

### Mobile/PWA Integration  
- **Offline capabilities**: Data sync requirements
- **Performance**: Mobile optimization needs
- **API optimization**: Mobile-specific endpoints

## Implementation Sequence
1. **Step 1**: [Agent X] - Description and timeline
2. **Step 2**: [Agent Y] - Description and dependencies
3. **Step 3**: [Agent Z] - Description and testing
4. **Integration**: All agents - Integration testing

## Success Criteria
- [ ] All agents can work independently in their areas
- [ ] Integration points function correctly
- [ ] No breaking changes to existing functionality
- [ ] Multi-tenant isolation maintained
- [ ] Performance requirements met

## Communication Plan
- **Synchronous coordination needed**: Yes/No
- **GitHub Issue tracking**: This issue + any additional issues
- **Documentation updates**: What docs need updating
- **Progress check-ins**: Timeline for status updates

## Testing Requirements
- [ ] Unit tests updated by each agent
- [ ] Integration tests for coordination points
- [ ] Multi-tenant testing across all changes
- [ ] Performance testing for cross-agent functionality

## File Ownership Impacts
**Agent 1 Files**:
- `/frontend/src/components/` - [specific files]
- `/frontend/src/modules/properties/` - [specific files]

**Agent 2 Files**:
- `/backend/src/` - [specific files]
- `/docs/development/` - [specific files]

**Shared Files** (coordination required):
- `/frontend/src/api/` - [specific interfaces]
- `/frontend/src/types/` - [specific type definitions]

## Risk Assessment
- **Merge conflicts**: Likelihood and mitigation
- **Breaking changes**: Impact on other work
- **Timeline conflicts**: Agent availability issues
- **Technical risks**: Architecture or performance concerns

## Context
- **Related issues**: #issue-number
- **Related PRs**: #pr-number
- **Feature documentation**: Link to relevant feature docs
- **Completion log entry**: Reference to completion-log.md section

## Resolution Checklist
- [ ] All agents understand their responsibilities
- [ ] Timeline agreed upon by all affected agents
- [ ] Dependencies clearly defined and scheduled
- [ ] Integration testing plan established
- [ ] Documentation update plan confirmed
- [ ] Success criteria validated by all agents