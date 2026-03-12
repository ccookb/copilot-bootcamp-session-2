# Priority Feature Implementation Plan

## Objective

Add task priority support to the TODO application so users can:

- Set a priority when creating a task.
- View each task priority as a pill-style UI element.
- Use the following values and colors:
  - High: red
  - Medium: yellow
  - Minor: green

## Scope

### In Scope

- Backend data model and API updates to store and return priority.
- Frontend create-task flow update to assign priority.
- Frontend task list update to display priority as a colored pill.
- Validation and default behavior for missing/invalid priority values.
- Unit, integration, and E2E tests for new behavior.

### Out of Scope

- Bulk editing priorities.
- Drag-and-drop priority ranking.
- Priority-based notifications.

## Functional Requirements Addendum

### FR-4: Task Priority

#### FR-4.1: Assign Priority at Creation

- Users can assign one priority while creating a task: `high`, `medium`, or `minor`.
- Priority is required in the create-task UI, with `medium` preselected as default.
- If a task is created without a supplied priority through API clients, backend defaults to `medium`.

#### FR-4.2: Display Priority Pill

- Every task displays a priority pill with text and color mapping:
  - `High` -> red (`#D32F2F`)
  - `Medium` -> yellow (`#ED6C02`)
  - `Minor` -> green (`#2E7D32`)
- Pill styling must be consistent across desktop and mobile layouts.

#### FR-4.3: Validation

- Backend accepts only `high`, `medium`, `minor`.
- Invalid values return `400 Bad Request` with a clear validation message.

## Technical Design

## Backend Changes (packages/backend)

1. Update task schema/model representation to include `priority`.
2. Add request validation for create-task payload priority.
3. Apply default priority (`medium`) when not provided.
4. Ensure API responses include `priority` for all task reads and creates.
5. Preserve compatibility for existing tasks by backfilling missing values to `medium` during read/transform.

### Backend API Contract

- Create task request body:
  - `title: string` (required)
  - `dueDate: string | null` (optional)
  - `priority: "high" | "medium" | "minor"` (optional, defaults to `medium`)
- Create task response includes normalized `priority`.

## Frontend Changes (packages/frontend)

1. Extend create-task form state to include priority.
2. Add Material form control for priority selection (recommended: `Select` + `MenuItem`).
3. Preselect `Medium` for usability and backend alignment.
4. Include selected priority in create-task API payload.
5. Add reusable Material `Chip`-based priority pill component and use it in task rows/cards.
6. Implement color mapping in a shared utility to keep UI DRY and reusable.

### UI Implementation Notes

- Use Material components only, per UI guidelines.
- Priority pill should use `Chip` with label text `High`, `Medium`, or `Minor`.
- Color mapping should use documented palette tokens:
  - High -> `Error` palette
  - Medium -> `Warning` palette
  - Minor -> `Success` palette
- Buttons in create flow must follow existing button standards (`contained`, `outlined`, `text`).

## Coding Standards Application

- DRY: Centralize priority constants and color mappings in shared modules used by both form and pill rendering.
- Componentization: Build a dedicated reusable `PriorityPill` component.
- Isolation: Keep API data normalization separate from UI presentation logic.
- Docstrings: Add docstrings for all new functions in backend and frontend utility modules.

## Testing Plan

## Unit Tests

- Backend:
  - Validate accepted priority values.
  - Validate default behavior to `medium`.
  - Validate rejection of invalid priorities.
- Frontend:
  - Verify create form default priority selection.
  - Verify payload includes selected priority.
  - Verify `PriorityPill` label/color mapping by priority.

File locations and naming:

- Backend unit tests: `packages/backend/__tests__/` with `*.test.js`.
- Frontend unit tests: `packages/frontend/src/__tests__/` with `*.test.js`.

## Integration Tests

- POST create-task with each valid priority returns `201` and persisted priority.
- POST create-task without priority returns `201` with `medium`.
- POST create-task with invalid priority returns `400`.

File location and naming:

- `packages/backend/__tests__/integration/priority-api.test.js`

## E2E Tests (Playwright)

- Single-browser Playwright suite using Page Object Model.
- Add one focused journey in `tests/e2e/priority-workflow.spec.js`:
  - Create task with High priority and verify red High pill appears.
  - Create task with Medium/Minor and verify corresponding pill colors and labels.

## Setup, Teardown, and Isolation

- Each test creates its own task data.
- No test depends on execution order.
- Use setup/teardown hooks to reset test state between runs.

## Delivery Phases

1. Backend priority field, validation, defaults, and API contract updates.
2. Frontend create form priority selection and payload integration.
3. Reusable priority pill component and task list rendering.
4. Unit and integration test coverage.
5. E2E workflow validation and regression pass.

## Acceptance Criteria

- User can select `High`, `Medium`, or `Minor` when creating a task.
- Created task persists and returns selected priority.
- Task list displays correct priority pill text and color mapping.
- Missing priority defaults to `Medium`.
- Invalid priority is rejected with clear API error.
- All new tests pass and are stable across repeated runs.

## Risks and Mitigations

- Risk: Existing tasks without priority may break UI assumptions.
  - Mitigation: Normalize missing values to `medium` in backend read path.
- Risk: Color inconsistency across components.
  - Mitigation: Use shared priority-to-color utility and Material palette tokens.
- Risk: Test flakiness in E2E.
  - Mitigation: Use deterministic selectors via POM and isolated test data.