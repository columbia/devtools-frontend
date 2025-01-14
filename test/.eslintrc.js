// Copyright 2020 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

const path = require('path');
const rulesDirPlugin = require('eslint-plugin-rulesdir');
rulesDirPlugin.RULES_DIR = path.join(__dirname, '..', 'scripts', 'eslint_rules', 'lib');

module.exports = {
  'rules' : {
    // errors on it('test') with no body
    'mocha/no-pending-tests' : 'error',

    // errors on {describe, it}.only
    'rulesdir/no_only' : 'error',
    'rulesdir/check_test_definitions' : 'error',
    'rulesdir/avoid_assert_equal' : 'error',
    'rulesdir/no_repeated_tests' : 'error',
    'rulesdir/compare_arrays_with_assert_deepequal' : 'error',
    'rulesdir/ban_screenshot_test_outside_perf_panel' : 'error',
    'rulesdir/trace_engine_test_timeouts' : 'error',
  },
  'overrides' : [{
    'files' : ['*.ts'],
    'rules' : {
      '@typescript-eslint/naming-convention' :
                                             [
                                               'error',
                                               {
                                                 'selector' :
                                                            [
                                                              'function', 'accessor', 'method', 'property',
                                                              'parameterProperty'
                                                            ],
                                                 'format' : ['camelCase'],
                                               },
                                               {
                                                 // Allow PascalCase as well as it is used for dynamic module imports.
                                                 'selector' : 'variable',
                                                 'format' : ['camelCase', 'PascalCase', 'UPPER_CASE'],
                                               },
                                               {
                                                 'selector' : 'classProperty',
                                                 'modifiers' : ['static', 'readonly'],
                                                 'format' : ['UPPER_CASE'],
                                               },
                                               {
                                                 'selector' : 'enumMember',
                                                 'format' : ['PascalCase', 'UPPER_CASE'],
                                               },
                                               {
                                                 'selector' : ['typeLike'],
                                                 'format' : ['PascalCase'],
                                               },
                                               {
                                                 // Also allow UPPER_CASE so argument function to evaluate can take constants as arguments without renaming.
                                                 'selector' : 'parameter',
                                                 'format' : ['camelCase', 'UPPER_CASE'],
                                                 'leadingUnderscore' : 'allow',
                                               },
                                               {
                                                 // Object literals may be constructed as arguments to external libraries which follow different styles.
                                                 'selector' : ['objectLiteralMethod', 'objectLiteralProperty'],
                                                 'modifiers' : ['public'],
                                                 'format' : null,
                                               },
                                             ],
      '@typescript-eslint/no-non-null-assertion' : 'off',
    }
  }]
};
