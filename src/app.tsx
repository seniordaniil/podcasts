import React, { FC } from 'react';
import { useStore } from 'effector-react';
import { $state, goBack, PageProps } from 'features/navigator';
import { ConfigProvider, View, Panel } from '@vkontakte/vkui';
import {
  MainPage,
  CreatePage,
  EditPage,
  PreviewPage,
  PodcastPage,
  SharePage,
} from './pages';

export const App: FC = () => {
  const state = useStore($state);

  if (state.history.length < 1) return null;

  return (
    <ConfigProvider
      isWebView={process.env.NODE_ENV !== 'production' || undefined}
    >
      <View
        activePanel={state.current?.id}
        history={state.history}
        onSwipeBack={goBack}
      >
        <Page Component={MainPage} id={'main'} />
        <Page Component={CreatePage} id={'create'} />
        <Page Component={EditPage} id={'edit'} />
        <Page Component={PreviewPage} id={'preview'} />
        <Page Component={PodcastPage} id={'podcast'} />
        <Page Component={SharePage} id={'share'} />
      </View>
    </ConfigProvider>
  );
};

interface PagePanelProps extends PageProps {
  Component: FC<PageProps>;
}

const Page: FC<PagePanelProps> = ({ id, Component }) => {
  return (
    <Panel id={id}>
      <Component id={id} />
    </Panel>
  );
};
