import { Maybe, ModelFragment } from '@graphql/generated/graphql';
import { useGLTF } from '@react-three/drei';
import { ThreeElements } from '@react-three/fiber';
import { useCustomiserStore } from '@store/customiser';
import { Dispatch, Fragment, SetStateAction, useEffect, useMemo, useRef, useState } from 'react';
import { Mesh } from 'three';
import { GLTF } from 'three-stdlib';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils';
import CustomiserMesh from '../CustomiserMesh';
import DecalGraphic from '../DecalGraphic';
import DecalText from '../DecalText';
export interface CustomiserModelProps {
  model?: Maybe<ModelFragment>;
}

type GLTFResult = GLTF & {
  nodes: { [name: string]: THREE.Mesh };
  materials: { [name: string]: THREE.Material };
};

const Model = ({ model }: CustomiserModelProps) => {
  const meshRef = useRef<Mesh>(null);
  const flags = useCustomiserStore((state) => state.flags);
  const texts = useCustomiserStore((state) => state.texts);
  // const { nodes } = useGLTF('/test.glb') as unknown as GLTFResult;
  const { nodes } = useGLTF(
    model?.attributes?.model?.data?.attributes?.url as string,
  ) as unknown as GLTFResult;

  const geom = useMemo(() => {
    const geometries = [];

    for (const [, node] of Object.entries(nodes)) {
      if (node.isMesh) {
        geometries.push(node.geometry.clone());
      }
    }

    return BufferGeometryUtils.mergeBufferGeometries(geometries);
  }, [nodes]);

  const graphicProps: ThreeElements['mesh'] = {
    geometry: geom,
  };

  const graphicMaterialProps: ThreeElements['meshStandardMaterial'] = {
    transparent: true,
    // colorWrite: false,
  };

  return (
    <>
      {model?.attributes?.parts?.data.map((part) => {
        return (
          <Fragment key={part.id}>
            {part?.attributes?.nodeId && (
              <CustomiserMesh
                key={part.attributes.nodeId}
                node={nodes[part.attributes.nodeId]}
                nodeId={part.attributes.nodeId}
              />
            )}
          </Fragment>
        );
      })}
      <mesh {...graphicProps} ref={meshRef}>
        <meshStandardMaterial {...graphicMaterialProps} />
        {flags.map((flag) => {
          if (flag.decalPosition && flag.decalOrientation)
            return (
              <DecalGraphic
                key={flag.key}
                flag={flag}
                position={flag.decalPosition}
                orientation={flag.decalOrientation}
                scale={flag.decalScale}
              />
            );
        })}
        {texts.map((text) => {
          if (text.decalPosition && text.decalOrientation)
            return (
              <DecalText
                key={text.key}
                text={text}
                position={text.decalPosition}
                orientation={text.decalOrientation}
                scale={text.decalScale}
              />
            );
        })}
      </mesh>
    </>
  );
};

export default Model;
