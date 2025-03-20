"use client";

import { useEffect, useState, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import * as THREE from "three";
import axios from "axios";

export default function Home() {
    const [model, setModel] = useState(null);
    const [texture, setTexture] = useState(null);
    const [pythonMetadata, setPythonMetadata] = useState({});
    const [nextjsMetadata, setNextjsMetadata] = useState({});
    const [loading, setLoading] = useState(true);

    // Load 3D Model and Texture
    useEffect(() => {
        async function loadModel() {
            try {
                const objLoader = new OBJLoader();
                objLoader.load(
                    "/model.obj",
                    (loadedModel) => {
                        if (loadedModel.children.length > 0) {
                            setModel(loadedModel);
                        } else {
                            console.error("Loaded model has no children!");
                        }
                    },
                    undefined,
                    (error) => console.error("Error loading OBJ model:", error)
                );

                // Load Texture
                const textureLoader = new THREE.TextureLoader();
                textureLoader.load(
                    "/texture.jpg",
                    (loadedTexture) => {
                        setTexture(loadedTexture);
                    },
                    undefined,
                    (error) => console.error("Error loading texture:", error)
                );
            } catch (error) {
                console.error("Error loading model or texture:", error);
            } finally {
                setLoading(false);
            }
        }

        loadModel();
    }, []);

    // Fetch metadata from Python & Next.js backend
    useEffect(() => {
        async function fetchMetadata() {
            try {
                const [pythonResponse, nextjsResponse] = await Promise.all([
                    axios.get("http://localhost:8000/python-model-info"),
                    axios.get("/api/nextjs-model-info"),
                ]);

                setPythonMetadata(pythonResponse.data);
                setNextjsMetadata(nextjsResponse.data);
            } catch (error) {
                console.error("Error fetching metadata:", error);
            }
        }

        fetchMetadata();
    }, []);

    
    const texturedModel = useMemo(() => {
        if (model && texture) {
            model.traverse((child) => {
                if (child.isMesh) {
                    // Ensure the geometry has UVs before applying texture
                    if (!child.geometry.attributes.uv) {
                        console.warn("Model has no UVs! Texture may not appear correctly.");
                    }
                    child.material = new THREE.MeshStandardMaterial({
                        map: texture,
                        roughness: 0.5,
                        metalness: 0.5,
                    });
                }
            });
        }
        return model;
    }, [model, texture]);
    

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-900 text-white p-8">
            <h1 className="text-3xl font-bold mb-6">3D Model Viewer</h1>

            {/* Metadata Display */}
            <div className="flex flex-wrap justify-center gap-10 mb-6">
                <div className="bg-gray-800 p-6 rounded w-[400px]">
                    <h2 className="text-xl font-semibold mb-2">Python Backend Data</h2>
                    <p><span className="font-medium">Model Name:</span> {pythonMetadata.model_name || "Loading..."}</p>
                    <p><span className="font-medium">Vertex Count:</span> {pythonMetadata.vertex_count || "N/A"}</p>
                    <p><span className="font-medium">Texture:</span> {pythonMetadata.texture_details || "N/A"}</p>
                </div>

                <div className="bg-gray-800 p-6 rounded w-[400px]">
                    <h2 className="text-xl font-semibold mb-2">Next.js Backend Data</h2>
                    <p><span className="font-medium">Scale:</span> {nextjsMetadata.scale || "N/A"}</p>
                    <p><span className="font-medium">Face Count:</span> {nextjsMetadata.face_count || "N/A"}</p>
                </div>
            </div>

            {/* 3D Model Viewer */}
            <Canvas className="w-full h-[700px] bg-black rounded-lg">
                <ambientLight intensity={0.5} />
                <hemisphereLight skyColor={"#ffffff"} groundColor={"#444444"} intensity={0.6} />
                <directionalLight position={[5, 10, 5]} intensity={1.5} />
                <OrbitControls />
                {loading ? (
                    <mesh>
                        <boxGeometry />
                        <meshStandardMaterial color="gray" />
                    </mesh>
                ) : (
                    texturedModel && <primitive object={texturedModel} />
                )}
            </Canvas>
        </div>
    );
}
