import {FC, useCallback, useEffect, useState} from 'react';
import {ImageStyled} from './Image-styled';

export interface ImagePreviewClasses {
  root?: string;
  placeholder?: string;
  image?: string;
  backfaceImage?: string;
  loader?: string;
}

export interface ImagePreviewProps {
  className?: string;
  classes?: ImagePreviewClasses;
  imageSrc?: string | null;
  showLoader?: boolean;
  showPlaceholder?: boolean;
  showBackfaceImage?: boolean;
}

export const ImagePreview: FC<ImagePreviewProps & { children?: any }> = ({
                                                                           className,
                                                                           classes,
                                                                           imageSrc,
                                                                           showLoader = true,
                                                                           showPlaceholder = true,
                                                                           showBackfaceImage,
                                                                           children
                                                                         }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleImgLoaded = useCallback(() => {
    setLoaded(true);
  }, []);

  const handleImgFailed = useCallback(() => {
    setError(true);
  }, []);

  useEffect(() => {
    const img = new Image();

    if (imageSrc) {
      img.src = imageSrc;
      img.addEventListener('load', handleImgLoaded);
      img.addEventListener('error', handleImgFailed);
    }

    return () => {
      img.removeEventListener('load', handleImgLoaded);
      img.removeEventListener('error', handleImgFailed);
    };
  }, [imageSrc, handleImgLoaded, handleImgFailed]);

  const imgFailed = !imageSrc || error;

  return (
    <div>
      {showPlaceholder && imgFailed && <ImageStyled.ImagePlaceholder/>}
      {!imgFailed && (
        <div>
          <ImageStyled.Image src={imageSrc}/>
        </div>
      )}
    </div>
  );
};
