"use client"
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Stadium(props) {
  const { nodes, materials } = useGLTF('/al_wakrah_stadium_worldcup_2022.glb')
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={6.667}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group
            position={[0, 0, 0.581]}
            rotation={[-Math.PI, 0, -Math.PI]}
            scale={[-17.248, 17.248, 17.248]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_6.geometry}
              material={materials['Material.007']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_7.geometry}
              material={materials['Material.008']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_8.geometry}
              material={materials['Material.008']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_9.geometry}
              material={materials['Material.008']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_10.geometry}
              material={materials['Material.008']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_11.geometry}
              material={materials['Material.008']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_12.geometry}
              material={materials['Material.008']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_13.geometry}
              material={materials['Material.008']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_14.geometry}
              material={materials['Material.008']}
            />
          </group>
          <group position={[0, 0, -0.598]} scale={17.248}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_16.geometry}
              material={materials['Material.007']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_17.geometry}
              material={materials['Material.008']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_18.geometry}
              material={materials['Material.008']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_19.geometry}
              material={materials['Material.008']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_20.geometry}
              material={materials['Material.008']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_21.geometry}
              material={materials['Material.008']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_22.geometry}
              material={materials['Material.008']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_23.geometry}
              material={materials['Material.008']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_24.geometry}
              material={materials['Material.008']}
            />
          </group>
          <group position={[-0.262, 4.767, -0.009]} scale={[18.017, 18.116, 15.6]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_26.geometry}
              material={materials['Material.009']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_27.geometry}
              material={materials['Material.047']}
            />
          </group>
          <group position={[-0.225, -0.025, 0.315]} rotation={[-Math.PI / 2, 0, 0]} scale={0.461}>
            <group rotation={[Math.PI / 2, 0, 0]}>
              <group
                position={[-4.311, 0.254, -12.152]}
                rotation={[-Math.PI, 0, -Math.PI / 2]}
                scale={[0.117, 1.035, 0.123]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_39.geometry}
                  material={materials['Material.058']}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_41.geometry}
                  material={materials['Material.057']}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_43.geometry}
                  material={materials['Material.044']}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_45.geometry}
                  material={materials['Material.044']}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_47.geometry}
                  material={materials['Material.056']}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_49.geometry}
                  material={materials['Material.055']}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_51.geometry}
                  material={materials['Material.054']}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_53.geometry}
                  material={materials['Material.053']}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_55.geometry}
                  material={materials['Material.044']}
                />
              </group>
              <group
                position={[16.519, 0.386, 9.504]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={[0.012, 0.318, 0.012]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_58.geometry}
                  material={materials['Material.051']}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_59.geometry}
                  material={materials['Material.052']}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_60.geometry}
                  material={materials['Material.050']}
                />
              </group>
              <group
                position={[17.954, 0.083, -2.763]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={[0.034, 0.034, 0.022]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_63.geometry}
                  material={materials['Material.050']}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_64.geometry}
                  material={materials['Material.050']}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_66.geometry}
                  material={materials['Material.050']}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_68.geometry}
                  material={materials['Material.049']}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_70.geometry}
                  material={materials['Material.046']}
                />
              </group>
              <group
                position={[-18.135, 0.083, 1.243]}
                rotation={[0, Math.PI / 2, 0]}
                scale={[0.034, 0.034, 0.022]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_73.geometry}
                  material={materials['Material.050']}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_74.geometry}
                  material={materials['Material.050']}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_76.geometry}
                  material={materials['Material.050']}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_78.geometry}
                  material={materials['Material.049']}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_80.geometry}
                  material={materials['Material.046']}
                />
              </group>
            </group>
          </group>
          <group position={[0, 1.104, -0.598]} scale={0.213}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_82.geometry}
              material={materials['Material.014']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_83.geometry}
              material={materials['Material.015']}
            />
          </group>
          <group position={[0, 0.146, -0.598]} scale={17.248}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_87.geometry}
              material={materials['Material.043']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_88.geometry}
              material={materials['Material.059']}
            />
          </group>
          <group
            position={[0, 1.104, -0.598]}
            rotation={[-Math.PI, 0, 0]}
            scale={[-0.125, 0.125, 0.125]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_90.geometry}
              material={materials['Material.060']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_91.geometry}
              material={materials['Material.060']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_92.geometry}
              material={materials['Material.060']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_93.geometry}
              material={materials['Material.060']}
            />
          </group>
          <group position={[-0.262, 4.349, -0.009]} scale={[18.017, 16.128, 15.6]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_95.geometry}
              material={materials['CC-08.006']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_96.geometry}
              material={materials['kich-thuoc-san-bong-da.003']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_97.geometry}
              material={materials['SAN.002']}
            />
          </group>
          <group position={[-0.262, 4.495, -0.009]} scale={[17.946, 16.064, 15.539]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_99.geometry}
              material={materials['CC-07.008']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_100.geometry}
              material={materials['Material.001']}
            />
          </group>
          <group position={[0, 0, -0.598]} scale={17.248}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_104.geometry}
              material={materials['SAN.002']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_105.geometry}
              material={materials['CC-06.008']}
            />
          </group>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_4.geometry}
            material={materials['Material.013']}
            position={[-0.262, 4.495, -0.009]}
            scale={[18.017, 16.128, 15.6]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_29.geometry}
            material={materials['Material.043']}
            position={[-0.262, 4.547, -0.009]}
            scale={[18.017, 16.128, 15.6]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_31.geometry}
            material={materials['Material.043']}
            position={[-0.262, 4.547, -0.009]}
            scale={[18.017, 16.128, 15.6]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_33.geometry}
            material={materials['Material.043']}
            position={[-0.262, 4.547, -0.009]}
            scale={[18.017, 16.128, 15.6]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_85.geometry}
            material={materials['Material.007']}
            position={[0, 1.104, -0.598]}
            rotation={[-Math.PI, 0, 0]}
            scale={[-0.12, 0.12, 0.12]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_102.geometry}
            material={materials['Material.043']}
            position={[-0.262, 4.495, -0.009]}
            scale={[18.017, 16.128, 15.6]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_107.geometry}
            material={materials['Material.001']}
            position={[-0.262, 4.495, -0.009]}
            scale={[17.985, 16.099, 15.572]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_109.geometry}
            material={materials['Material.003']}
            position={[-0.262, 7.142, -0.009]}
            scale={17.248}
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/al_wakrah_stadium_worldcup_2022.glb')
