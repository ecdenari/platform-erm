# Multi-Agent Coordination Documentation

This document provides detailed protocols for coordinating multiple Claude Code agents working on Platform-ERM development.

## Overview

Platform-ERM uses a multi-agent development approach to enable parallel work on different system components while maintaining architectural integrity and preventing conflicts.

## Agent Roles & Specializations

### Agent 1: Properties Frontend Specialist
- **Terminal Identity**: "Claude Code Agent 1"
- **Primary Focus**: React components, UI/UX, Properties module frontend
- **Technologies**: React 18, TypeScript, Tailwind CSS, enterpriseTokens.ts
- **Branch Pattern**: `feature/properties-*`
- **Current Assignment**: Building Properties module with three-platform component variants

### Agent 2: Backend & Systems Specialist  
- **Terminal Identity**: "Claude Code Agent 2"
- **Primary Focus**: .NET APIs, database, system architecture, documentation coordination
- **Technologies**: .NET Core 8, PostgreSQL, Entity Framework, Clean Architecture
- **Branch Pattern**: `feature/backend-*`, `feature/api-*`, `feature/docs-*`
- **Current Assignment**: Multi-agent coordination, backend development, GitHub integration

### Agent 3: Mobile & Integration Specialist (Future)
- **Terminal Identity**: "Claude Code Agent 3"
- **Primary Focus**: PWA/mobile features, external integrations, testing
- **Technologies**: Mobile React, PWA, API integrations, testing frameworks
- **Branch Pattern**: `feature/mobile-*`, `feature/integration-*`
- **Status**: Not yet active - will be activated when mobile/integration work begins

## Daily Coordination Routines

### Session Startup Routine
1. **Agent Identification**:
   ```
   Terminal Name → Agent Identity → Read Role File → Use Startup Prompt
   ```

2. **Status Check**:
   - Read CLAUDE.md startup protocol
   - Check `/docs/tracking/completion-log.md`
   - Use TodoRead for current tasks
   - Review GitHub Issues for coordination items

3. **Git Preparation**:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/[agent-scope]-[description]
   ```

### Session Work Routine
1. **File Ownership Compliance**: Only modify files you own, coordinate on shared files
2. **Regular Communication**: Create GitHub Issues for coordination needs
3. **Progress Tracking**: Update todos in real-time, mark completed work
4. **Documentation**: Update completion-log.md for major milestones

### Session End Routine
1. **Commit and Push**: Save all work to feature branch
2. **Documentation**: Update completion-log.md if significant work completed
3. **Coordination**: Create/update GitHub Issues for next agent coordination
4. **Todo Management**: Mark completed todos, note blockers

## Communication Protocols

### GitHub Issue Management

#### Issue Creation Standards
- **Title Format**: `[TYPE] Clear description`
- **Types**: `[API]`, `[UI]`, `[DOCS]`, `[COORDINATION]`, `[URGENT]`
- **Labels**: `coordination`, `api-change`, `urgent`, `agent-1`, `agent-2`, `agent-3`

#### Issue Content Requirements
```markdown
## Description
Clear description of the coordination need

## Affected Agents
- [ ] Agent 1 (Properties Frontend)
- [ ] Agent 2 (Backend & Systems)
- [ ] Agent 3 (Mobile & Integration)

## Current State
What currently exists

## Proposed Changes
What needs to change

## Impact Assessment
- Frontend impact:
- Backend impact:
- Mobile impact:
- Timeline:

## Action Items
- [ ] Agent X: Specific task with deadline
- [ ] Agent Y: Specific task with deadline

