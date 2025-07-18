[<img src="https://img.shields.io/npm/dt/create-pull-request.svg">](https://www.npmjs.com/package/create-pull-request)
[<img src="https://img.shields.io/npm/v/create-pull-request.svg">](https://www.npmjs.com/package/create-pull-request)
[![CI](https://github.com/DannyFeliz/create-pull-request/actions/workflows/ci.yml/badge.svg)](https://github.com/DannyFeliz/create-pull-request/actions/workflows/ci.yml)

# create-pull-request

create-pull-request is a CLI that allows you to open the URL to create a pull request pointing to the base branch in GitHub, BitBucket, and GitLab.

## Support
- GitHub
- BitBucket  
- GitLab

## Installation

Use npm, yarn, pnpm, or bun to install create-pull-request.

```bash
# npm
npm install create-pull-request --global

# yarn
yarn global add create-pull-request

# pnpm
pnpm add create-pull-request --global

# bun
bun add create-pull-request --global
```

## Usage

```bash
# Open pull request in default browser
create-pull-request
# or use shorter aliases
cpr
open-pr
openpr

# Open pull request in specific browser
create-pull-request chrome
# or use shorter aliases
cpr firefox
open-pr safari
openpr edge

# All browsers work with any alias
cpr chrome
cpr firefox
cpr firefox-dev
cpr safari
cpr edge
cpr opera
cpr brave

# Show help
create-pull-request --help
cpr --help
open-pr --help
openpr --help
```

## Available Aliases

For convenience, you can use any of these command aliases:

- `create-pull-request` (full name)
- `cpr` (short form)
- `open-pr` (alternative)
- `openpr` (alternative without dash)

All aliases work identically - use whichever you prefer!

## Supported Browsers

- Chrome (`chrome`)
- Firefox (`firefox`)
- Firefox Developer Edition (`firefox-dev`)
- Safari (`safari`)
- Microsoft Edge (`edge`)
- Opera (`opera`)
- Brave (`brave`)

## Development

### Running Tests

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests once
npm run test:run

# Run tests with coverage
npm run test:coverage
```

### Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests for your changes
5. Ensure tests pass (`npm test`)
6. Commit your changes (`git commit -m 'Add some amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
