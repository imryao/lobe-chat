import { Form, type ItemGroup } from '@lobehub/ui';
import { Form as AntForm, Input } from 'antd';
import { debounce } from 'lodash-es';
import { Webhook } from 'lucide-react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { FORM_STYLE } from '@/const/layoutTokens';
import { settingsSelectors, useEffectAfterGlobalHydrated, useGlobalStore } from '@/store/global';

import Checker from './Checker';

const configKey = 'languageModel';

const LLM = memo(() => {
  const { t } = useTranslation('setting');
  const [form] = AntForm.useForm();
  const [setSettings] = useGlobalStore((s) => [s.setSettings]);

  useEffectAfterGlobalHydrated((store) => {
    const settings = settingsSelectors.currentSettings(store.getState());

    form.setFieldsValue(settings);
  }, []);

  const useAzure = useGlobalStore((s) => s.settings.languageModel.openAI.useAzure);

  const openAI: ItemGroup = {
    children: [
      {
        children: (
          <Input.Password
            placeholder={
              useAzure ? t('llm.AzureOpenAI.token.placeholder') : t('llm.OpenAI.token.placeholder')
            }
          />
        ),
        desc: useAzure ? t('llm.AzureOpenAI.token.desc') : t('llm.OpenAI.token.desc'),
        label: useAzure ? t('llm.AzureOpenAI.token.title') : t('llm.OpenAI.token.title'),
        name: [configKey, 'openAI', 'OPENAI_API_KEY'],
      },
      {
        children: <Checker checkModel={!useAzure} />,
        desc: t('llm.OpenAI.check.desc'),
        label: t('llm.OpenAI.check.title'),
        minWidth: undefined,
      },
      // {
      //   children: useAzure ? <Flexbox>{t('llm.OpenAI.models.notSupport')}</Flexbox> : <ModelList />,
      //   desc: useAzure ? t('llm.OpenAI.models.notSupportTip') : t('llm.OpenAI.models.desc'),
      //   label: t('llm.OpenAI.models.title'),
      //   name: [configKey, 'openAI', 'models'],
      // },
    ],
    icon: Webhook,
    title: t('llm.OpenAI.title'),
  };

  return (
    <Form
      form={form}
      items={[openAI]}
      onValuesChange={debounce(setSettings, 100)}
      {...FORM_STYLE}
    />
  );
});

export default LLM;
