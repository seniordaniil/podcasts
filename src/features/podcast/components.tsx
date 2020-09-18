import React, {
  FC,
  useMemo,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { PodcastData, durationFormat } from './utils';
import {
  Cell,
  Avatar,
  SimpleCell,
  Link,
  Group,
  Title,
  Header,
  Text,
  Div,
} from '@vkontakte/vkui';
import styled from 'styled-components';

import Icon16Play from '@vkontakte/icons/dist/16/play';
import Icon24Pause from '@vkontakte/icons/dist/24/pause';

const PlayControl = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  & > div {
    background-color: rgba(0, 0, 0, 0.35);
    border-radius: 50%;
    height: 32px;
    width: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
  }
`;

const PodcastCell = styled(Cell)`
  & p {
    margin-block-start: 0px;
    margin-block-end: 0px;
  }
  & .Link {
    margin-block-start: 6px;
    margin-block-end: 6px;
    display: block;
  }
`;

const TextBlock = styled(Div)`
  padding-top: 0px;
  padding-bottom: 0px;
`;

const TimeSpan = styled.span`
  color: var(--accent);
`;

export const PodcastWidget: FC<PodcastData> = (podcast) => {
  const audio = useRef<HTMLAudioElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    audio.current = new Audio(podcast.audio);
    audio.current.onloadeddata = () => {
      setLoaded(true);
    };
    audio.current.load();

    return () => {
      try {
        audio.current.pause();
      } catch (e) {}
    };
  }, [podcast.audio, audio, setLoaded]);

  const formattedDuration = useMemo(
    () => (loaded ? durationFormat(audio.current.duration) : ''),
    [loaded, audio],
  );

  const [playing, setPlaying] = useState(false);

  const togglePlay = useCallback(() => {
    if (!loaded) return;
    if (playing) audio.current.pause();
    else audio.current.play();

    setPlaying(!playing);
  }, [setPlaying, playing, loaded, audio]);

  const play = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      const time = parseInt(e.currentTarget.dataset.time);
      audio.current.currentTime = time;
      setPlaying(true);
      audio.current.play();
    },
    [audio, setPlaying],
  );

  return (
    <>
      <Group>
        <PodcastCell
          size={'l'}
          before={
            <Avatar
              mode={'app'}
              size={72}
              src={podcast.picture}
              onClick={togglePlay}
            >
              <PlayControl onClick={togglePlay}>
                <div>
                  {playing ? (
                    <Icon24Pause width={16} height={16} />
                  ) : (
                    <Icon16Play />
                  )}
                </div>
              </PlayControl>
            </Avatar>
          }
          description={
            <>
              <Link
                href={`https://vk.com/id${podcast.authorId}`}
                target={'_blank'}
              >
                {podcast.author}
              </Link>
              <p>Длительность: {formattedDuration}</p>
            </>
          }
        >
          <Title weight={'semibold'} level={'3'}>
            {podcast.name}
          </Title>
        </PodcastCell>
      </Group>
      <Group header={<Header>Описание</Header>}>
        <TextBlock>
          <Text weight={'regular'}>{podcast.description}</Text>
        </TextBlock>
      </Group>
      <Group header={<Header>Содержание</Header>}>
        {podcast.timecodes.map((timeCode) => (
          <SimpleCell
            key={timeCode.id}
            data-time={timeCode.time}
            onClick={play}
          >
            <TimeSpan>{durationFormat(timeCode.time)}</TimeSpan> —{' '}
            {timeCode.desc}
          </SimpleCell>
        ))}
      </Group>
    </>
  );
};
