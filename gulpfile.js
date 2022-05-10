const
    gulp = require('gulp'),
    cache = require('gulp-cached'),
    eslint = require('gulp-eslint'),
    inputPaths = {
        JavaScript: ['**/*.js', '!./node_modules/**'],
    };

gulp.task('lint', function () {
    return gulp
        .src(inputPaths.JavaScript)
        .pipe(cache('lint'))
        .pipe(eslint({
            'extends': 'eslint:recommended',
            'envs': [
                'node',
            ],
            parserOptions: {
                ecmaVersion: 9,
                ecmaFeatures: {impliedStrict: true},
            },
            'rules': {
                'no-warning-comments': ['warn', {terms: ['todo', 'fixme', 'xxx'], location: 'anywhere'}],

                'no-console': 'off',

                'strict': ['error', 'global'],

                'indent': ['error', 4, {'SwitchCase': 1}],

                'brace-style': ['error', 'stroustrup'],

                'semi': ['error', 'always'],
                'no-extra-semi': 'error',
                'semi-spacing': ['error', {'before': false, 'after': true}],

                'keyword-spacing': ['error', {'before': true, 'after': true}],

                'no-trailing-spaces': 'error',

                'no-lonely-if': 'error',
                'key-spacing': 'error',
                'comma-spacing': 'error',
                'comma-dangle': ['error', 'always-multiline'],
                'space-infix-ops': ['error', {'int32Hint': true}],
                'array-bracket-spacing': ['error', 'never'],
                'object-curly-spacing': 'error',
                'space-before-function-paren': ['error', {'anonymous': 'always', 'named': 'never'}],
                'wrap-iife': ['error', 'outside'],
                'no-implied-eval': 'error',
                'quotes': ['error', 'single', {'avoidEscape': true}],

                'vars-on-top': 'error',
                /*'no-undef': 'error',*/
                'no-unused-vars': 'error',

                'eqeqeq': 'error',
                'no-plusplus': 'error',
                'no-constant-condition': ['error', {'checkLoops': false}],
                'no-eval': 'error',
                'no-extra-bind': 'error',
            },
        }))
        .pipe(eslint.format());
});

gulp.task('watch', function (done) {
    gulp.watch(inputPaths.JavaScript, gulp.series('lint'));
    done();
});

gulp.task('default', gulp.series('lint', 'watch'));