# use-remote-storage

React hook wrapping the [remote-storage](https://remote.storage/) library.

## Installation

This library is published in the NPM registry and can be installed using any compatible package manager.

```sh
npm install use-remote-storage --save

# For Yarn, use the command below.
yarn add use-remote-storage
```

## Use

### Provide the `remote-storage` configuration

```tsx
import { RemoteStorageProvider } from 'use-remote-storage';

<RemoteStorageProvider userId={...} instanceId="my-awesome-app">
  ...
</RemoteStorageProvider>
```

### Read/Write Values

```tsx
import { useRemoteStorage } from 'use-remote-storage';

// within any functional component
const { status, value, setValue, refresh } = useRemoteStorage('my-key');
```

## Documentation

[Documentation generated from source files by Typedoc](./docs/README.md).

## License

Released under [MIT License](./LICENSE).
