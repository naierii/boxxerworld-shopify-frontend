import { Decal, useTexture } from '@react-three/drei';
import { EulerArray, FlagCustomiser, GraphicCustomiser, Vector3Array } from '@store/customiser';
import { log } from 'console';
import { useMemo } from 'react';
import { Euler, EulerOrder, MathUtils, Vector3 } from 'three';
export interface DecalGraphicProps {
  flag?: FlagCustomiser;
  graphic?: GraphicCustomiser;
  position: Vector3Array;
  orientation: EulerArray;
  scale?: number;
}

const DecalGraphic = ({ flag, graphic, position, orientation, scale = 1 }: DecalGraphicProps) => {
  const texture = flag?.flag?.attributes?.image.data?.attributes?.url
    ? [flag.flag.attributes.image.data.attributes.url]
    : graphic?.graphic?.attributes?.image?.data?.attributes?.url
    ? [graphic.graphic.attributes.image.data.attributes.url]
    : [];

  const [image] = useTexture(texture);

  const ratio = useMemo(() => {
    const width = image.source.data.width ?? 1;
    const height = image.source.data.height ?? 1;
    return width / height;
  }, [image]);

  const rotationModifier = useMemo(() => {
    const orientationCopy = new Euler().fromArray(
      orientation as [number, number, number, (EulerOrder | undefined)?, ...any[]],
    );
    const currentAngle = MathUtils.radToDeg(orientationCopy.z);
    const decalRotation = flag?.decalRotation || graphic?.decalRotation;
    const newAngle = currentAngle + (decalRotation ?? 0);
    orientationCopy.z = MathUtils.degToRad(newAngle);
    return orientationCopy;
  }, [flag?.decalRotation, graphic?.decalRotation, orientation]);

  const scaleModifier = useMemo(() => {
    return new Vector3(1 * ratio * scale, 1 * scale, 4);
  }, [scale]);

  if (!image) {
    return null;
  }

  return (
    <Decal position={position} rotation={rotationModifier} scale={scaleModifier}>
      <meshPhongMaterial
        map={image}
        transparent
        depthTest
        depthWrite={false}
        polygonOffset
        polygonOffsetFactor={-20}
        needsUpdate
      />
    </Decal>
  );
};

export default DecalGraphic;