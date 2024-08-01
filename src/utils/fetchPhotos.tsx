export const fetchPhotos = (): Promise<string[]> => {
  return new Promise((resolve) => {
    const photos = Array(9)
      .fill("")
      .map(() => `https://picsum.photos/200?random=${Math.random()}`);
    setTimeout(() => resolve(photos), 500);
  });
};
