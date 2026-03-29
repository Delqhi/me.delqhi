# ADR 0001: Repo structure and docs standard

## What this is
Architecture Decision Record for the documentation scaffold in this repo.

## What it's for
Documents why the repository now ships with root agent files and a structured docs tree.

## How to create future ADRs
Use the next integer prefix (`0002`, `0003`, ...) and keep the title short and specific.

## Status
Accepted

## Context
The repository needed a consistent, human-readable documentation shape so future updates can be found quickly without scanning the whole app.

## Decision
Add root-level agent guidance files (`AGENTS.md`, `llms.txt`, `A2A-CARD.md`) and a numbered `docs/` tree for vision, design, spec, ops, and legal material.

## Consequences
- Onboarding is faster for humans and agents.
- Documentation is easier to extend without mixing concerns.
- The repo has a few more files to maintain, so updates must stay disciplined.
