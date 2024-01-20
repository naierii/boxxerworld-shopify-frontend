import { CanvasText, PatternType, getMaterialUrl } from '@lib/canvas';
import { useCustomiserStore } from '@store/customiser';
import { useEffect, useMemo, useRef, useState } from 'react';
import { CanvasTexture } from 'three';
import type { NavTextSelectProps } from './NavTextSelect';
import { usePortalRef } from '@hooks';
import { createPortal } from 'react-dom';

import styles from './NavText.module.scss';
import { loadImage } from '@lib/img.util';
import NavTextPreviewScene from '@components/three/CustomiserCanvas/NavTextScene';
import { Canvas } from '@react-three/fiber';

// TODO - Pre load the fonts somewhere
async function loadFonts(fontUrl: string) {
  const font = new FontFace('testFont', `url(${fontUrl})`);
  await font.load();
  document.fonts.add(font);
}

function getPatternType({
  hasCrystals,
  isLuxury,
}: {
  hasCrystals: boolean;
  isLuxury: boolean;
}): PatternType {
  if (!hasCrystals && isLuxury) return 'embroidery';
  else if (hasCrystals) return 'crystals';

  return '';
}

const NavTextPreview = ({ editText }: NavTextSelectProps) => {
  const previewImgRef = useRef<HTMLImageElement | null>(null);
  const [fontFamily, setFontFamily] = useState<string | undefined>(editText?.font);
  const [isVisiblePreview, setIsVisiblePreview] = useState(false);

  const hasCrystals: boolean = editText?.crystalPrice ? true : false;
  const isLuxury: boolean = editText?.selectedName?.id === '2' ? true : false;
  const hasPuff: boolean = editText?.puffPrice && !hasCrystals ? true : false; // 3D puff
  const toNormalMap = hasCrystals ? false : true;
  const patternType = getPatternType({ hasCrystals, isLuxury });

  const { updateText } = useCustomiserStore();

  const portalRef = usePortalRef('NavHeaderAfter');

  /**
   * Save image here
   */
  const materialImgMemo = useMemo<Promise<HTMLImageElement>>(() => {
    return loadImage(getMaterialUrl(editText?.material));
  }, [editText?.material]);
  const outlineImgMemo = useMemo<Promise<HTMLImageElement>>(() => {
    return loadImage(getMaterialUrl(editText?.outline));
  }, [editText?.outline]);
  const fabricPatternImgMemo = useMemo<Promise<HTMLImageElement>>(() => {
    return loadImage('/Fabric_Knitted_006_height_small.png');
  }, []);
  const crystalNormalMapImgMemo = useMemo<Promise<HTMLImageElement>>(() => {
    // return loadImage('/crystal-32.png');
    // return loadImage('/sphere-32.png');
    // return loadImage('/ring-32.png');
    // return loadImage('/grid-circle.png');
    // return loadImage('/pyramid-24.png');
    // return loadImage('/crystal-16.png');
    return loadImage('/crystal-12.png');
  }, []);
  const crystalEmissiveMapImgMemo = useMemo<Promise<HTMLImageElement>>(() => {
    return loadImage('/crystal-emissive-12.png');
  }, []);

  useEffect(() => {
    const previewImgDom = previewImgRef.current as HTMLImageElement;

    (async () => {
      const canvasText = new CanvasText({
        hasPuff,
        toNormalMap,
        patternType,
        text: editText?.text,
      });

      if (!editText || !editText.key || !isVisiblePreview) {
        canvasText.clear();
        return;
      }

      if (!editText.text) {
        canvasText.clear();
        updateText(editText.key, {
          preview: new CanvasTexture(canvasText.getOutlineCanvas()),
        });
        return;
      }

      // Adjust this once preloading fonts has been implemented
      if (fontFamily !== editText?.font) {
        setFontFamily(editText?.font);
        await loadFonts(editText?.font as string);
      }

      const img = editText?.material && (await materialImgMemo);
      const outlineImg = editText?.outline && (await outlineImgMemo);
      const embroideryPattern = await fabricPatternImgMemo;
      const crystalNormalMap = await crystalNormalMapImgMemo;
      const crystalEmissiveMap = await crystalEmissiveMapImgMemo;

      const shouldUsePattern = isLuxury && !hasPuff;
      const patternImg = shouldUsePattern && (hasCrystals ? crystalNormalMap : embroideryPattern);

      await canvasText.previewText({
        material: img,
        outline: outlineImg,
        previewImg: previewImgDom,
        normalMapPatternImg: patternImg,
        emissiveMap: crystalEmissiveMap,
      });

      updateText(editText.key, {
        preview: new CanvasTexture(canvasText.getOutlineCanvas()),
        normalMap: new CanvasTexture(canvasText.getNormalMapOutlineCanvas()),
        emissiveMap: new CanvasTexture(canvasText.getEmissiveMapCanvas()),
      });
    })();
  }, [
    editText?.text,
    editText?.material,
    editText?.outline,
    editText?.font,
    isVisiblePreview,
    editText?.puffPrice,
    editText?.crystalPrice,
  ]);

  if (!portalRef) {
    return null;
  }

  return createPortal(
    <>
      <div id='testPreview' style={{ position: 'absolute', zIndex: '100' }} />
      <div className={styles.textPreview}>
        {!editText?.text ? (
          <div className={styles.noText}>Enter text to show preview</div>
        ) : (
          <>
            {/* Image is no longer needed, remove this */}
            <div className={styles.textPreview__imgContainer} style={{ display: 'none' }}>
              <img
                height={80}
                width={640}
                ref={(el) => {
                  previewImgRef.current = el;
                  setIsVisiblePreview(!!el);
                }}
              />
            </div>
            {previewImgRef.current?.src ? (
              <Canvas>
                <NavTextPreviewScene text={editText} />
              </Canvas>
            ) : (
              ''
            )}
          </>
        )}
      </div>
    </>,
    portalRef,
  );
};

export default NavTextPreview;
