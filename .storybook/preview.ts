import type { Preview } from '@storybook/react-vite';
import '../src/tokens/index.css';

const preview: Preview = {
  parameters: {
    layout: 'centered',
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: ['light'],
        dynamicTitle: true
      }
    }
  },
  initialGlobals: {
    theme: 'light',
  },
  decorators: [
    (Story, context) => {
      document.documentElement.dataset.theme = context.globals.theme;
      return Story();
    }
  ],
  tags: ['autodocs']
};

export default preview;
