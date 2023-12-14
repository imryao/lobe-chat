import { Icon, RenderErrorMessage } from '@lobehub/ui';
import { Segmented } from 'antd';
import { KeySquare } from 'lucide-react';
import { memo, useState } from 'react';
import { Flexbox } from 'react-layout-kit';

import APIKeyForm from './ApiKeyForm';
import { ErrorActionContainer } from './style';

enum Tab {
  Api = 'api',
}

const InvalidAccess: RenderErrorMessage['Render'] = memo(({ id }) => {
  const [mode, setMode] = useState<Tab>(Tab.Api);

  return (
    <ErrorActionContainer>
      <Segmented
        block
        onChange={(value) => setMode(value as Tab)}
        options={[{ icon: <Icon icon={KeySquare} />, label: 'ETOChat API Key', value: Tab.Api }]}
        style={{ width: '100%' }}
        value={mode}
      />
      <Flexbox gap={24}>{mode === Tab.Api && <APIKeyForm id={id} />}</Flexbox>
    </ErrorActionContainer>
  );
});

export default InvalidAccess;
