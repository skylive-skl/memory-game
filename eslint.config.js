import js from '@eslint/js';
import globals from 'globals';
import prettier from 'eslint-config-prettier';

const forbiddenHtmlApi = 'Запрещено условиями задания: используйте document.createElement.';

export default [
  { ignores: ['dist', 'node_modules'] },
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser },
    },
    rules: {
      'no-alert': 'error',
      'no-restricted-syntax': [
        'error',
        {
          selector:
            'AssignmentExpression > MemberExpression[property.name=/^(innerHTML|outerHTML)$/]',
          message: forbiddenHtmlApi,
        },
        {
          selector:
            'CallExpression[callee.property.name=/^(insertAdjacentHTML|write|writeln|createContextualFragment)$/]',
          message: forbiddenHtmlApi,
        },
        { selector: "NewExpression[callee.name='DOMParser']", message: forbiddenHtmlApi },
      ],
    },
  },
  prettier,
];
