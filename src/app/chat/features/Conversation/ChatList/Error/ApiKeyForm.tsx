import { Button, Input } from 'antd';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Center, Flexbox } from 'react-layout-kit';

import { useChatStore } from '@/store/chat';
import { settingsSelectors, useGlobalStore } from '@/store/global';

import { FormAction } from './style';

const APIKeyForm = memo<{ id: string }>(({ id }) => {
  const { t } = useTranslation('error');
  const [apiKey, setConfig] = useGlobalStore((s) => [
    settingsSelectors.openAIAPI(s),
    s.setOpenAIConfig,
  ]);

  const [resend, deleteMessage] = useChatStore((s) => [s.resendMessage, s.deleteMessage]);

  return (
    <Center gap={16} style={{ maxWidth: 300 }}>
      <FormAction
        avatar={'🔑'}
        description={t('unlock.apikey.description')}
        title={t('unlock.apikey.title')}
      >
        <Input.Password
          onChange={(e) => {
            setConfig({ OPENAI_API_KEY: e.target.value });
          }}
          placeholder={'sk-*****************************************'}
          type={'block'}
          value={apiKey}
        />
      </FormAction>
      <Flexbox gap={12} width={'100%'}>
        <Button
          block
          onClick={() => {
            resend(id);
            deleteMessage(id);
          }}
          style={{ marginTop: 8 }}
          type={'primary'}
        >
          {t('unlock.confirm')}
        </Button>
        <Button
          onClick={() => {
            deleteMessage(id);
          }}
        >
          {t('unlock.closeMessage')}
        </Button>
      </Flexbox>
    </Center>
  );
});

export default APIKeyForm;
