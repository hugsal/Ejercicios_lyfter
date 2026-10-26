function Loading() {
  return (
    <section className="loading-screen" role="status" aria-live="polite">
      <span className="loading-spinner" aria-hidden="true" />
      <p className="loading-label">Cargando</p>
    </section>
  );
}

export default Loading;
