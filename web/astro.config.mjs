// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  site: 'https://nebelhaus.com',
  // Custom landing page lives at src/pages/index.astro; Starlight owns the rest.
  integrations: [
    starlight({
      title: 'nebelhaus',
      description:
        'An opinionated macOS, raised in the fog — silver-grey, keyboard-first, reproducible, Nix-native. One curl and one flake raise the whole house.',
      logo: {
        light: './src/assets/logos/nebelhaus-mark-fill.png',
        dark: './src/assets/logos/nebelhaus-mark-fill.png',
        alt: 'nebelhaus',
        replacesTitle: false,
      },
      favicon: '/favicon.png',
      customCss: ['./src/styles/nebelung.css'],
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/nebelhaus' },
      ],
      editLink: {
        baseUrl: 'https://github.com/nebelhaus/workshop/edit/main/web/',
      },
      head: [
        {
          tag: 'meta',
          attrs: { property: 'og:image', content: 'https://nebelhaus.com/social/og.png' },
        },
        {
          tag: 'meta',
          attrs: { name: 'twitter:card', content: 'summary_large_image' },
        },
        {
          tag: 'meta',
          attrs: { name: 'twitter:image', content: 'https://nebelhaus.com/social/og.png' },
        },
      ],
      sidebar: [
        {
          label: 'Start here',
          items: [
            { label: 'What is nebelhaus?', slug: 'start/what-is-nebelhaus' },
            { label: 'Install', slug: 'start/install' },
            { label: 'First run', slug: 'start/first-run' },
            { label: 'The family', slug: 'start/the-family' },
          ],
        },
        {
          label: 'Guides',
          items: [
            { label: 'Making it yours', slug: 'guides/making-it-yours' },
            { label: 'Adding apps & tools', slug: 'guides/adding-apps' },
            { label: 'Window management (prowl)', slug: 'guides/window-management' },
            { label: 'The bar (sill)', slug: 'guides/the-bar' },
            { label: 'The shell (hearth)', slug: 'guides/the-shell' },
            { label: 'Touch ID for sudo (collar)', slug: 'guides/touch-id' },
            { label: 'Focus & DND (hush)', slug: 'guides/hush' },
            { label: 'Pounce — the launcher', slug: 'guides/pounce' },
            { label: 'Writing pounce commands', slug: 'guides/pounce-commands' },
            { label: 'Messages (trill)', slug: 'guides/trill' },
            { label: 'Theming & accents (nebelung)', slug: 'guides/theming' },
            { label: 'Keeping in sync (haus)', slug: 'guides/staying-in-sync' },
            { label: 'Moving to a new Mac', slug: 'guides/new-mac' },
          ],
        },
        {
          label: 'Reference',
          items: [
            { label: 'nebelhaus.* options', slug: 'reference/options' },
            { label: 'Keybindings cheatsheet', slug: 'reference/keybindings' },
            { label: 'Pounce config & CLI', slug: 'reference/pounce' },
            { label: 'The nebelung palette', slug: 'reference/palette' },
            { label: 'The haus CLI', slug: 'reference/haus' },
            { label: 'Troubleshooting', slug: 'reference/troubleshooting' },
          ],
        },
        {
          label: 'Under the hood',
          items: [
            { label: 'How the flakes fit together', slug: 'internals/flakes' },
            { label: 'Contributing & worktrees', slug: 'internals/contributing' },
          ],
        },
      ],
    }),
  ],
});
