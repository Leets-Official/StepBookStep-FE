import apiClient from "@/api/clients";

export interface UpdatePreferencesRequest {
  level: number;
  categoryIds: number[] | null;
  genreIds: number[] | null;
}

export const patchPreferences = (userId: number, request: UpdatePreferencesRequest) => {
  return apiClient.patch("/my/profile/preferences", request, {
    params: { userId },
  });
};

export const patchNickname = (userId: number, nickname: string) => {
  return apiClient.patch(
    "/my/profile/nickname",
    { nickname },
    {
      params: { userId },
    },
  );
};

export const deleteMyProfile = (userId: number) => {
  return apiClient.delete("/my/profile", {
    params: { userId },
  });
};
