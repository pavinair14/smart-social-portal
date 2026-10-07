# Contributing to Smart Social Portal

Thank you for your interest in contributing to Smart Social Portal! This document provides guidelines and processes for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Commit Conventions](#commit-conventions)
- [Pull Request Process](#pull-request-process)
- [Testing Requirements](#testing-requirements)
- [Coding Standards](#coding-standards)
- [Accessibility Standards](#accessibility-standards)
- [Internationalization (i18n)](#internationalization)
- [Performance Guidelines](#performance-guidelines)

---

## Code of Conduct

We are committed to providing a welcoming and inclusive environment. Please be respectful and constructive in all interactions with other contributors.

---

## Getting Started

### Prerequisites

- **Node.js**: 18+ (recommended)
- **npm**: 9+ or equivalent package manager
- **Git**: 2.0+

### Setup Development Environment

1. **Fork the repository**
   ```bash
   # Visit https://github.com/pavinair14/smart-social-portal and click "Fork"
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR-USERNAME/smart-social-portal.git
   cd smart-social-portal
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/pavinair14/smart-social-portal.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

---

## Development Workflow

### Branch Naming Convention

Use the following prefixes for branch names:

- **feature/** - New features or enhancements
  - Example: `feature/rtl-icon-positioning`
  
- **fix/** - Bug fixes
  - Example: `fix/validation-error-display`
  
- **docs/** - Documentation updates
  - Example: `docs/api-reference`
  
- **refactor/** - Code refactoring without feature changes
  - Example: `refactor/form-validation-logic`
  
- **test/** - Test additions or improvements
  - Example: `test/increase-component-coverage`
  
- **perf/** - Performance improvements
  - Example: `perf/optimize-form-rendering`

### Issue Workflow

1. **Check existing issues** - Search for duplicate or related issues
2. **Create an issue** - Use appropriate issue template if available
3. **Get assignment** - Comment on the issue to express interest
4. **Create a branch** - Link the issue number in your branch name when possible
5. **Submit a PR** - Reference the issue number in your pull request

---

## Commit Conventions

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that don't affect code meaning (formatting, missing semicolons, etc.)
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: Code change that improves performance
- **test**: Adding or updating tests
- **chore**: Changes to build process, dependencies, or tooling
- **ci**: Changes to CI/CD configuration

### Examples

```bash
# Feature with scope
git commit -m "feat(form): add RTL support for error icons"

# Bug fix
git commit -m "fix(validation): correct email regex pattern"

# Documentation
git commit -m "docs(readme): update installation instructions"

# Breaking change (use BREAKING CHANGE: prefix)
git commit -m "feat(api)!: redesign form submission response"
```

---

## Pull Request Process

### Before Submitting

1. **Update your branch with latest changes**
   ```bash
   git fetch upstream
   git rebase upstream/master
   ```

2. **Run all checks locally**
   ```bash
   npm run lint      # Check code style and TypeScript
   npm test          # Run all tests
   npm run build     # Verify production build
   ```

3. **Ensure tests pass and coverage is maintained**
   ```bash
   npm run test:coverage
   ```

### Creating a Pull Request

1. **Push your branch**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create PR on GitHub**
   - Use the PR template (if available)
   - Link related issues: "Fixes #123" or "Relates to #456"
   - Provide a clear description of changes
   - Include screenshots/videos for UI changes

3. **PR Title Format**
   ```
   [TYPE] Brief description of changes
   ```
   
   Examples:
   - `[Feature] Add RTL support for form icons`
   - `[Fix] Correct validation error positioning`
   - `[Docs] Update contributing guidelines`

### PR Description Template

```markdown
## Description
Brief description of the changes and why they're needed.

## Related Issues
Fixes #123

## Changes Made
- Change 1
- Change 2
- Change 3

## Testing
- [ ] Unit tests added/updated
- [ ] Manual testing completed
- [ ] Tests pass locally

## Screenshots (if applicable)
[Add screenshots for UI changes]

## Checklist
- [ ] TypeScript compilation without errors
- [ ] ESLint passes
- [ ] Tests pass
- [ ] Code coverage maintained or improved
- [ ] Documentation updated (if needed)
- [ ] Commit messages follow conventions
```

### Review Process

1. **At least one maintainer approval required**
2. **All CI checks must pass**
3. **Address review comments**
4. **Squash commits if requested** (or maintain clean history)
5. **Merge when approved**

---

## Testing Requirements

### Test Coverage Expectations

- **New features**: Minimum 80% coverage for modified files
- **Bug fixes**: Add regression tests
- **Refactoring**: Maintain or improve existing coverage

### Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage

# Run specific test file
npm test -- Field.test.tsx
```

### Test Structure

- Use **Jest** for unit tests
- Use **React Testing Library** for component tests
- Mock external services (e.g., OpenAI client)
- Test user behavior, not implementation details
- Use descriptive test names

### Example Test

```typescript
describe('Field Component', () => {
  it('should display error message when validation fails', () => {
    const { getByText } = render(
      <Field error="This field is required" />
    );
    expect(getByText('This field is required')).toBeInTheDocument();
  });
});
```

---

## Coding Standards

### TypeScript

- **Strict mode enabled** - All code must compile without errors
- **Explicit types** - Avoid `any` types
- **Use utility types** - `Partial<T>`, `Pick<T>`, `Omit<T>`, etc.

### React Best Practices

- **Functional components** - Use hooks, avoid class components
- **Memoization** - Use `React.memo` for expensive components
- **Hooks rules** - Follow the [Rules of Hooks](https://react.dev/reference/rules/rules-of-hooks)
- **Custom hooks** - Extract reusable logic into custom hooks

### Code Style

- **Formatting**: Configured via ESLint
- **Line length**: Maximum 100 characters (soft limit)
- **Imports**: Organize by type (React, third-party, local)
- **Comments**: Use for "why", not "what"

### Example: Well-Structured Component

```typescript
import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Field } from './Field';
import { cn } from '@/utils/cn';

interface PersonalInfoProps {
  onSubmit: (data: PersonalInfo) => void;
  isLoading?: boolean;
}

export const PersonalInfo: React.FC<PersonalInfoProps> = ({
  onSubmit,
  isLoading = false,
}) => {
  const { t } = useTranslation();

  const handleSubmit = useCallback((formData) => {
    onSubmit(formData);
  }, [onSubmit]);

  const fieldClasses = useMemo(() => cn('mb-4'), []);

  return (
    <form onSubmit={handleSubmit}>
      <Field
        label={t('personalInfo.name')}
        className={fieldClasses}
      />
    </form>
  );
};
```

---

## Accessibility Standards

### WCAG 2.1 Level AA Compliance

All contributions must follow accessibility guidelines:

1. **Semantic HTML**
   - Use appropriate HTML elements (`<button>`, `<input>`, `<label>`, etc.)
   - Avoid `<div>` for interactive elements

2. **ARIA Labels**
   ```typescript
   <button
     aria-label="Close dialog"
     onClick={onClose}
   >
     ✕
   </button>
   ```

3. **Keyboard Navigation**
   - All interactive elements must be keyboard accessible
   - Tab order should be logical
   - Escape key closes modals

4. **Color Contrast**
   - Text contrast ratio of at least 4.5:1
   - Use Tailwind CSS utilities for consistent colors

5. **Focus Management**
   - Visible focus indicators (don't remove default browser outline)
   - Focus trap in modals
   - Focus restore when closing modals

### Testing Accessibility

- Use browser DevTools Lighthouse
- Test with keyboard navigation
- Test with screen reader (e.g., NVDA, JAWS)
- Use [axe DevTools](https://www.deque.com/axe/devtools/) browser extension

---

## Internationalization

### Adding Translations

1. **Update locale files**
   ```json
   // src/i18n/locales/en.json
   {
     "personalInfo.name": "Full Name",
     "personalInfo.email": "Email Address"
   }
   
   // src/i18n/locales/ar.json
   {
     "personalInfo.name": "الاسم الكامل",
     "personalInfo.email": "عنوان البريد الإلكتروني"
   }
   ```

2. **Use translations in components**
   ```typescript
   import { useTranslation } from 'react-i18next';

   export function MyComponent() {
     const { t } = useTranslation();
     return <label>{t('personalInfo.name')}</label>;
   }
   ```

3. **RTL Support**
   - All directional classes (left/right, padding, margin) must account for RTL
   - Use utility to swap directional classes:
   ```typescript
   const getDirectionalClass = (ltr: string, rtl: string) =>
     i18n.language === 'ar' ? rtl : ltr;
   ```

---

## Performance Guidelines

### Optimization Checklist

- [ ] Memoized expensive components (`React.memo`)
- [ ] Debounced search/input handlers
- [ ] Minimized re-renders with `useCallback` and `useMemo`
- [ ] Lazy-loaded large components or routes
- [ ] Optimized bundle size
- [ ] No unnecessary API calls

### Performance Testing

```bash
# Build analysis
npm run build

# Check bundle size
npm run build -- --analyze
```

---

## Getting Help

- **Questions?** - Open a discussion or issue
- **Bug reports?** - Create an issue with reproduction steps
- **Feature requests?** - Start with an issue for discussion

---

## Recognition

Contributors are recognized in:
- Pull request comments
- Release notes
- Project README (contributors section, if added)

Thank you for making Smart Social Portal better! 🚀
