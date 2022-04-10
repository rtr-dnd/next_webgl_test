import * as THREE from 'three'
import { Canvas, useFrame, useThree, Vector3 } from '@react-three/fiber'
import { Float, Text, useGLTF } from '@react-three/drei'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useMemo, useRef, useState } from 'react'
import styles from '../styles/Home.module.css'
import Noodles from '../components/Noodles'
import { Depth, LayerMaterial, Noise } from 'lamina'

const Home: NextPage = () => {
  return (
    <div id="canvas-container" >
      <Canvas dpr={[1, 2]} camera={{position: [0, 0, 10], fov: 22}}>
        <Bg />
        <Noodles />
        <Caption child="3D NOODLES"></Caption>
        <Rig />
      </Canvas>
    </div>
  )
}
const Caption = (props: {child: string}) => {
  const {width} = useThree((state) => state.viewport)
  return (
    <Text
    position={[0, 0, -5]}
    lineHeight={1.2}
    fontSize={width / 8}
    material-toneMapped={false}
    anchorX="center"
    anchorY="middle"
    >{props.child}</Text>
  )
}

function Rig({ v = new THREE.Vector3() }) {
  return useFrame((state) => {
    state.camera.position.lerp(v.set(state.mouse.x / 2, state.mouse.y / 2, 10), 0.1)
  })
}

function Bg() {
  return (
    <mesh scale={100}>
      <boxGeometry args={[1, 1, 1]} />
      <LayerMaterial side={THREE.BackSide}>
        <Depth colorB="red" colorA="skyblue" alpha={1} mode="normal" near={130} far={200} origin={[100, 100, -100]} />
        <Noise mapping="local" type="white" scale={1000} colorA="white" colorB="black" mode="subtract" alpha={0.2} />
      </LayerMaterial>
    </mesh>
  ) 
}

export default Home
