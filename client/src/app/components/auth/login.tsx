"use client";
import React, { useState } from "react";

interface LoginFormProps {
  onSubmit: (userData: { email: string; password: string }) => void;
}

const LoginPage: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-30 w-auto"
            src="https://lh3.googleusercontent.com/fife/ALs6j_GMt5PsYrbmlt5C60-qP5B6xRxErzsgJ9lnPxXiilFvOfySe7Sm14_w-c3FZYgWPlbofTPEyl2tnZnaFPFhtnHzEHKjjPXYOdk8fby-A9FOkwht3lZG0CwcnX5qJ77any4-lPsZ6pWI9E02K5LxeyMxN_QN9ZyWnIHL0DclzpQZgeYuMP8d8BgUYSEZwYCHQRwJD0-MgyYTJVrAFn7O-JCWwgQJ6TOBATnfR2fdfx3qtHLaYo1vQvpe2lBKgSWabQtZvvG-6Dbz6E6L6r6fK-SDMHXwjRMVO_dPA6x9L1zHYKxWnop7a3ZkV8xcfMcexx3QPpGndRjEZM4QL8OuqFJbWL94Qrw6IfiVaLxgSOPCkH1vYwD5ju6uVjhKseqZNkVJDXlfJuoDlAk3_VyowqsRKkcv7YSO6aueROYGGQPdsONbYM6roHR3x1Lm4QWEYXHAb88Xl7PgHktXuJWP8iXjMkKYvFfumNxShyR3XQ45d1fGB9UoE4EnNDyN3WABPpPX_BzNRmfxaZ1N4wIBIbUaHkOLtPXQtshBkNrkzqrIBjQQTSZSpC9zXRbdtOvMHMspYvBrto4me1U2Mu6PO7whnJqBKfR3B_LWNsStugItKozowfpljpWDcRsTr3gMP9TZdc0l-HdcA8u0_iaK0InubnY0waNySBu5CreN3gtS9BXr6TsIW2UoX3jPXARAXNyWNea-J5kvEMnP146iLPJbtGdYpy-zfG_yq1Et-xtx7j3c-GKKn8H-RPLgokjjC0XrJ9SDjBbv_buqU84tCK-6NZTY6UtyawMb6VXjxfzIeWBpOTiWYTr9I9IJkY_gt9krtruK-M53xEMM1ltIm9ook_DPeg4lfkIMguN59Vez5ZBTvmAAbtakcRTBYS4rgX_Xcvu10XCBnjNNqj6qSXIvyiETIb4JiDEAmvaB7wwr0THrI-_X1K9zIavhSelZL8CgG3go4ei5_PcZNCF7V0sN0JQ8_gs-q3iCrqrZgcp_FmJxT_0jMezJGAaQSkeV1X7yrgJ7EoN5KLoJhuBzthf70qUef8WIzO6_BcGd5gskT-o2EOBIFeL7RUxdH2cal2q1cp2Gw_ksB2WOAFskF1aE8JljCEqz-4be4kymDvMyNm6FMpShILTQ0EdLjebVIpzq49HMfWMblhB0dtMeBLYe6RQZM9o5_UMwgrOaS8EoaO0HnWXu_20MH-WsYet4q0miWhk6GI_d4KOVG6NvZh6jqXBkzPoU0FnOh-Q4ju_vG4bveTzpsvhmLzdIjB3aAGajCdoiiGsMB1XEtgG1ceObSmLU54pYsLEkM0ceMChbRgU6LAc5SLo7VmygCvKXSEL7EPj1E4dZBxiMz-RGvTg3Ntp1vwxGwltChIDuD-aAHrE7oYVtjOjdFFsgF3dsqwuL1LE1gkvqkjOCYmBIP56WQiJhuPNH2VlD1cBVuAVlpMBSGOCDYf1gPWlesjCC6FksXQ2HHc5oJRNxyiCbPKJql43zBcDhTQcPBgcZxuWmtn9nBx-Op3emL6a65oqNghrDvDp17GDPjpDvPQm6ciAQ0UqjNgeQglv0aOLKsbfcgk5xGNSZPcQHRNsRzktCVAfYiywrScTKRtXocDUYYLOqWv0vY_2eLxbMQrCdBQ30BMQM4987Xg6lc9KxNgvID-BIue2rv1sqVD0r9cdN6jwKVMA9ecs=w1920-h927"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            PT Astra Otoparts Nusametal Division - ESG System
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>

              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="grow"
                  placeholder="Email"
                />
              </label>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="grow"
                />
              </label>
            </div>

            <div>
              <button
                className="btn btn-outline btn-success w-full"
                type="submit"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
