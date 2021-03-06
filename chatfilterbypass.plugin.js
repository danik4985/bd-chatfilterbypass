/**
 * @name ChatFilterBypass
 * @version 1.1.0
 * @description Automatically replace cerain letters with characters that look identical but are not to bypass chat filter bots.
 * @author danik#4985
 */
class ChatFilterBypass {

	#config = null

	#saveConfig() {
		BdApi.saveData('chatfilterbypass', 'config', JSON.stringify(this.#config))
	}

	#loadConfig() {
		const fetchedDataRaw = BdApi.loadData('chatfilterbypass', 'config')
		const defaultConfig = {
			ghost: true,
			blatant: false,
			addSpace: false,
			prefix: ''
		}

		try {
			this.#config = JSON.parse(fetchedDataRaw)
		} catch {
			BdApi.showToast(
				'ChatFilterBypass couldn\'t load your config. This is normal if this is your first time using this plugin. New config will be created!', 
				{
					type: 'warn',
					icon: true,
					timeout: 3500
				}
			)

			this.#config = defaultConfig
			this.#saveConfig()
		}
	}

	start() {
		if (!global.ZeresPluginLibrary) {
			BdApi.showToast('You need Zere\'s plugin library', {
				type: 'error',
				icon: true,
				timeout: 3500
			})

			return window.BdApi.alert("Library Missing",`The library plugin needed for ChatFilterBypass is missing.<br /><br /> <a href="https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js" target="_blank">Click here to download the library!</a>`)
		} else {
			ZLibrary.Patcher.after(
				'danik.chatfilterbypass.afterSendMessage',
				ZLibrary.DiscordModules.MessageActions,
				'sendMessage',
				(_, _msg) => {
					const [, msg] = _msg

					console.log(msg)
					msg.content = this.#editMessage(msg.content)
				}
			)

			this.#loadConfig()

			BdApi.showToast('ChatFilterBypass by danik was activated', {
				type: 'success',
				icon: true,
				timeout: 3500
			})
		}
	}

	stop() {
		ZLibrary.Patcher.unpatchAll('danik.chatfilterbypass.afterSendMessage')

		BdApi.showToast('ChatFilterBypass by danik was deactivated. Bye-bye!', {
			type: 'warn',
			icon: false,
			timeout: 3500
		})
	}

	/**
	 * Edit the message to bypass chat filters
	 * @param {string} content 
	 */
	#editMessage(content) {
		if (!content.startsWith(this.#config.prefix)) return content

		content = content.slice(this.#config.prefix.length)

		const EMOJI_REGEX = /<:[a-zA-Z_0-9]+:[0-9]+>/g
		const ZWS = '\u{200B}'

		const FILTERS_GHOST = {
			A: '??',
			a: '??',
			B: '??',
			C: '??',
			c: '??',
			E: '??',
			e: '??',
			h: '??',
			I: '??',
			i: '??',
			j: '??',
			l: '??',
			M: '??',
			N: '??',
			O: '??',
			o: '??',
			P: '??',
			p: '??',
			T: '??',
			X: '??',
			x: '??',
			y: '??'
		}

		const FILTERS_BLATANT = {
			d: '??', // Looked different in terminal wtf
			e: '???',
			i: '1',
			k: '??',
			n: '??',
			o: '0',
			p: '??',
			u: '??',
			v: '??',
			z: '??'
			// WIP btw
			// someone contribute
			// pls
		}

		const emojiFound = content.match(EMOJI_REGEX) ?? []
		const emojiMap = {}

		emojiFound.forEach((i, n) => {
			content = content.split(i).join(`<:??-:${n}>`)
			emojiMap[`<:??-:${n}>`] = i
		})

		if (this.#config.ghost) for (const i in FILTERS_GHOST) content = content.split(i).join(FILTERS_GHOST[i])
		if (this.#config.blatant) for (const i in FILTERS_BLATANT) content = content.split(i).join(FILTERS_BLATANT[i])
		if (this.#config.addSpace) content = content
				.split(' ')
				.map(
					i => /^[a-zA-Z0-9]+$/gm.test(i)
						? i.length < 5 ? i[0] + ZWS + i.slice(1) : i[0] + ZWS + i.slice(1, -1) + ZWS + i[i.length - 1]
						: i
				)
				.join(' ')

		for (const i in emojiMap) content = content.split(i).join(emojiMap[i])

		return content
	}

	load() {
		BdApi.showToast('Thank you for using ChatFilterBypass by danik', {
			type: 'info',
			icon: true,
			timeout: 3500
		})
	}

	getSettingsPanel() {
		return ZLibrary.Settings.SettingPanel.build(
			() => {
				console.log('A setting has changed')
			},
			new ZLibrary.Settings.Switch(
				'Ghost patching',
				'Replace letters with identical ones',
				this.#config.ghost,
				(v) => {
					this.#config.ghost = v
					this.#saveConfig()
				}
			),
			new ZLibrary.Settings.Switch(
				'Blatant patching',
				'Replace letters with similiar characters (such as `i` with `1`)',
				this.#config.blatant,
				(v) => {
					this.#config.blatant = v
					this.#saveConfig()
				}
			),
			new ZLibrary.Settings.Switch(
				'Add zero width spaces',
				'Add zero width spaces to words? This will bypass even more advanced filters, but adds extra 1 or 2 characters per word.',
				this.#config.addSpace,
				(v) => {
					this.#config.addSpace = v
					this.#saveConfig()
				}
			),
			new ZLibrary.Settings.Textbox(
				'Message prefix',
				'Only patch message when it starts with some prefix, this will remove the prefix. Leave blank to always patch',
				this.#config.prefix,
				(v) => {
					this.#config.prefix = v
					this.#saveConfig()
				}
			)
		)
	}
}
