import React, { FC } from 'react';
import { resetPodcast } from 'features/podcast';
import { useNavigator, PageProps } from 'features/navigator';
import { PanelHeader, Placeholder, Button } from '@vkontakte/vkui';

import Icon56AddCircleOutline from '@vkontakte/icons/dist/56/add_circle_outline';

const MainPage: FC<PageProps> = ({ id }) => {
  const { navigate } = useNavigator(id);

  return (
    <>
      <PanelHeader>Подкасты</PanelHeader>
      <Placeholder
        icon={<Icon56AddCircleOutline />}
        stretched
        header={'Добавьте первый подкаст'}
        action={
          <Button
            onClick={() => {
              resetPodcast();
              navigate('create', {});
            }}
            size={'l'}
          >
            Добавить подкаст
          </Button>
        }
      >
        Добавляйте, редактируйте и делитесь подкастами вашего сообщества.
      </Placeholder>
    </>
  );
};

export default MainPage;
