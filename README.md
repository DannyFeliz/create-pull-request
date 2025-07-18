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

Use npm or yarn to install create-pull-request.

```bash
# npm
npm install create-pull-request --global

# yarn
yarn global add create-pull-request
```

## Usage

```bash
# Open pull request in default browser
create-pull-request

# Open pull request in specific browser
create-pull-request chrome
create-pull-request firefox
create-pull-request safari
create-pull-request edge
create-pull-request opera
create-pull-request brave
create-pull-request firefox-dev

# Show help
create-pull-request --help
```

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
