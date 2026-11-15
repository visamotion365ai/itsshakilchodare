import type { Config } from 'tailwindcss';
import preset from '@visahobe/design-system/tailwind-preset';

const config: Config = {
  presets: [preset as Partial<Config>],
  content: [
    './src/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
    '../../packages/shared/src/**/*.{ts,tsx}',
  ],
};

export default config;
