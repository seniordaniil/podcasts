import React, { FC, useCallback, useMemo } from 'react';
import { useStore } from 'effector-react';
import {
  $podcast,
  setPicture,
  setName,
  setDescription,
  toggleCheckBox,
  setAudio,
  durationFormat,
} from 'features/podcast';
import { useNavigator, PageProps } from 'features/navigator';
import {
  PanelHeader,
  Placeholder,
  Button,
  PanelHeaderBack,
  Cell,
  File,
  Input,
  Textarea,
  Group,
  FormLayout,
  Avatar,
  Checkbox,
  FixedLayout,
  Div,
} from '@vkontakte/vkui';
import styled from 'styled-components';
import Content from 'ui/atoms/content';
import Bottom from 'ui/atoms/bottom';
import SimpleFooter from 'ui/atoms/simple-footer';

import Icon56GalleryOutline from '@vkontakte/icons/dist/56/gallery_outline';
import Icon28PodcastOutline from '@vkontakte/icons/dist/28/podcast_outline';

const PodcastCell = styled(Cell)<{ filled?: boolean }>`
  & .Cell__main {
    padding-right: 0px;
  }
  & .FormLayout__row-top {
    padding-left: 0px;
    padding-right: 0px;
  }
  & .FormLayout__row {
    padding: 0px;
    & .FormField {
      margin: 0px;
    }
  }
  & .Avatar__children {
    opacity: ${({ filled }) => (filled ? '0' : 'inherit')};
  }
`;

const SimpleGroup = styled(Group)`
  & > :not(.Header):first-child {
    margin-top: 0px;
  }
`;

const AudioInput = styled.label`
  & .Avatar__shadow {
    box-shadow: none;
  }
  & .Cell__indicator {
    font-size: 13px;
  }
  & input[type='file'] {
    display: none;
  }
  & .Cell__main {
    flex: 1;
  }
`;

const CreatePage: FC<PageProps> = ({ id }) => {
  const { navigate, goBack } = useNavigator(id);
  const podcast = useStore($podcast);

  const toggle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const prop: any = e.currentTarget.dataset.prop;
    toggleCheckBox(prop);
  }, []);

  const onAudioChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.currentTarget.files[0];
      const url = URL.createObjectURL(file);

      const audio = new Audio(url);

      audio.onloadedmetadata = () => {
        setAudio({
          file,
          url,
          duration: audio.duration,
          name: file.name,
        });
      };
    },
    [],
  );

  const duration = useMemo(() => {
    if (podcast.audio) return durationFormat(podcast.audio.duration);
  }, [podcast.audio]);

  return (
    <>
      <PanelHeader left={<PanelHeaderBack onClick={goBack} />}>
        Новый подкаст
      </PanelHeader>
      <Content bottom={'70px'}>
        <Group>
          <PodcastCell
            filled={Boolean(podcast.picture)}
            before={
              <Avatar mode={'app'} size={72} src={podcast.picture?.url}>
                <File
                  mode={'tertiary'}
                  accept={'.jpg, .jpeg'}
                  onChange={(e) => {
                    const file = e.currentTarget.files[0];
                    setPicture(file);
                  }}
                >
                  <Icon56GalleryOutline width={32} height={32} />
                </File>
              </Avatar>
            }
          >
            <FormLayout>
              <Input
                top={'Название'}
                placeholder={'Введите название подкаста'}
                maxLength={32}
                value={podcast.name}
                onChange={(e) => {
                  setName(e.currentTarget.value);
                }}
              />
            </FormLayout>
          </PodcastCell>
          <FormLayout>
            <Textarea
              top={'Описание подкаста'}
              value={podcast.description}
              onChange={(e) => {
                setDescription(e.currentTarget.value);
              }}
            />
          </FormLayout>
          {podcast.audio ? (
            <Div style={{ paddingLeft: 0, paddingRight: 0, paddingBottom: 0 }}>
              <AudioInput>
                <input type={'file'} accept={'.mp3'} onChange={onAudioChange} />
                <Cell
                  before={
                    <Avatar mode={'app'} size={48}>
                      <Icon28PodcastOutline />
                    </Avatar>
                  }
                  indicator={duration}
                >
                  {podcast.audio.name}
                </Cell>
              </AudioInput>
              <SimpleFooter top={'10px'}>
                Вы можете добавить таймкоды и скорректировать подкаст в режиме
                редактирования
              </SimpleFooter>
              <Div style={{ paddingTop: 0 }}>
                <Button
                  mode={'outline'}
                  stretched
                  size={'xl'}
                  onClick={() => {
                    navigate('edit');
                  }}
                >
                  Редактировать аудиозапись
                </Button>
              </Div>
            </Div>
          ) : (
            <Placeholder
              header={'Загрузите Ваш подкаст'}
              action={
                <File
                  mode={'outline'}
                  controlSize={'l'}
                  accept={'.mp3'}
                  onChange={onAudioChange}
                >
                  Загрузить файл
                </File>
              }
            >
              <p>
                Выберите готовый аудиофайл из вашего телефона и добавьте его
              </p>
            </Placeholder>
          )}
        </Group>
        <SimpleGroup>
          <Checkbox
            checked={podcast.eContent}
            data-prop={'eContent'}
            onChange={toggle}
          >
            Ненормативный контент
          </Checkbox>
          <Checkbox
            checked={podcast.exclude}
            data-prop={'exclude'}
            onChange={toggle}
          >
            Исключить эпизод из экспорта
          </Checkbox>
          <Checkbox
            checked={podcast.trailer}
            data-prop={'trailer'}
            onChange={toggle}
          >
            Трейлер подкаста
          </Checkbox>
          <Cell description={'Всем пользователям'} expandable>
            Кому доступен данный подкаст
          </Cell>
          <SimpleFooter>
            При публикации записи с эпизодом, он становится доступным для всех
            пользователей
          </SimpleFooter>
        </SimpleGroup>
      </Content>
      <FixedLayout vertical={'bottom'} filled>
        <Bottom>
          <Div>
            <Button
              size={'xl'}
              stretched
              disabled={
                !podcast.audio ||
                !podcast.picture ||
                !podcast.name ||
                !podcast.description
              }
              onClick={() => {
                navigate('preview');
              }}
            >
              Далее
            </Button>
          </Div>
        </Bottom>
      </FixedLayout>
    </>
  );
};

export default CreatePage;
