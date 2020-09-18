import { navigate } from 'features/navigator';
import { fetchCurrentUser } from 'features/vk-data';
import bridge from '@vkontakte/vk-bridge';

/*bridge.subscribe(({ detail }) => {
  if (detail.type === 'VKWebAppUpdateConfig') {
    const schemeAttribute = document.createAttribute('scheme');
    schemeAttribute.value = detail.data.scheme || 'bright_light';

    document.body.attributes.setNamedItem(schemeAttribute);
  }
});*/

const bootstrap = () => {
  navigate('main', {}, true);

  const podcastId = parseInt(window.location.hash.slice(1));

  if (podcastId) {
    navigate('podcast', {
      podcastId,
    });
  }

  fetchCurrentUser();

  bridge.send('VKWebAppInit').catch(console.error);
};

bootstrap();
