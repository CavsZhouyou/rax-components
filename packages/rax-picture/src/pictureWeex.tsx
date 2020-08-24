import {
  createElement,
  forwardRef,
  ForwardRefExoticComponent
} from 'rax';
import Image from 'rax-image';
import { PictureProps } from './types';
import formatStyle from './formatStyle';

const Picture: ForwardRefExoticComponent<PictureProps> = forwardRef(
  (props, ref) => {
    let {
      children,
      style = {},
      source,
      resizeMode,
      width,
      height,
      defaultHeight,
      ...rest
    } = props;

    const formatedStyle = formatStyle(style);
    let styleWidth :string | number = formatedStyle.width; // style width of picture
    let styleHeight :string | number = formatedStyle.height; // style width of picture

    // according to the original height and width of the picture
    if (!styleHeight && styleWidth && width && height) {
      const pScaling =
        width /
        (typeof styleWidth === 'string'
          ? parseInt(styleWidth, 10)
          : styleWidth);
      styleHeight = parseInt(height / pScaling + '', 10);
    }

    if (!styleHeight) {
      styleHeight = defaultHeight;

      if (!resizeMode) {
        // ensure that the picture can be displayed
        resizeMode = 'contain';
      }
    }

    let newStyle = Object.assign(
      {
        height: styleHeight
      },
      style
    );

    if (resizeMode) {
      newStyle.resizeMode = resizeMode;
    }

    return (
      <Image {...rest} ref={ref} source={source} style={newStyle}>
        {children}
      </Image>
    );
  }
);
Picture.displayName = 'Picture';

export default Picture;
