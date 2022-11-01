import { useCurrentGraphics } from '@context/CurrentGraphicsContext';
import { ThreeElements } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { CanvasTexture, MeshPhongMaterial } from 'three';
import ProjectedMaterial from '../ProjectedMaterial/ProjectedMaterial';

export interface GraphicMaterialProps {
  test?: string;
}

const GraphicMaterial = ({ ...rest }: GraphicMaterialProps) => {
  const materialRef = useRef<MeshPhongMaterial>(null);
  const textureRef = useRef<CanvasTexture>(null);
  const { graphic, setGraphic } = useCurrentGraphics();

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.needsUpdate = true;
    }

    if (graphic && !graphic.material && materialRef.current) {
      setGraphic({ material: materialRef.current });
    }
  }, [materialRef, graphic]);

  if (!graphic?.canvas) {
    return null;
  }

  const textureProps: ThreeElements['canvasTexture'] = {
    image: graphic.canvas,
    needsUpdate: true,
    attach: 'map',
  };

  return (
    <ProjectedMaterial
      ref={materialRef}
      transparent={true}
      {...rest}
      freeze={graphic.freeze}
      texture={textureRef.current}
    >
      <canvasTexture {...textureProps} ref={textureRef} />
    </ProjectedMaterial>
  );
};

export default GraphicMaterial;
