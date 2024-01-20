import { Decal } from '@react-three/drei';
import { TextCustomiser } from '@store/customiser';
import { Texture, Vector2, Vector3 } from 'three';
import Lights from '../Lights';

interface NavTextPreviewSceneInterface {
  text: TextCustomiser;
}

const NavTextPreviewScene = ({ text }: NavTextPreviewSceneInterface) => {
  const scale = 10;
  const scaleModifier = new Vector3(3.2 * scale, 0.4 * scale, 4);

  const isLuxury: boolean = text.selectedName?.id === '2' ? true : false;
  const hasPuff: boolean = text.puffPrice ? true : false;
  const hasCrystals: boolean = text.crystalPrice ? true : false;

  const shouldNormalMap =
    text.normalMap instanceof Texture && text.selectedName?.attributes?.name === 'Luxury';
  const normalMap = shouldNormalMap ? text.normalMap : null;
  console.log(normalMap, 'normalMap');

  let normalScale = 1;
  if (hasCrystals) {
    normalScale = 4;
  } else if (isLuxury && !hasPuff) {
    normalScale = 0.5;
  } else if (isLuxury && hasPuff) {
    normalScale = 3;
  }

  return (
    <>
      <Lights />
      <mesh>
        <planeBufferGeometry args={[20, 5]} />
        <meshNormalMaterial visible={false} />
        <Decal position={[0, 0, 0]} rotation={[0, 0, 0]} scale={scaleModifier}>
          <meshStandardMaterial
            map={text.preview instanceof Texture ? text.preview : null}
            transparent
            roughness={isLuxury && !hasCrystals ? 0.75 : 0}
            depthTest
            depthWrite={false}
            normalMap={normalMap}
            normalScale={new Vector2(normalScale, normalScale)}
          />
        </Decal>
      </mesh>
    </>
  );
};

export default NavTextPreviewScene;
