export const handleUploadToCloudinary = async (file: File) => {
  if (!file) return null;

  const formData = new FormData();
  formData.append('file', file);
  formData.append(
    'upload_preset',
    `${import.meta.env.VITE_CLOUDINARY_PRESENT_NAME}`
  );

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
    }/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );

  const data = await res.json();
  console.log(data);
  return data.secure_url;
};