## Dependencies
What needs to happen before/after
```

### Cross-Agent Communication Scenarios

#### API Contract Changes
**Trigger**: Agent 2 needs to modify existing API endpoints

**Process**:
1. Agent 2 creates issue: `[API] Modify Properties endpoint for hierarchy support`
2. Include current API spec, proposed changes, breaking change assessment
3. @mention Agent 1 for frontend impact review
4. Agent 1 reviews and provides feedback on frontend requirements
5. Agree on implementation timeline and coordination points
6. Implement in sequence: Backend → Frontend → Testing

#### UI Navigation Changes
**Trigger**: Agent 1 needs to modify navigation hierarchy

**Process**:
1. Agent 1 creates issue: `[UI] Add Property Map to SubNav`
2. Include navigation hierarchy impact, new routing requirements
3. @mention Agent 2 for backend routing/API implications
4. Agent 2 reviews for backend impact (new endpoints, permissions)
5. Coordinate implementation of navigation + backend support

#### Database Schema Changes
**Trigger**: Agent 2 needs to modify database schema

**Process**:
1. Agent 2 creates issue: `[API] Add ContactPreferences table for Properties`
2. Include schema changes, migration plan, API impact
3. @mention Agent 1 for frontend TypeScript type impact
4. Agent 1 reviews for frontend data structure requirements
5. Implement: Migration → Backend → TypeScript Types → Frontend

#### Shared File Modifications
**Trigger**: Multiple agents need to modify shared files

**Process**:
1. Creating agent creates coordination issue: `[COORDINATION] Update shared TypeScript types`
2. Define specific changes needed by each agent
3. Establish modification order to prevent conflicts
4. First agent implements and creates PR
5. Subsequent agents rebase and implement their changes

## Conflict Resolution Procedures

### Merge Conflicts
1. **Identify Source**: Usually shared files (API types, navigation)
2. **Create Coordination Issue**: `[URGENT] Merge conflict in shared files`
3. **Involve Affected Agents**: @mention all agents with conflicts
4. **Resolution Strategy**:
   - Agent 2 has authority on backend/API conflicts
   - Agent 1 has authority on UI/styling conflicts
   - Both coordinate on TypeScript type conflicts
5. **Test Integration**: Verify resolution works for all agents
6. **Document Pattern**: Add to this document for future reference

### Architectural Disagreements
1. **Escalate to Agent 2**: Backend & Systems specialist has architectural authority
2. **Reference CLAUDE.md**: Check existing architectural rules
3. **Create Documentation Issue**: Update CLAUDE.md if new pattern needed
4. **Get User Input**: For major architectural decisions

### Timeline Conflicts
1. **Assess Dependencies**: Which work must happen first
2. **Negotiate Priorities**: Balance agent workloads
3. **Update Completion Log**: Document revised timeline
4. **Coordinate Handoffs**: Ensure smooth transitions

## Integration Testing Requirements

### Cross-Agent Integration Points

#### Frontend ↔ Backend Integration
**Test Areas**:
- API contract compliance
- TypeScript type alignment
- Multi-tenant data filtering
- Authentication flow
- Error handling consistency

**Testing Process**:
1. Agent 2 implements backend changes
2. Agent 1 tests with frontend integration
3. Both agents verify multi-tenant isolation
4. Document any integration issues

#### Mobile ↔ Backend Integration (Future)
**Test Areas**:
- Mobile-optimized API responses
- PWA offline capability
- Mobile authentication
- Performance on mobile devices

### Integration Testing Checklist
- [ ] **API Contracts**: Frontend can consume all expected endpoints
- [ ] **Type Safety**: TypeScript types match API responses exactly
- [ ] **Multi-Tenancy**: All agents respect tenant isolation
- [ ] **Authentication**: All auth flows work for all agent code
- [ ] **Performance**: No agent's code creates performance regressions
- [ ] **Error Handling**: Consistent error patterns across all layers

## API Contract Management Process

### Contract Definition Process
1. **Agent 2 Defines**: Initial API contract based on business requirements
2. **Agent 1 Reviews**: Frontend requirements and data structure needs
3. **Agent 3 Reviews**: Mobile requirements and performance considerations (future)
4. **Finalize Contract**: Update OpenAPI/Swagger documentation
5. **Implementation**: Backend → Frontend → Mobile coordination

### Contract Change Process
1. **Impact Assessment**: Breaking vs non-breaking changes
2. **Coordination Issue**: Create with all affected agents
3. **Migration Plan**: For breaking changes, include migration steps
4. **Version Management**: API versioning strategy for public endpoints
5. **Documentation Update**: Swagger/OpenAPI and TypeScript types

### Contract Validation
```typescript
// Shared TypeScript interface validation
interface PropertyApiContract {
  id: number;
  tenantId: string;  // Always include for multi-tenancy
  name: string;
  address: AddressContract;
  contacts: ContactContract[];
  // ... other fields
}

