import { type AsyncStatus } from '@react-hook/async';
import { type FC, type PropsWithChildren } from 'react';
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
export declare const useRemoteStorage: <T>(key: string) => HookResult<T>;
export declare const RemoteStorageProvider: FC<RemoteStorageProviderProps>;
export {};
//# sourceMappingURL=useRemoteStorage.d.ts.map