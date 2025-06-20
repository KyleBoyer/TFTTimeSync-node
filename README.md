# TFTTimeSync-node

**TFTTimeSync-node** is a Node.js utility for synchronizing the time on the built-in TFT display of Ajazz AK35i V3 MAX keyboards and other supported models. This project replicates the functionality of the official Ajazz tool, enabling cross-platform time updates via USB HID communication.

---

## ⚙️ Features

- Syncs system time to the TFT screen on Ajazz AK35i V3 MAX keyboards
- Designed for Node.js with cross-platform support
- Lightweight CLI utility
- Built from reverse-engineered USB traffic for community control

---

## 🧱 Requirements

- Node.js v18+
- `node-hid` (included as a dependency)
- Compatible Ajazz keyboard (tested on AK35i V3 MAX)
- USB HID permissions (on macOS/Linux, may require `sudo` or udev rules)

---

## 📦 Installation

```bash
git clone https://github.com/KyleBoyer/TFTTimeSync-node.git
cd TFTTimeSync-node
npm install
