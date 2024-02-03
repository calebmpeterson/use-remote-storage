import { type AsyncStatus, useAsync } from '@react-hook/async';
import React, {
  type FC,
  type PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { RemoteStorage } from 'remote-storage';

interface RemoteStorageContextValue {
  remoteStorage: RemoteStorage;
}

interface RemoteStorageProviderProps extends PropsWithChildren {
  userId?: string;
  instanceId?: string;
  serverAddress?: string;
}

type RefreshCallback = () => void;

type HookResult<T> = {
  status: AsyncStatus;
  error?: unknown;
  value: T | undefined;
  setValue: (value: T) => Promise<void>;
  refresh: RefreshCallback;
};

const RemoteStorageContext = createContext<RemoteStorageContextValue | null>(
  null,
);

export const useRemoteStorage = <T,>(key: string): HookResult<T> => {
  const keyRef = useRef<string>(key);

  const context = useContext(RemoteStorageContext);

  if (!context) {
    throw new Error(
      `useRemoteStorage() must be called within a RemoteStorageProvider context`,
    );
  }

  const { remoteStorage } = context;

  const [{ status, error, value }, load] = useAsync<T>(() => {
    return remoteStorage.getItem(keyRef.current);
  });

  useEffect(() => {
    if (status === 'idle') {
      load();
    }
  }, [status, load, key]);

  const setValue = useCallback(
    async (update: T) => {
      await remoteStorage.setItem(keyRef.current, update);
    },
    [remoteStorage],
  );

  return { status, error, value, setValue, refresh: load };
};

export const RemoteStorageProvider: FC<RemoteStorageProviderProps> = ({
  userId,
  instanceId,
  serverAddress,
  children,
}) => {
  const contextValue = useMemo(() => {
    const remoteStorage = new RemoteStorage({
      userId,
      instanceId,
      serverAddress,
    });

    if (process.env['NODE_ENV'] === 'development') {
      // @ts-expect-error
      global.remoteStorage = remoteStorage;
    }

    return { remoteStorage };
  }, [userId, instanceId, serverAddress]);

  return (
    <RemoteStorageContext.Provider value={contextValue}>
      {children}
    </RemoteStorageContext.Provider>
  );
};
