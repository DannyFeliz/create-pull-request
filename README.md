# open-pr

open-pr is a CLI that allows you to open the URL to create a pull request pointing to the base branch in Github.

## Installation

Use npm or yarn to install open-pr.

```bash
# npm
npm install @dannyfeliz/open-pr --global

# yarn
yarn add @dannyfeliz/open-pr --global
```

## Usage

```
// in the terminal in your project folder
open-pr
```

It will open an URL to create a new pull request pointing to the base branch.

e.g.
if you have the `linux` project and you're working in a cool feature like `my-cool-feature` and the project origin url is `git@github.com:torvalds/linux.git` if you run `open-pr` it will open this URL

```bash
https://github.com/torvalds/linux/compare/my-cool-feature?expand=1
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
