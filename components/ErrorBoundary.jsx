import React from 'react';
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.log(error);
    // console.clear();
  }
  render() {
    if (this.state.hasError) {
      return (
        <section className="error-page">
          <div className="error-page__wrapper">
            <Image
              className="error-page__image"
              src="/404.png"
              alt="404 image"
              width="550"
              height="180"
            />
            <h1 className="error-page__heading">Oops, there is an error!</h1>
            <button
              type="button"
              className="error-page__link"
              onClick={() => this.setState({ hasError: false })}
            >
              Try again?
            </button>
          </div>
        </section>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
