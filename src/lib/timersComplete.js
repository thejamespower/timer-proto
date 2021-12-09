const timersComplete = id => x =>
  x.id !== id
    ? x
    : {
        ...x,
        complete: true,
        active: false,
      };

export default timersComplete;
