import { MainNavItem } from '@/types'
import { dashboardConfig } from './dashboard'

const links = {
  github: 'https://github.com/RenanSui/spenso',
  githubAccount: 'https://github.com/RenanSui',
}

const lobby = {
  author: 'Kelly Sikkema',
  imageUrl:
    'https://images.unsplash.com/photo-1554224155-a1487473ffd9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  authorUrl: 'https://unsplash.com/@kellysikkema?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash',
  imagePageUrl:
    'https://unsplash.com/photos/coffee-mug-near-open-folder-with-tax-withholding-paper-wgcUx0kR1ps?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash',
}

const auth = {
  author: 'Yoaz Aziz',
  imageUrl:
    'https://images.unsplash.com/photo-1554797589-7241bb691973?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  authorUrl: 'https://unsplash.com/@yoavaziz?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash',
  imagePageUrl:
    'https://unsplash.com/photos/men-in-black-suits-standing-in-the-hallway-tKCd-IWc4gI?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash',
}

export const siteConfig = {
  name: 'Spenso',
  description: 'Spenso is the easiest way to keep track of your spendings',
  url: 'https://spenso.vercel.app',
  links,
  unsplash: {
    lobby,
    auth,
  },

  mainNav: [
    {
      title: 'Dashboard',
      items: [
        ...dashboardConfig.SidebarNav.map((dashboard) => ({
          title: dashboard.title,
          href: dashboard.href,
          description: dashboard.description,
          disabled: dashboard.disabled,
          items: [],
        })),
      ],
    },
  ] satisfies MainNavItem[],
}
