GHCR: how to create and set a PAT for pushing images

Required token scopes
- For public repositories: `write:packages` and `read:packages`.
- For private repositories: add `repo` scope in addition to the package scopes.

Steps to create a PAT
1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)" or "Generate new token" depending on your UI.
3. Give it a descriptive name (e.g. "CI GHCR PAT").
4. Select scopes:
   - `write:packages` (required)
   - `read:packages` (recommended)
   - If the repo is private: `repo` (or more narrow scopes as needed)
5. Generate token and copy it immediately (you won't see it again).

Set repository secret
1. In the repository, go to Settings -> Secrets -> Actions -> New repository secret.
2. Name: `GHCR_PAT`
3. Paste the token value and save.

Notes
- The CI workflow expects a secret named `GHCR_PAT`.
- If you still see `denied: denied` errors, double-check that the token belongs to the same user or an org account with permission to push to the target repository under ghcr.io.
- For organization-owned images under ghcr.io, you may need to grant package write permissions or use an org PAT or GitHub App with appropriate permissions.
