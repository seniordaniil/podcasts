import React, { FC, useState, useEffect } from 'react';
import { instance } from 'api';
import { PodcastData, PodcastWidget } from 'features/podcast';
import { useNavigator, PageProps } from 'features/navigator';
import { PanelHeader } from '@vkontakte/vkui';
import Content from 'ui/atoms/content';

const PodcastPage: FC<PageProps> = ({ id }) => {
  const { params } = useNavigator<any>(id);
  const [podcast, setPodcast] = useState<PodcastData>(null);

  useEffect(() => {
    instance.get(`/podcasts/${params.podcastId}`).then(({ data }) => {
      setPodcast({
        name: data.name,
        description: data.description,
        audio: process.env.REACT_APP_BASE_URL + data.audio.url,
        picture: process.env.REACT_APP_BASE_URL + data.picture.url,
        timecodes: JSON.parse(data.timecodes),
        author: data.author,
        authorId: data.author_id,
      });
    });
  }, [setPodcast, params]);

  return (
    <>
      <PanelHeader>Подкаст</PanelHeader>
      {podcast && (
        <Content bottom={'70px'}>
          <PodcastWidget
            author={podcast.author}
            authorId={podcast.authorId}
            name={podcast.name}
            description={podcast.description}
            picture={podcast.picture}
            audio={podcast.audio}
            timecodes={podcast.timecodes}
          />
        </Content>
      )}
    </>
  );
};

export default PodcastPage;
