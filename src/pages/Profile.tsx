import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Text from "../components/Text";
import axiosInstance from "../lib/http-client";
import { useForm } from "react-hook-form";
import ImageFilePreview from "../components/ImageFilePreview";
import { GoVerified, GoUnverified } from "react-icons/go";
import useVerifyEmailMutation from "../hooks/verifyEmailMutation";
import usePasswordResetMutation from "../hooks/usePasswordResetMutation";
import useUserData from "../hooks/useUserData";
import { toast } from "react-toastify";
import { ProfileUpdateResponse } from "../types/common";

interface FormInputData {
  name: string;
  email: string;
  pictrue?: FileList;
}

function Profile() {
  const { userData, setUserData } = useUserData();
  const { register, handleSubmit, watch } = useForm<FormInputData>({
    defaultValues: {
      name: userData?.name,
      email: userData?.email,
    },
  });

  const pictureFiles = watch("pictrue");
  const verifyEmailMutation = useVerifyEmailMutation();
  const passwordResetMutation = usePasswordResetMutation();
  const mutation = useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: async (data: FormData) => {
      try {
        const res = await axiosInstance.put<ProfileUpdateResponse>(
          "/users/update-profile",
          data
        );
        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return Promise.reject(error.response?.data);
        }
      }
    },
    onSuccess: async (data) => {
      if (data) {
        setUserData({
          ...userData,
          ...data,
        });
        toast("Profile updated successfully", {
          type: "success",
        });
      }
    },
  });

  const onSubmit = (data: FormInputData) => {
    const formData = new FormData();
    formData.set("name", data.name);
    formData.set("email", data.email);
    if (data.pictrue && data.pictrue?.length > 0) {
      formData.set(`pictrue`, data.pictrue[0]);
    }
    mutation.mutate(formData);
  };

  const handlePasswordReset = () => {
    if (!userData?.email_verified) {
      return void toast("Please verify email first", {
        type: "info",
      });
    }
    passwordResetMutation.mutate();
  };

  return (
    <div className="mx-auto my-8 max-w-xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Text className="my-6">
          <h2>Edit Profile</h2>
        </Text>

        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              placeholder="John Doe"
              className="input input-primary rounded-none"
              {...register("name", {
                required: true,
              })}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="flex items-center">
              Email:
            </label>
            <input
              type="text"
              placeholder="user@learn.konamars.com"
              className="input input-primary rounded-none"
              {...register("email", {
                required: true,
              })}
            />
            <div className="flex items-center gap-1 text-sm text-secondary">
              {userData?.email_verified ? (
                <>
                  <GoVerified className="text-success" />
                  <span></span>
                  Email Verified
                </>
              ) : (
                <>
                  <GoUnverified className="text-warning" />
                  <span>Email not verified. </span>
                  <button
                    className="link link-primary"
                    type="button"
                    onClick={() => verifyEmailMutation.mutate()}
                  >
                    send verification email.
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="image">Profile picture: </label>
            <div>
              {pictureFiles && pictureFiles?.length > 0 ? (
                <ImageFilePreview files={pictureFiles} />
              ) : (
                <img src={userData?.picture} alt={userData?.name} />
              )}
            </div>
            <input
              type="file"
              placeholder="user@learn.konamars.com"
              className="rounded-none"
              accept="image/png, image/jpeg"
              {...register("pictrue")}
            />
          </div>

          <button
            className="btn btn-primary btn-block capitalize"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
      <div className="mt-6 space-y-6">
        <button
          className="btn btn-secondary btn-block capitalize"
          type="submit"
          onClick={handlePasswordReset}
        >
          Reset password
        </button>
      </div>
    </div>
  );
}

export default Profile;