// Backend implements, Frontend consumes, Mobile optimizes
```

## Documentation Coordination

### Documentation Ownership
- **Agent 2 Owns**: Architecture guides, API documentation, coordination protocols
- **Agent 1 Owns**: UI design system, component documentation, frontend guides
- **Agent 3 Owns**: Mobile guides, integration documentation (future)

### Documentation Update Process
1. **Owner Updates**: Each agent maintains their owned documentation
2. **Cross-Reference Review**: Other agents review for accuracy
3. **Coordination Updates**: Agent 2 coordinates cross-cutting documentation changes
4. **Version Control**: All documentation changes via Git with proper review

### Documentation Standards
- **Format**: Markdown with consistent structure
- **Location**: Organized in `/docs/` hierarchy
- **Cross-References**: Use relative links that work in Git
- **Currency**: Update completion-log.md for significant documentation changes

## Quality Assurance Coordination

### Code Review Process
**Same-Agent Work**: No review required for agent-owned files
**Cross-Cutting Work**: Review required from affected agents
**Shared Files**: Both agents must approve changes

### Testing Coordination
- **Agent 1**: Frontend unit tests, component tests, UI integration tests
- **Agent 2**: Backend unit tests, API integration tests, database tests
- **Agent 3**: Mobile tests, end-to-end integration tests (future)

### Quality Gates
Before merging to develop:
- [ ] All owned tests pass
- [ ] Integration points tested with other agents
- [ ] Multi-tenant isolation verified
- [ ] Performance acceptable
- [ ] Documentation updated

## Emergency Coordination Protocols

### Urgent Issues
**Criteria**: Production-breaking issues, security vulnerabilities, major blocker

**Process**:
1. Create issue with `[URGENT]` prefix
2. @mention all affected agents
3. Provide clear problem description and impact
4. Coordinate immediate resolution
5. Follow up within 4 hours maximum

### Agent Unavailability
**If Agent 1 Unavailable**: Agent 2 can review frontend for critical issues
**If Agent 2 Unavailable**: Agent 1 cannot modify backend, must wait or get user help
**If Agent 3 Unavailable**: Other agents can handle mobile coordination

### System-Wide Issues
1. **Agent 2 Leads**: System-wide architectural issues
2. **All Agents Coordinate**: Share information and testing
3. **User Escalation**: For issues beyond agent capabilities
4. **Recovery Documentation**: Update protocols based on lessons learned

## Performance Monitoring

### Agent Productivity Metrics
- **Coordination Efficiency**: Time from issue creation to resolution
- **Conflict Frequency**: Number of merge conflicts and coordination issues
- **Integration Success**: Frequency of successful cross-agent integrations
- **Documentation Currency**: How up-to-date cross-agent documentation remains

### System Health Metrics
- **Build Success Rate**: Percentage of builds that pass after agent work
- **Test Coverage**: Maintained or improved after multi-agent work
- **Performance Metrics**: No degradation from multi-agent development
- **Code Quality**: Consistent patterns across agent contributions

## Continuous Improvement

### Protocol Evolution
- **Monthly Review**: Assess coordination effectiveness
- **Process Updates**: Modify protocols based on experience
- **Tool Integration**: Add tools that improve coordination
- **Training Updates**: Update agent role files with lessons learned

### Knowledge Sharing
- **Pattern Documentation**: Successful coordination patterns
- **Common Issues**: Document frequent problems and solutions
- **Best Practices**: Evolve and share effective coordination techniques
- **Tool Recommendations**: Share useful development tools across agents

This coordination system ensures efficient parallel development while maintaining Platform-ERM's high-quality, multi-tenant architecture standards.