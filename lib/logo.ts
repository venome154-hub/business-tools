export function readLogoFile(file: File) {
  const name = file.name.toLowerCase();
  const svg = file.type === "image/svg+xml" || name.endsWith(".svg");
  const png = file.type === "image/png" || name.endsWith(".png");
  const jpeg = file.type === "image/jpeg" || name.endsWith(".jpg") || name.endsWith(".jpeg");
  if (!svg && !png && !jpeg) return Promise.reject(new Error("Use a PNG, JPG, or SVG logo."));

  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("The logo could not be read."));
    reader.onload = () => {
      const image = new Image();
      const objectUrl = svg ? URL.createObjectURL(new Blob([String(reader.result || "")], { type: "image/svg+xml" })) : "";
      image.onload = () => {
        const max = 480;
        const scale = svg ? Math.min(max / image.width, max / image.height) : Math.min(1, max / Math.max(image.width, image.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        const context = canvas.getContext("2d");
        if (!context) {
          reject(new Error("The logo could not be resized."));
          return;
        }
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        if (objectUrl) URL.revokeObjectURL(objectUrl);
        resolve(canvas.toDataURL(png || svg ? "image/png" : "image/jpeg", 0.85));
      };
      image.onerror = () => reject(new Error("The logo could not be read."));
      image.src = svg ? objectUrl : String(reader.result || "");
    };
    if (svg) reader.readAsText(file);
    else reader.readAsDataURL(file);
  });
}
