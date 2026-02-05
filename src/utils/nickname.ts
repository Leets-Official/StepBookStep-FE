export const isValidNickname = (nickname: string): boolean => {
  const regex = /^[가-힣a-zA-Z0-9]{2,15}$/;
  return regex.test(nickname);
};

export const getNicknameErrorMessage = (nickname: string): string | null => {
  if (nickname.length === 0) return null;

  if (nickname.length < 2 || nickname.length > 15) {
    return "닉네임은 2자 이상 15자 이하여야 해요";
  }

  if (!/^[가-힣a-zA-Z0-9]+$/.test(nickname)) {
    return "한글, 영문, 숫자만 사용할 수 있어요";
  }

  return null;
};
