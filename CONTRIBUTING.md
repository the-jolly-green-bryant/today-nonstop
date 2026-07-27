# Contributing

Thanks for your interest in Today Nonstop.

## Development workflow

1. Fork the repository and create a focused branch.
2. Install dependencies with `npm ci`.
3. Make the smallest change that solves the issue.
4. Run `npm run check`.
5. Open a pull request explaining the behavior and validation.

Do not commit generated web output, local environment files, signing material,
or credentials. Story-data changes should remain valid JSON and should be
tested through both the player and the `/editor` route.
