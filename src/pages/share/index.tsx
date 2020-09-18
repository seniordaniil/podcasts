import React, { FC } from 'react';
import { useNavigator, PageProps } from 'features/navigator';
import { PanelHeader, Placeholder, Button } from '@vkontakte/vkui';
import bridge from '@vkontakte/vk-bridge';

import Icon56CheckCircleOutline from '@vkontakte/icons/dist/56/check_circle_outline';

const SharePage: FC<PageProps> = ({ id }) => {
  const { params } = useNavigator<any>(id);

  return (
    <>
      <PanelHeader>Подкасты</PanelHeader>
      <Placeholder
        icon={<Icon56CheckCircleOutline />}
        stretched
        header={'Подкаст добавлен'}
        action={
          <Button
            onClick={() => {
              bridge
                .send('VKWebAppShare', {
                  link: `https://vk.com/app${process.env.REACT_APP_ID}#${params.podcastId}`,
                })
                .catch(console.error);
            }}
            size={'l'}
          >
            Поделиться подкастом
          </Button>
        }
      >
        Раскажите своим подписчикам о новом подкасте, чтобы получить больше
        слушателей.
      </Placeholder>
    </>
  );
};

export default SharePage;
