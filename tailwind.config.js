const theme = require('tailwindcss/defaultTheme');
const aspect_ratio = require('@tailwindcss/aspect-ratio');
const pseudo_elements = require('tailwindcss-pseudo-elements');
const tailwindcss_plugin = require('tailwindcss/plugin');

module.exports = {
	important: false,
	darkMode: 'class',
	//mode: 'jit',
	purge: {
		enabled: process.env.HUGO_ENVIRONMENT === 'production',
		content: [
			'./hugo_stats.json',
			'./layouts/**/*.html',
			'./content/**/*.md',
		],
		extractors: [{
			extractor: (content) => {
				let els = JSON.parse(content).htmlElements;
				return els.tags.concat(els.classes, els.ids);
			},
			extensions: ['json']
		}, ],
		mode: 'all',
		options: {
			safelist: ['table', 'th', 'tr', 'td', 'w-screen', 'h-screen', 'max-w-screen-lg', 'aspect-w-6', 'bg-opacity-60', 'aspect-h-7', 'black',  'autoComplete_result', 'autoComplete_highlighted', 'autoComplete_selected'],
		}
	},
	theme: {
		extend: {
			colors: {
				primary: 'var(--primary)',
				'primary-text': 'var(--primary-text)',
				secondary: 'var(--secondary)',
				'secondary-text': 'var(--secondary-text)',
				body: 'var(--body)',
				'body-primary': 'var(--body-primary)',
				'body-secondary': 'var(--body-secondary)',
				'body-text': 'var(--body-text)',
				'body-text-primary': 'var(--body-text-primary)',
				'body-text-secondary': 'var(--body-text-secondary)',
				heading: 'var(--heading)',
				'heading-primary': 'var(--heading-primary)',
				'heading-secondary': 'var(--heading-secondary)',
                'menu-bg': 'var(--menu-bg)',
                'menu-bg-hover': 'var(--menu-bg-hover)',
                'submenu-bg': 'var(--submenu-bg)',
                'submenu-bg-hover': 'var(--submenu-bg-hover)',
                'menu-text': 'var(--menu-text)',
                'menu-text-hover': 'var(--menu-text-hover)',
                'submenu-text': 'var(--submenu-text)',
                'submenu-text-hover': 'var(--submenu-text-hover)',
				header: 'var(--header)',
				'header-text': 'var(--header-text)',
				footer: 'var(--footer)',
				'footer-primary': 'var(--footer-primary)',
				'footer-secondary': 'var(--footer-secondary)',
				'footer-text': 'var(--footer-text)',
				'footer-text-primary': 'var(--footer-text-primary)',
				'footer-text-secondary': 'var(--footer-text-secondary)',
				'hint-text': 'var(--hint-text)',
				'border-color': 'var(--border-color)',
                'banner-text-primary': 'var(--banner-text-primary)',
                'banner-text-secondary': 'var(--banner-text-secondary)',
				
				facebook: '#3b5999',
				twitter: '#55acee',
				pinterest: '#bd081c',
				youtube: '#cd201f',
				whatsapp: '#25D366',
				line: '#00c300',
				instagram: '#e4405f',
			},
			spacing: {
				'-px': '-1px',
				'-8': '-2rem',
				'-6': '-1.5rem',
				'-5': '-1.25rem',
				'-4': '-1rem',
				'-3': '-0.75rem',
				'-2': '-0.5rem',
				'-1': '-0.25rem',
				'2px': '2px',
				'3px': '3px',
				'4px': '4px',
				'5px': '5px',
				'6px': '6px',
				'7px': '7px',
				'8px': '8px',
				'9px': '9px',
				'10px': '10px',
				'14px': '14px',
				'100px': '100px',
				'200px': '200px',
				'300px': '300px',
				'400px': '400px',
				'10pr': '10%',
				'15pr': '15%',
				'20pr': '20%',
				'25pr': '25%',
				'30pr': '30%',
				'40pr': '40%',
				'50pr': '50%',
				'60pr': '60%',
				'70pr': '70%',
				'75pr': '75%',
				'80pr': '80%',
				'90pr': '90%',
				'100pr': '100%',
			},
			backgroundSize: {
				'100-50': '100% 50%',
			},
			borderWidth: {
				'1': '1px',
				'2': '2px',
				'3': '3px',
				'4': '4px',
				'5': '5px',
				'6': '6px',
				'10': '10px',
				'12': '12px',
			},
			cursor: {
				crosshair: 'crosshair',
				'zoom-in': 'zoom-in',
				'n-resize': 'n-resize',
			},
			flexGrow: {
				'2': '2',
				'3': '3',
				'4': '4',
				'5': '5',
			},
			flexShrink: {
				'2': '2',
				'3': '3',
			},
			fontFamily: {
				heading: ['var(--font-heading)'],
				body: ['var(--font-body)'],
			},
			fontSize: {
				'3xs': '0.5rem',
				'2xs': '0.625rem',
			},
			lineHeight: {
				'0': '0',
			},
			height: theme => ({
				auto: 'auto',
				...theme('spacing'),
				'90vh': '90vh',
			}),
			inset: (theme, {
				negative
			}) => ({
				auto: 'auto',
				...theme('spacing'),
				...negative(theme('spacing')),
			}),
			listStyleType: {
				circle: 'circle',
				square: 'square',
				'lower-latin': 'lower-latin',
				'lower-roman': 'lower-roman',
				'upper-latin': 'upper-latin',
				'upper-roman': 'upper-roman',
			},
			maxHeight: {
				half: '50%',
			},
			width: theme => ({
				auto: 'auto',
				...theme('spacing'),
				'full-40px': 'calc(100% + 40px)',
			}),
			fill: theme => ({
				'primary': 'var(--primary)',
				'secondary': 'var(--secondary)',
				'teal': theme('colors.teal.500'),
			}),
			placeholderColor: theme => ({
				...theme('colors'),
				'hint-text': 'var(--hint-text)',
				'body-text-secondary': 'var(--body-text-secondary)',
			}),
			zIndex: {
				'60': '60',
				'70': '70',
				'80': '80',
				'90': '90',
				'100': '100',
			},
            transitionTimingFunction: {
                'ease': 'ease',
            },
			transitionDelay: {
				'10000': '10000ms'
			},
            scale: {
                '0': '0',
                '25': '.25',
				'200': '2',
				'500': '5',
			},
			animation: {
				marquee: 'runningToLeft 300s linear infinite',
				fadeInDown: 'fadeInDown 900ms ease-in-out',
				fadeInUp: 'fadeInUp 900ms ease-in',
				bounceInLeft: 'bounceInLeft 2200ms ease-in backwards',
				'leftright-1': 'bounceInLeft 1s ease-in backwards',
				'leftright-2': 'bounceInLeft 1.6s ease-in backwards',
				'leftright-3': 'bounceInLeft 2.2s ease-in backwards',
				'leftright-4': 'bounceInLeft 2.8s ease-in backwards',
				'leftright-5': 'bounceInLeft 3.4s ease-in backwards',
			},
			keyframes: {
				marquee: {
					'0%': {
						'transform': 'translate(0, 0)'
					},
					'100%': {
						'transform': 'translate(-100%, 0)'
					},
				},
				runningToLeft: {
					'100%': {
						'background-position': '-10000px 0px'
					},
				},
				fadeInDown: {
					'0%': {
						opacity: '0',
						transform: 'translate3d(0, -200%, 0)'
					},
					'100%': {
						opacity: '1',
						transform: 'none'
					},
				},
				fadeInUp: {
					'0%': {
						opacity: '1',
						transform: 'none'
					},
					'100%': {
						opacity: '0',
						transform: 'translate3d(0, -200%, 0)'
					},
				},
				bounceInLeft: {
					'0%,60%,75%,90%,100%': {
						transitionTimingFunction: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
					},
					'0%': {
						opacity: '0',
						transform: 'translate3d(-3000px, 0, 0)'
					},
					'60%': {
						opacity: '1',
						transform: 'translate3d(25px, 0, 0)'
					},
					'75%': {
						transform: 'translate3d(-10px, 0, 0)'
					},
					'90%': {
						transform: 'translate3d(5px, 0, 0)'
					},
					'100%': {
						transform: 'none'
					},
				}
			},
			aspectRatio: {
				19: '19',
				21: '21'
			}
		}
	},
	variants: {
		extend: {
			backgroundColor: ['before', 'after', 'dark', 'focus'],
            backgroundOpacity: ['before', 'after'],
			borderColor: ['hover', 'before', 'focus'],
			borderRadius: ['before'],
			borderStyle: ['hover', 'before', 'focus'],
			borderWidth: ['hover', 'before', 'focus', 'last'],
			boxShadow: ['after'],
			cursor: ['hover', 'group-hover'],
			display: ['last', 'before', 'after'],
			float: ['before'],
			fontSize: ['after'],
			fontWeight: ['hover', 'focus'],
			height: ['hover', 'focus', 'before', 'after'],
			inset: ['hover', 'group-hover', 'before', 'after'],
			lineHeight: ['after'],
			margin: ['first', 'last', 'before', 'after'],
            opacity: ['hover', 'group-hover', 'before', 'after'],
			outline: ['hover'],
			padding: ['before', 'after', 'first', 'last'],
			placeholderColor: ['hover', 'active'],
			position: ['hover', 'before', 'after', 'focus', 'important'],
			textColor: ['before', 'after'],
			width: ['hover', 'focus', 'before', 'after', 'group-hover'],
			zIndex: ['before', 'after'],
			rotate: ['active', 'before', 'after'],
			scale: ['group-hover'],
			transform: ['hover', 'focus', 'active', 'before', 'after', 'group-hover'],
			transformOrigin: ['group-hover'],
			translate: ['group-hover'],
			transitionProperty: ['hover', 'group-hover', 'focus', 'before', 'after'],
			transitionTimingFunction: ['hover', 'group-hover', 'before', 'after'],
			transitionDuration: ['hover', 'group-hover', 'before', 'after'],
			transitionDelay: ['hover'],
			aspectRatio: ['responsive', 'hover']
		},
	},
	corePlugins: {},
	plugins: [
		aspect_ratio,
		pseudo_elements,
		tailwindcss_plugin,
		function ({
			addBase,
			config
		}) {
			addBase({
				'h1': {
					fontSize: config('theme.fontSize.3xl'),
					fontWeight: config('theme.fontWeight.bold'),
					marginBottom: config('theme.spacing.4'),
					fontFamily: config('theme.fontFamily.heading')
				},
				'h2': {
					fontSize: config('theme.fontSize.2xl'),
					fontWeight: config('theme.fontWeight.bold'),
					marginBottom: config('theme.spacing.4'),
					fontFamily: config('theme.fontFamily.heading')
				},
				'h3': {
					fontSize: config('theme.fontSize.xl'),
					fontWeight: config('theme.fontWeight.bold'),
					marginBottom: config('theme.spacing.4'),
					fontFamily: config('theme.fontFamily.heading')
				},
				'h4': {
					fontSize: config('theme.fontSize.lg')
				},
				'a': {
					color: config('theme.colors.primary')
				},
				'p': {
					marginBottom: config('theme.spacing.6')
				},
				'ol': {
					listStyleType: config('theme.listStyleType.decimal'),
					paddingLeft: config('theme.spacing.6'),
					marginBottom: config('theme.spacing.4')
				},
				'ul': {
					listStyleType: config('theme.listStyleType.disc'),
					paddingLeft: config('theme.spacing.6'),
					marginBottom: config('theme.spacing.4')
				},
				'li': {
					marginBottom: config('theme.spacing.2')
				},
				'table': {
					tableLayout: 'auto',
					marginTop: config('theme.spacing.4'),
					marginBottom: config('theme.spacing.6')
				},
				'table th': {
					fontSize: config('theme.fontSize.xs'),
					paddingLeft: config('theme.spacing.2'),
					paddingRight: config('theme.spacing.2'),
					paddingTop: config('theme.spacing.2'),
					paddingBottom: config('theme.spacing.2'),
					borderWidth: config('theme.borderWidth.1'),
					background: config('theme.colors.lightgray')
				},
				'table td': {
					fontSize: config('theme.fontSize.xs'),
					paddingLeft: config('theme.spacing.2'),
					paddingRight: config('theme.spacing.2'),
					paddingTop: config('theme.spacing.2'),
					paddingBottom: config('theme.spacing.2'),
					borderWidth: config('theme.borderWidth.1')
				},
			})
		},
		function ({
			addUtilities
		}) {
			const newUtilities = {
				'.empty-content': {
					content: "''",
				},
				'.checked-content': {
					content: "'✓'",
				},
				'.dot-content': {
					content: "'.'",
				},
                '.comma-content': {
					content: "','",
				},
				'.bg-mask': {
					content: "''",
					position: 'absolute',
					top: '0',
					width: '100%',
					height: '100%',
					background: 'radial-gradient(rgba(47,48,50,.2),rgba(47,48,50,.7))',
					'box-shadow': 'inset 0 0 50px rgba(0,0,0,.15)',
					visibility: 'visible',
					transition: 'visibility .35s cubic-bezier(.25,.46,.45,.94),opacity .35s cubic-bezier(.25,.46,.45,.94)',
					opacity: '1',
				},
			}
			addUtilities(newUtilities, ['before', 'after', 'hover', 'important'])
		},
		function ({
			addVariant
		}) {
			addVariant('important', ({
				container
			}) => {
				container.walkRules(rule => {
					rule.selector = `.\\!${rule.selector.slice(1)}`
					rule.walkDecls(decl => {
						decl.important = true
					})
				})
			})
		}
	]
}
