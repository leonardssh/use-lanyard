<p align="center">
  <img src="https://i.imgur.com/9tXV1lo.png" alt="Logo" />
</p>

  <h3 align="center"><b>Vue Use Lanyard</b></h3>

  <p align="center">
    Use Lanyard API easily in your Vue app!
    <br />
    <br />
    <a href="https://github.com/LeonardSSH/use-lanyard/issues">Report Bug</a>
    ·
    <a href="https://github.com/LeonardSSH/use-lanyard/issues">Request Feature</a>
    ·
    <a href="https://github.com/Phineas/lanyard">What Is Lanyard</a>
  </p>
</p>

<br>

Remember to 🌟 this Github if you 💖 it.

<br>

# 📦 Installation

- Using yarn: `yarn add @leonardssh/use-lanyard`
- Using npm: `npm i @leonardssh/use-lanyard`
- Using pnpm: `pnpm add @leonardssh/use-lanyard`

# 🤓 Usage

✨ **This plugin supports both REST and WebSocket methods.**

> Using without websocket:

```ts
import { useLanyard } from '@leonardssh/use-lanyard';

const { success, data, error } = await useLanyard({
	userId: 'USER_ID'
});
```

> Using with websocket:

```ts
import { useLanyard } from '@leonardssh/use-lanyard';

await useLanyard({
	userId: 'USER_ID',
	socket: true,
	onPresenceUpdate(presence: LanyardData) {
		...
	}
});
```

### 🎉 Thanks

- [Phineas](https://github.com/Phineas/) - Creator of Lanyard API
- [barbarbar338](https://github.com/barbarbar338/react-use-lanyard) - Creator of [react-use-lanyard](https://github.dev/barbarbar338/react-use-lanyard)
- [eggsy](https://github.com/eggsy) - Creator of [vue-lanyard](https://github.com/eggsy/vue-lanyard/)

## 👨‍💻 Contributing

To contribute to this repository, feel free to create a new fork of the repository and submit a pull request.

1. Fork / Clone and select the `main` branch.
2. Create a new branch in your fork.
3. Make your changes.
4. Commit your changes, and push them.
5. Submit a Pull Request [here](https://github.com/LeonardSSH/vscord/pulls)!

## 📋 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
