// @flow

import type { hexValue } from '@erebos/hex'

export type DirectoryData = {
  [path: string]: { data: string | Buffer, contentType: string, size?: number },
}

export type FileEntry = {
  data: string | Buffer,
  path: string,
  size?: number,
}

export type ListEntry = {
  hash: string,
  path: string,
  contentType: string,
  size: number,
  mod_time: string,
}

export type ListResult = {
  common_prefixes?: Array<string>,
  entries?: Array<ListEntry>,
}

export type FeedMetadata = {
  feed: {
    topic: hexValue,
    user: hexValue,
  },
  epoch: {
    time: number,
    level: number,
  },
  protocolVersion: number,
}

export type BzzMode = 'default' | 'immutable' | 'raw'

export type FetchOptions = {
  headers?: Object,
  timeout?: ?number,
}

export type PollMode = 'feedResponse' | 'contentHash' | 'contentResponse'

export type PollOptions = FetchOptions & {
  changedOnly?: boolean,
  errorWhenNotFound?: boolean,
  immediate?: boolean,
  interval: number,
  mode?: PollMode,
}

export type FileOptions = {
  contentType?: string,
  path?: string,
}

export type DownloadOptions = FetchOptions &
  FileOptions & {
    mode?: BzzMode,
  }

export type UploadOptions = FetchOptions &
  FileOptions & {
    defaultPath?: string,
    encrypt?: boolean,
    manifestHash?: hexValue | string,
  }

export type FeedParams = {
  level?: number,
  name?: string,
  signature?: string,
  time?: number,
  topic?: string,
}

export type SignFeedDigestFunc = (
  digest: Array<number>,
  params?: any,
) => Promise<Array<number>>

export type BzzConfig = {
  signFeedDigest?: SignFeedDigestFunc,
  timeout?: number,
  url: string,
}