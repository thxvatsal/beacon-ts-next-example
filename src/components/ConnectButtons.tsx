import { useClient, useConnect } from '@wallet01/react';
import React from 'react';

const ConnectButtons = () => {
  const { connectors } = useClient();
  const { connect } = useConnect();

  return (
    <div>
      {connectors.map((conn) => (
        <button
          className="bg-blue-400 p-3 rounded-lg font-semibold text-lg"
          key={conn.name}
          onClick={() => connect({ connector: conn })}
        >
          {conn.name}
        </button>
      ))}
    </div>
  );
};

export default ConnectButtons;
