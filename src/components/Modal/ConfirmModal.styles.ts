export const overlay = `
  fixed inset-0
  bg-black/30
  flex items-center justify-center
  z-50
  `;

export const modal = `
  w-full
  max-w-[335px]
  bg-white
  rounded-2xl
  p-5
  mb-6
  shadow-lg
  `;

export const title = "text-xl font-bold text-black mb-2";

export const description = "text-md text-gray-600 mb-6 leading-5 font-regular";

export const actions = "flex gap-2";

export const cancelButton = `
  flex-1
  h-[44px]
  rounded-full
  border
  border-purple-100
  text-purple-800
  text-sm
  font-medium
  `;

export const confirmButton = `
  flex-1
  h-[44px]
  rounded-full
  bg-purple-500
  text-white
  text-sm
  font-medium
  `;
