// useDefaultQueryConfig.js
import { useRoute } from "../context/RouteContext";
import { toastyPreset } from "../util/constants/toastyPreSet";
import { msg } from "../util/constants/msg";
import { AxiosError } from "axios";
import { useAuth } from "../context/AuthContext";

export const useDefaultQueryConfig = () => {
  const { handleSetToast, handleSetLoading } = useRoute();
  const { logout } = useAuth();

  return {
    retry: false,
    enabled: true,
    behavior: {
      onFetch: () => {
        handleSetLoading(true);
      },
    },
    onSuccess: () => {
      handleSetLoading(false);
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 401) {
        handleSetToast({
          ...toastyPreset.WARNING,
          message: msg.common.expiredSession,
        });
        logout();
      } else {
        handleSetToast({
          ...toastyPreset.DANGER,
          message: msg.common.loadError,
        });
      }
      handleSetLoading(false);
    },
  };
};
