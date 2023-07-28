import { Inter } from 'next/font/google';
import { useWallet } from '@wallet01/react';
import { BeaconConnector } from '@wallet01/tezos';
import ConnectButtons from '@/components/ConnectButtons';
import SignInWithBeacon from '@/components/SignInWithBeacon';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { isConnected } = useWallet();
  return (
    <div className="flex items-center justify-center h-screen bg-slate-800">
      {!isConnected ? <ConnectButtons /> : null}
      {isConnected ? <SignInWithBeacon /> : null}
    </div>
  );
}
