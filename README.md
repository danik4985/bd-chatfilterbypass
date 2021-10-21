# ChatFilterBypass

> Bypass discord chat filters with ease!

This is a plugin for [BetterDiscord](https://betterdiscord.app/). It lets you bypass discord chat filter bots.

[![version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://shields.io/)
[![made-with-javascript](https://img.shields.io/badge/Made%20with-JavaScript-1f425f.svg)](https://www.javascript.com)
[![license: mit](https://img.shields.io/badge/license-MIT-yellow.svg)](https://choosealicense.com/licenses/mit/)



### Disclaimer
**I AM IN NO WAY RESPONSIBLE FOR ANYTHING YOU DO WITH THIS PLUGIN.** I made it because someone asked me to make it. Whatever harm you cause with this is ***not my problem***. Got banned for spamming the n-word in #general? ***NOT MY PROBLEM!*** I think you know where I am going with this...

### Contents
1. [How it works](#how-it-works)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Support](#support)
5. [Roadmap](#roadmap)
6. [Contributing](#contributing)
7. [Final words](#final-words)

## How it works
This plugin has replaces letters in your messages with characters that look identical, but are actually different.
For example, it replaces regular `O` (Unicode *004F*) with Cyrilic capital letter `О` (Unicode *041E*), thanks to this, many discord bots don't match your swear words and let you use them.

In case that isn't working on your server, you can also toggle on blatant replacement, which replaces some characters with characters that look similiar, such as `O` => `0`.

And guess what, thats not all! You can also enable zero width space inserting, so that your words are even less likely to be filtered. Just note that this adds one character to your message per <5 letters word and 2 characters to your message for words with 5 or more letters!

## Installation
You can download this plugin from the [releases tab](https://github.com/danik4985/bd-chatfilterbypass/releases) of this github repo. Then insert it into your BD plugins folder and enable it.

## Configuration

![The configuration menu](https://cdn.discordapp.com/attachments/733703994018496564/900406852746100776/Screenshot_from_2021-10-20_17-34-51.png)

You can configure this plugin by finding it in the plugin menu and clicking the settings icon, just like you configure any other plugin.

The first free configuration options were already explained in [How it works](#how-it-works), so let me just explain the last one: Prefix.

This option lets you set a prefix that marks that you want to patch the message - let me explain:
If you set your prefix option to `--`, the message will need to start with `--` to be patched. This means that if your message doesnt start with `--`, it won't be modified. This prefix will of course be removed, so if you send
```
--penis
```
it will transform to
```
penis
```

## Support
If you need support, add me on discord: `danik#4985`

## Roadmap
- [x] Fix zero-width-space issues
- [ ] Extend the filters
- [ ] Make it possible to send a message starting with the prefix without patching it.
- [ ] Make it more customizable

## Contributing
Please contribute, I need to make the filters larger.

__Contributing rules:__
1. Try to follow my code style
2. When making a PR, please describe what changes you made

## Final words
> They thought I couldn't do this without their help, yet here we are. MUHEHEHEHEHE!
> Filthy betterdiscord discord server members...

Made for educational purpuoses I guess.


(C) danik4985 2021
