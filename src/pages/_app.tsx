import '@/styles/globals.css';
import { Wallet01 } from '@wallet01/react';
import type { AppProps } from 'next/app';
import { BeaconConnector } from '@wallet01/tezos';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Wallet01
      autoConnect={false}
      connectors={() => [
        new BeaconConnector({
          projectName: 'Wallet01',
        }),
      ]}
    >
      <Component {...pageProps} />
    </Wallet01>
  );
}
