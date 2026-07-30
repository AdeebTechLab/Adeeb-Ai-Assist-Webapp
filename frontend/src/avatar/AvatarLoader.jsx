import { Html, useProgress } from "@react-three/drei";

function AvatarLoader() {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="bg-white rounded-2xl shadow-xl px-8 py-6 text-center">

        <h2 className="text-xl font-bold mb-4">
          Loading AI Avatar...
        </h2>

        <div className="w-64 h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <p className="mt-4 font-semibold">
          {progress.toFixed(0)}%
        </p>

      </div>
    </Html>
  );
}

export default AvatarLoader;