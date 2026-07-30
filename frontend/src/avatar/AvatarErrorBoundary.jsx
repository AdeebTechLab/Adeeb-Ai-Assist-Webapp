import React from "react";

class AvatarErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, info) {
    console.error("Avatar Error:", error);
    console.error(info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-[650px] rounded-3xl bg-red-50 flex flex-col items-center justify-center">

          <h2 className="text-2xl font-bold text-red-700">
            Avatar Failed to Load
          </h2>

          <p className="mt-3 text-gray-600">
            Please refresh the page.
          </p>

        </div>
      );
    }

    return this.props.children;
  }
}

export default AvatarErrorBoundary;