import apiClient from "@/api/clients";

export interface UpdatePreferencesRequest {
  level: number;
  categoryIds: number[];
  genreIds: number[];
}

export const patchPreferences = (userId: number, body: UpdatePreferencesRequest) => {
  return apiClient.patch("/my/profile/preferences", body, {
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
