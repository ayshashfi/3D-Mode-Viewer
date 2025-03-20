import { useEffect, useState } from 'react';
import { fetchPythonModelInfo } from '../utils/fetchModelInfo';

export default function Home() {
  const [pythonModelInfo, setPythonModelInfo] = useState(null);

  useEffect(() => {
    const getModelInfo = async () => {
      const data = await fetchPythonModelInfo();
      setPythonModelInfo(data);
    };
    getModelInfo();
  }, []);

  return (
    <div>
      <h1>3D Model Viewer</h1>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <h2>Model Metadata (Python Backend)</h2>
          {pythonModelInfo ? (
            <pre>{JSON.stringify(pythonModelInfo, null, 2)}</pre>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div style={{ flex: 2 }}>
          <ModelViewer />
        </div>
      </div>
    </div>
  );
}