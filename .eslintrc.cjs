/**
 * Room to Breathe
 *
 * The thinking behind this config is that less code is better
 * therefore the code you *do* write has plenty of space to read
 * and takes up less space on the screen, making it harder to
 * write dense code.
 *
 * Reading code should be easy and fun, not a chore.
 *
 * If you find yourself needing to write dense code, step back
 * start to think about how can break your solution into smaller
 * pieces.
 *
 * The best solution is not the most complicated, it's the one
 * that is the easiest to understand and change.
 */

module.exports = {
    extends: [
        // TODO: Integrate Astro linting
        // 'plugin:astro/recommended',
        '@antfu',
    ],
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 13,
    },
    ignorePatterns: [
        // Markdown files anywhere
        '**/*.md',
        // TSX files anywhere
        '**/*.tsx',
        // JSON Store path
        'src/json/*',
    ],
    rules: {
        // Indent with 4 spaces
        'indent': ['error', 4, {
            SwitchCase: 1,
        }],

        'jsonc/indent': ['error', 4],

        'vue/html-indent': ['error', 4],

        'vue/component-tags-order': ['error', {
            order: ['template', 'script', 'style'],
        }],

        // Typescript Indent
        '@typescript-eslint/indent': ['error', 4],

        'space-in-parens': ['error', 'always'],

        'space-before-function-paren': ['error', 'always'],

        '@typescript-eslint/space-before-function-paren': ['error', 'always'],

        'object-curly-spacing': ['error', 'always'],

        'array-bracket-spacing': ['error', 'always'],

        'computed-property-spacing': ['error', 'always'],

        'template-curly-spacing': ['error', 'always'],

        // Enforce curly braces for all control statements
        'curly': ['error', 'all'],

        'quotes': ['error', 'single'],

        // Disable semicolons
        'semi': 'off',
        '@typescript-eslint/semi': ['error', 'never'],

        'import/extensions': 0,
    },

    overrides: [
        {
            files: [
                './**/*.vue',
                './**/*.config.*',
            ],
            rules: {
                'import/no-anonymous-default-export': 'off',
            },
        },
    ],
}
