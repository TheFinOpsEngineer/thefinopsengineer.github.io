import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'The FinOps Engineer', // <--- BRAND LOCKED IN
  tagline: 'Cloud Cost Optimization. Docs-as-Code.',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://finops-engineer.vercel.app', // <--- Placeholder for Vercel
  // Set the /<baseUrl>/ pathname suffix.
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'TheFinOpsEngineer',
  projectName: 'thefinopsengineer.github.io',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use a custom domain, use English
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/TheFinOpsEngineer/thefinopsengineer.github.io/tree/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // editUrl: 'https://github.com/TheFinOpsEngineer/thefinopsengineer.github.io/tree/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'The FinOps Engineer', // <--- Brand in Top Left
      logo: {
        alt: 'FinOps Engineer Logo',
        src: 'img/logo.svg', // We will replace this later
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'The FOCUS Spec',
        },
        // {to: '/blog', label: 'Field Notes', position: 'left'}, <--- Commented out until we write a post

        { to: '/about', label: 'About', position: 'left' },

        {
          href: 'https://github.com/TheFinOpsEngineer/website', // Update if you haven't yet
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'FOCUS Specification',
              to: '/docs/focus-certification/intro', // <--- FIXED LINK
            },
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/company/anick16',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/TheFinOpsEngineer',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} The FinOps Engineer. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;