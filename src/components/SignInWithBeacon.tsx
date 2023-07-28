import React, { useState } from 'react';
import { useMessage, useWallet } from '@wallet01/react';
import { BeaconConnector } from '@wallet01/tezos';
import { verifySignature } from '@taquito/utils';

export const formatMessage = (input: string): string => {
  const bytes = Buffer.from(input, 'utf8').toString('hex');
  const bytesLength = (bytes.length / 2).toString(16);
  const addPadding = `00000000${bytesLength}`;
  const paddedBytesLength = addPadding.slice(addPadding.length - 8);
  const payloadBytes = '05' + '01' + paddedBytesLength + bytes;

  return payloadBytes;
};

const message = 'Hello World';

const SignInWithBeacon = () => {
  const [pubKey, setPubKey] = useState<string | undefined>();
  const [signature, setSignature] = useState<string>('');
  const [verified, setVerified] = useState<boolean>(false);
  const { activeConnector, disconnect, address } = useWallet();
  const { hash, signMessageAsync } = useMessage();
  const signIn = async () => {
    const publicKey = (
      await (
        activeConnector as BeaconConnector
      ).provider?.client.requestPermissions()
    )?.publicKey;

    setPubKey(publicKey);

    const signature = await signMessageAsync({
      message,
    });
    setSignature(signature);
    console.log({
      message,
      signature,
      publicKey,
      address,
    });
    if (!publicKey) {
      console.error('No public key found');
      return;
    }

    const verified = await verifySignature(
      formatMessage(message),
      publicKey,
      signature
    );
    setVerified(verified);
    console.log('verified', verified);
  };
  return (
    <div className="flex flex-col gap-2 justify-center items-center ">
      <span className="text-white">Message: Hello World</span>

      <button
        className="p-3 bg-blue-400 text-lg rounded-lg font-semibold"
        onClick={signIn}
      >
        Sign In
      </button>
      {hash?.length ? (
        <div className="flex flex-col items-center gap-2 font-medium text-white">
          <span>Address: {address}</span>
          <span>Public Key: {pubKey}</span>
          <span>Hash: {hash}</span>
          <span>Signature: {signature}</span>
          <span
            className={`p-3 rounded-lg 
            ${verified ? 'bg-green-500 text-black' : 'bg-red-500 text-white'}`}
          >
            Verified: {verified ? 'true' : 'false'}
          </span>
        </div>
      ) : null}
      <button
        className="p-3 bg-blue-400 text-lg rounded-lg font-semibold"
        onClick={() => disconnect()}
      >
        Disconnect
      </button>
    </div>
  );
};

export default SignInWithBeacon;
