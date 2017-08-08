import {
  Image,
} from 'react-native';
import {
  Asset,
  Font,
} from 'expo';

export default function cacheAssets({images = [], fonts = []}) {
  return Promise.all([
    ...cacheImages(images),
    ...cacheFonts(fonts),
  ]);
}

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === "object") {
      return Image.prefetch(image.uri);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}