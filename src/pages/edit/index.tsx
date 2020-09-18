import React, { FC, useCallback, useRef, useEffect, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline';
import { useStore } from 'effector-react';
import {
  $podcast,
  editTimecodes,
  durationFormat,
  createId,
} from 'features/podcast';
import { useNavigator, PageProps } from 'features/navigator';
import {
  PanelHeader,
  Div,
  PanelHeaderBack,
  Button,
  Group,
  Header,
  CellButton,
  Cell,
  Input,
} from '@vkontakte/vkui';
import produce from 'immer';
import { Player, Controls, Scissors, BarChart1, BarChart2 } from './components';
import SimpleFooter from 'ui/atoms/simple-footer';

import Icon28Play from '@vkontakte/icons/dist/28/play';
import Icon28Pause from '@vkontakte/icons/dist/28/pause';
import Icon24ArrowUturnLeftOutline from '@vkontakte/icons/dist/24/arrow_uturn_left_outline';
import Icon24Music from '@vkontakte/icons/dist/24/music';
import Icon28AddCircleOutline from '@vkontakte/icons/dist/28/add_circle_outline';

const EditPage: FC<PageProps> = ({ id }) => {
  const { goBack } = useNavigator(id);
  const podcast = useStore($podcast);
  const waveformRef = useRef<HTMLDivElement>(null);
  const waveTimelineRef = useRef<HTMLDivElement>(null);
  const waveSurfer = useRef<WaveSurfer>(null);

  useEffect(() => {
    waveSurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: '#3F8AE080',
      cursorColor: '#FF3347',
      progressColor: '#3F8AE0',
      barWidth: 2,
      barRadius: 2,
      barGap: 5.5,
      barHeight: 0.5,
      height: 96,
      responsive: true,
      backgroundColor: '#F2F3F5',
      partialRender: true,
      plugins: [
        TimelinePlugin.create({
          container: waveTimelineRef.current,
          labelPadding: 10,
          responsive: true,
          fontSize: 9,
          backgroundColor: '#F2F3F5',
          primaryColor: '#99A2AD',
          primaryFontColor: '#99A2AD',
          secondaryColor: '#99A2AD',
          secondaryFontColor: '#99A2AD',
          notchPercentHeight: 50,
        }),
      ],
    });
    waveSurfer.current.loadBlob(podcast.audio.file);

    return () => waveSurfer.current.destroy();
  }, [podcast.audio, waveformRef, waveSurfer, waveTimelineRef]);

  const [playing, setPlaying] = useState(false);

  const handlePlayPause = useCallback(() => {
    if (waveSurfer.current?.isReady) {
      if (playing) waveSurfer.current.pause();
      else waveSurfer.current.play();
      setPlaying(!playing);
    }
  }, [waveSurfer, setPlaying, playing]);

  const addTimeCode = useCallback(() => {
    editTimecodes((timecodes) => [
      ...timecodes,
      {
        id: createId(),
        time: waveSurfer.current.getCurrentTime(),
        desc: '',
      },
    ]);
  }, [waveSurfer]);

  const editTimeCode = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.currentTarget.dataset.id;
    const value = e.currentTarget.value;
    editTimecodes((timecodes) =>
      produce(timecodes, (draft) => {
        const timeCode = draft.find((t) => t.id === id);
        if (timeCode) timeCode.desc = value;
      }),
    );
  }, []);

  const removeTimeCode = useCallback(
    (e: React.MouseEvent<Element, MouseEvent>, rootEl: HTMLElement) => {
      const id = rootEl.dataset.id;
      editTimecodes((timecodes) =>
        produce(timecodes, (draft) => {
          const index = draft.findIndex((t) => t.id === id);
          if (index >= 0) draft.splice(index, 1);
        }),
      );
    },
    [],
  );

  return (
    <>
      <PanelHeader left={<PanelHeaderBack onClick={goBack} />}>
        Редактирование
      </PanelHeader>
      <Div>
        <Player size={'l'} mode={'outline'}>
          <div ref={waveTimelineRef}></div>
          <div ref={waveformRef}></div>
          <Controls>
            <div>
              <Button onClick={handlePlayPause}>
                {playing ? <Icon28Pause /> : <Icon28Play />}
              </Button>
            </div>
            <div>
              <Button mode={'secondary'} disabled>
                <div className={'Icon'}>
                  <Scissors />
                </div>
              </Button>
              <Button mode={'secondary'} disabled>
                <Icon24ArrowUturnLeftOutline />
              </Button>
            </div>
            <div>
              <Button mode={'secondary'} disabled>
                <Icon24Music />
              </Button>
              <Button mode={'secondary'} disabled>
                <div className={'Icon'}>
                  <BarChart1 />
                </div>
              </Button>
              <Button mode={'secondary'} disabled>
                <div className={'Icon'}>
                  <BarChart2 />
                </div>
              </Button>
            </div>
          </Controls>
        </Player>
      </Div>
      <Group header={<Header mode={'secondary'}>Таймкоды</Header>}>
        {podcast.timecodes.map((timeCode) => (
          <Cell
            key={timeCode.id}
            data-id={timeCode.id}
            onRemove={removeTimeCode}
            removable
            indicator={
              <Input
                style={{ width: 76 }}
                value={durationFormat(timeCode.time)}
                disabled
              />
            }
          >
            <Input
              placeholder={'Описание'}
              data-id={timeCode.id}
              value={timeCode.desc}
              maxLength={32}
              onChange={editTimeCode}
            />
          </Cell>
        ))}
        <CellButton before={<Icon28AddCircleOutline />} onClick={addTimeCode}>
          Добавить таймкод
        </CellButton>
        <SimpleFooter top={'4px'}>
          Отметки времени с названием темы. Позволяют слушателям легче
          путешествовать по подкасту.
        </SimpleFooter>
      </Group>
    </>
  );
};

export default EditPage;
