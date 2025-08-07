# Development Instructions

## Overview

This document defines the development and coding standards for the project, ensuring code quality, maintainability, and consistency.

### Tech Stack

- **Frontend:** React 19+ with Next.js 15+ (App Router), TypeScript, Tailwind CSS, and shadcn/ui
- **Backend:** tRPC with Next.js API routes
- **State Management:** TanStack React Query with aggressive caching
- **Validation:** Zod for schema validation

## Development Standards

### Programming

- **TypeScript:** Leverage TypeScript fully and minimize `any` usage
- **Defensive Programming:** Use defensive programming, validate and check types at boundaries.
- **Functional Programming:** Use pure functions and immutable data structures to ensure predictability.
- **Immutability:** Avoid mutating state directly; prefer immutable patterns or derive new state from existing ones.
- **Locality:** Prioritize locality of behavior, each unit should be understandable on its own.
- **Navigability:** Structure for navigability. Group related files by feature, not just layer.
- **Comments:** Limit the use of comments. Code should read like prose. Code explains how, comments explain why.

### React and Next.js

- **Memoization:** Apply memoization for expensive computations, but avoid overuse to prevent complexity.
- **Composition:** Prefer composition over modification and inheritance, extend through props
- **Zero Re-renders:** Zero re-renders policy, components should not re-render unless necessary
- **UI State:** Keep UI state minimal and colocated, state lives in the URL as much as possible
- **Performance:** Every component, function, and hook should be optimized for performance by default

#### Component Design

- **Container/Presenter Pattern:** Separate data fetching from presentation
- **Compound Components:** For complex UI patterns with multiple related components

### Visual Styling

- **Mobile-first Design:** Ensure all layouts are responsive and optimized for mobile devices first.
- **Performance Budgets:** Set and adhere to performance budgets for each breakpoint to maintain fast load times and smooth interactions.

### Naming Conventions

- **Variables:** Use descriptive names with auxiliary verbs (e.g., `isLoading`, `hasError`, `canDelete`).
- **Components, Types, Interfaces:** Use PascalCase (e.g., `UserProfile`, `AppConfig`).
- **Functions, Variables, Object Properties:** Use camelCase (e.g., `fetchData`, `userList`).
- **Constants, Environment Variables:** Use SCREAMING_SNAKE_CASE (e.g., `API_URL`, `MAX_RETRIES`).
- **Files and Directories:** Use kebab-case (e.g., `user-profile.tsx`, `api-routes/`).

## Coding Agents Specific Instructions

- **Package Management:** Default to using `bun` for package management and script execution.
- **Build and Test:** Do not build or test; assume a human will handle these tasks.
