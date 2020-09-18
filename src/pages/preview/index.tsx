import React, { FC, useCallback, useState } from 'react';
import { useStore } from 'effector-react';
import { instance } from 'api';
import { $currentUser } from 'features/vk-data';
import { $podcast, PodcastWidget } from 'features/podcast';
import { useNavigator, PageProps } from 'features/navigator';
import {
  PanelHeader,
  Separator,
  Button,
  PanelHeaderBack,
  FixedLayout,
  Div,
} from '@vkontakte/vkui';
import Content from 'ui/atoms/content';
import Bottom from 'ui/atoms/bottom';

const PreviewPage: FC<PageProps> = ({ id }) => {
  const { navigate, goBack } = useNavigator(id);
  const podcast = useStore($podcast);
  const user = useStore($currentUser);
  const [loading, setLoading] = useState(false);

  const send = useCallback(() => {
    setLoading(true);
    const formData = new FormData();
    formData.append('picture', podcast.picture.file);
    formData.append('audio', podcast.audio.file);
    formData.append('name', podcast.name);
    formData.append('author', user.fullName);
    formData.append('author_id', user.id.toString());
    formData.append('description', podcast.description);
    formData.append('timecodes', JSON.stringify(podcast.timecodes));

    instance
      .post('/podcasts', formData, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      .then(({ data }) => {
        navigate('share', { podcastId: data.id });
      })
      .catch(console.error)
      .finally(() => {
        setLoading(false);
      });
  }, [podcast, user, navigate, setLoading]);

  return (
    <>
      <PanelHeader left={<PanelHeaderBack onClick={goBack} />}>
        Новый подкаст
      </PanelHeader>
      <Content bottom={'70px'}>
        <PodcastWidget
          author={user.fullName}
          authorId={user.id}
          name={podcast.name}
          description={podcast.description}
          picture={podcast.picture.url}
          audio={podcast.audio.url}
          timecodes={podcast.timecodes}
        />
      </Content>
      <FixedLayout filled vertical={'bottom'}>
        <Separator wide />
        <Bottom>
          <Div>
            <Button size={'xl'} stretched onClick={send} disabled={loading}>
              Опубликовать подкаст
            </Button>
          </Div>
        </Bottom>
      </FixedLayout>
    </>
  );
};

export default PreviewPage;
