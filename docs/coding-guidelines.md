# Coding Guidelines

These guidelines define coding practices to improve reusability, readability, and long-term maintainability.

## Core Principles

- Prioritize DRY (Don't Repeat Yourself) principles across frontend and backend code.
- Emphasize componentization and isolation of functionality.
- Design code for reuse before adding one-off implementations.
- Include docstrings for all functions.

## DRY Practices

- Extract duplicated logic into shared utilities, services, hooks, or helper functions.
- Reuse existing modules before creating new ones with overlapping behavior.
- Keep constants, configuration, and shared validation rules centralized.
- When duplicate patterns are found in two or more places, refactor into a single reusable abstraction.

## Componentization and Isolation

- Build small, focused components and modules with a single responsibility.
- Keep business logic separate from UI rendering logic where possible.
- Compose larger features from smaller reusable pieces rather than creating monolithic files.
- Prefer clear interfaces between modules (props, function arguments, return values) to reduce coupling.

## Reusability Standards

- Favor generic names and parameters when behavior is intentionally reusable.
- Avoid hardcoded values that prevent reuse in other contexts.
- Ensure shared components and functions are documented and predictable.
- Refactor opportunistically when adding features to improve reuse without over-engineering.

## Function Docstrings

- Every function must include a docstring.
- Docstrings should describe:
  - Purpose: what the function does.
  - Inputs: parameters and expected types/shape.
  - Output: return value and structure.
  - Side effects: any state mutation, I/O, network, or logging behavior.
- Keep docstrings concise and accurate; update them when behavior changes.

## Quality Expectations

- New code should follow these guidelines by default.
- Refactors and feature work should improve adherence over time.
- Code reviews should check for DRY violations, missed reuse opportunities, and missing docstrings.