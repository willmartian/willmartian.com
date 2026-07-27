---
title: "Only work on bug tickets"
blurb: "Finished tickets take their context with them. Bug tickets are the only ones that come back."
date: 2026-02-09
# comments: "https://fosstodon.org/@willmartian/115073408360995471"
eleventyExcludeFromCollections: true
---

As an engineer, it is my honor to continue the ancient tradition of hating on project management tools (especially Jira). The specific wart I will highlight today is the ephemeral nature of it all. We align on behavior and detail and implementation notes, do the work, eventually mark as done... and then it is gone. Into the ether of finished tickets. Never to be seen again.

That is a lot of lost context.

**Here's what you should do instead.**

---

## The Rules

### Rule 1: The specification is the product

Not the code. Not the designs. Not the tickets.

**The specification** is a versioned document that describes how your product works. It lives in your repo as markdown. When someone asks "how does login work?", you point them to `specs/authentication/login.md`. Not to closed tickets. Not to Confluence. Not to "ask Sarah, she built it."

### Rule 2: Feature tickets only modify the specification

A feature ticket does **not** involve writing code.

```markdown
# FEAT-123: Add two-factor authentication

Work: Write specs/authentication/two-factor.md

Done when: The spec exists and is merged.
```

Close the ticket. No code written. You just defined reality.

### Rule 3: All code changes are bug fixes

Once the spec exists, reality doesn't match it. That's a bug.

New features? Bugs (spec exists, code doesn't).
Regressions? Bugs (spec exists, code broke).

```markdown
# BUG-124: Reality doesn't implement 2FA spec

Spec: specs/authentication/two-factor.md
Current state: Users cannot enable 2FA
Done when: Reality matches spec
```

This is just TDD for products: write the test (spec), watch it fail (bug exists), make it pass (close bug).

### Rule 4: Bugs reference specs, always

```markdown
# BUG-125: Password reset broken for OAuth users

Spec: specs/authentication/password-reset.md#oauth-users
Expected: OAuth users see "Reset not available"
Actual: 500 error
```

If there's no spec, you can't have a bug. Write the spec first (feature ticket).

---

## Why This Works

**Your backlog is honest.**
Not "50 features to build" (vague ideas), but "50 specs written, 30 implemented" (clear gap). You've done the design work. Now it's execution.

**Design and implementation are separate.**
PMs write specs. Engineers write code. Different skills, different timelines. Your PM can write 100 specs in a week, then you prioritize which 10 to implement. Design is cheap, implementation is expensive.

**Nothing is lost.**
Closed Jira ticket → context disappears.
Closed spec ticket → permanent documentation that references which ticket defined it `[FEAT-123]`, which PRs implemented it `[PR #567]`, and known issues `[BUG-200]`.

**Specs are living documents.**
They evolve. Update them. If the spec changes and reality doesn't match, you just created a new bug.

**Git-native storage.**
Specs and issues are markdown in git. Offline-first. Branches for experimentation. History as audit trail. grep/sed/vim just work. No vendor lock-in.


