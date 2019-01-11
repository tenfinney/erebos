// @flow

import Bzz from '@erebos/api-bzz-node'
import { pubKeyToAddress } from '@erebos/keccak256'
import { createKeyPair, sign } from '@erebos/secp256k1'

import { Feedlinks } from '.'

const sleep = (time: number) => new Promise(r => setTimeout(r, time))

async function run() {
  const keyPair = createKeyPair(
    'feedfeedfeedfeedfeedfeedfeedfeedfeedfeedfeedfeedfeedfeedfeedfeed',
    'hex',
  )
  const address = pubKeyToAddress(keyPair.getPublic().encode())
  const bzz = new Bzz({
    signFeedDigest: async digest => sign(digest, keyPair.getPrivate()),
    url: 'http://localhost:8500',
  })
  const feedLinks = new Feedlinks(bzz)

  const feedHash =
    '056e402c0e44ea37e7c449ebacb6d1d65700fc66a6806c387eb7a18c029fd7f8'
  // const iterable = feedLinks.createIterable(feedHash)
  // for await (const link of iterable) {
  //   console.log('link', link)
  // }

  const stack = await feedLinks.createStack(
    '056e402c0e44ea37e7c449ebacb6d1d65700fc66a6806c387eb7a18c029fd7f8',
    '522ebf9088f41b3c0bf1eed2dd38d2cc9287cdb75ab47a7a154fce64baba0bea',
  )
  console.log('stack', stack)

  // const feedHash = await bzz.createFeedManifest(address, { name: 'test1' })
  // console.log('feed hash', feedHash)
  // const updater = await feedLinks.createUpdater(feedHash, {
  //   author: address,
  // })
  //
  // // const subscription = bzz
  // //   .pollFeedValue(feedHash, {
  // //     interval: 2000,
  // //     mode: 'content-response',
  // //     whenEmpty: 'ignore',
  // //     contentChangedOnly: true,
  // //   })
  // //   .subscribe(async payload => {
  // //     console.log('feed payload', await payload.json())
  // //   })
  // const liveUpdates = feedLinks.live(feedHash, {
  //   interval: 2000,
  // })
  // console.log('liveUpdates', liveUpdates)
  // const subscription = liveUpdates.subscribe(async payload => {
  //   console.log('feed payload', payload)
  // })
  //
  // const firstUpdate = await updater({
  //   type: 'text/plain',
  //   content: 'hello',
  // })
  //
  // await sleep(3000)
  //
  // const secondUpdate = await updater({
  //   type: 'text/plain',
  //   content: 'world',
  // })
}

run().catch(console.error)