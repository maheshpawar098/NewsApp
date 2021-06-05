module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          container: './src/container',
          components: './src/components',
          routes: './src/routes',
          utils: './src/utils',
          service: './src/service',
          hooks: './src/hooks',
          context: './src/context'
        },
      },
    ],
  ],
};
