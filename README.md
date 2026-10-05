# TFTTimeSync-node

**TFTTimeSync-node** is a Node.js utility for synchronizing the time on the built-in TFT display of Ajazz AK35i V3 MAX keyboards and other supported models. This project replicates the functionality of the official Ajazz tool, enabling cross-platform time updates via USB HID communication.

---

## ⚙️ Features

- Syncs system time to the TFT screen on Ajazz AK35i V3 MAX keyboards and compatible models
- Designed for Node.js with cross-platform support
- Lightweight CLI utility
- Built from reverse-engineered USB traffic for community control

---

## 🧱 Requirements

- Node.js v18+
- `node-hid` (included as a dependency)
- Compatible Ajazz keyboard (tested on AK35i V3 MAX & AK870 MAX)
- USB HID permissions (on macOS/Linux, requires `sudo` or udev rules)

---

## 📦 Installation

```bash
git clone https://github.com/KyleBoyer/TFTTimeSync-node.git
cd TFTTimeSync-node
npm install
```

---

## 🚀 Usage

Using `npm start`:

```bash
sudo env "PATH=$PATH" npm start -- -d AK870_MAX -l SingleOn
```

### Running Compiled JavaScript (`dist/index.js`)

If you prefer compiling TypeScript to JavaScript first:

```bash
# Build the TypeScript code
npm run build

# Run the compiled dist file
sudo "$(which node)" dist/index.js -d AK870_MAX -l SingleOff
```

---

## ⚙️ Options & Commands

### CLI Options

| Flag | Description | Default |
| --- | --- | --- |
| `-d, --device <device>` | Supported device model (`AK351_V3_MAX`, `AK870_MAX`) | `AK351_V3_MAX` |
| `-l, --lighting-mode <mode>` | Lighting mode name or index number | `Launch` |
| `--usb-delay <delay>` | Delay (in ms) between USB control commands | `40` |
| `--debug` | Enable debug log output | `false` |
| `-h, --help` | Display help information | |

---

## 💡 Available Lighting Modes

You can set the keyboard lighting mode by passing its **name** or **index number** with the `-l` / `--lighting-mode` flag:

```bash
# Set lighting mode by name
sudo env "PATH=$PATH" npx tsx src/index.ts -d AK870_MAX -l Spectrum

# Set lighting mode by index number
sudo env "PATH=$PATH" npx tsx src/index.ts -d AK870_MAX -l 8
```

| Index | Mode Name | Description |
| :---: | --- | --- |
| `0` | `OFF` | Turn off all backlights |
| `1` | `Static` | Constant single color |
| `2` | `SingleOn` | Keys light up when pressed |
| `3` | `SingleOff` | Keys turn off when pressed |
| `4` | `Glittering` | Starry / sparkling effect |
| `5` | `Falling` | Falling droplets effect |
| `6` | `Colourful` | Multi-color wave |
| `7` | `Breath` | Smooth breathing fade |
| `8` | `Spectrum` | Full RGB spectrum cycle |
| `9` | `Outward` | Outward ripple from pressed key |
| `10` | `Scrolling` | Horizontal scrolling wave |
| `11` | `Rolling` | Rolling wave pattern |
| `12` | `Rotating` | Rotating light pattern |
| `13` | `Explode` | Explosion ripple effect |
| `14` | `Launch` | Rocket launch animation *(Default)* |
| `15` | `Ripples` | Water ripple effect |
| `16` | `Flowing` | Flowing stream effect |
| `17` | `Pulsating` | Rhythmic pulse |
| `18` | `Tilt` | Angular tilted wave |
| `19` | `Shuttle` | Shuttle sweep effect |

---

### Demo Command

Cycle through all available lighting modes to test/demo them:

```bash
# Compiled JS execution
sudo "$(which node)" dist/index.js demo -d AK870_MAX -t 5
```

- `-t, --time <seconds>`: Number of seconds to display each lighting mode (default: 5)
