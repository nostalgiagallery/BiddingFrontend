import React from "react";
import { useForm } from "react-hook-form";

const Ticket = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <section className="bg-[#1D2430] overflow-hidden py-16 md:py-20 lg:py-28 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="max-w-1/2 bg-[#2b3342] px-8 py-11 sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px] m-10">
        <h2 className="agbalumo mb-3 text-2xl  text-gray-300 sm:text-3xl lg:text-2xl xl:text-3xl">
          Need Help? Open a Ticket
        </h2>
        <p className="agbalumo mb-12 text-gray-400">
          Our support team will get back to you ASAP via email.
        </p>
        <form
          noValidate
          onSubmit={handleSubmit((data) => {
            console.log(data);
          })}
        >
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 md:w-1/2">
              <div className="mb-8">
                <label
                  htmlFor="name"
                  className="agbalumo mb-3 block text-sm  text-gray-200"
                >
                  Your Name
                </label>
                <input
                  id="name"
                  {...register("name", {
                    required: "Name field is required",
                  })}
                  type="text"
                  placeholder="Enter your name"
                  className="border-stroke w-full rounded-sm border px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary border-transparent bg-[#525660]  focus:border-indigo-500 focus:shadow-none text-white"
                />
                {errors.name && (
                  <p className="text-red-500">{errors?.name.message}</p>
                )}
              </div>
            </div>
            <div className="w-full px-4 md:w-1/2">
              <div className="mb-8">
                <label
                  htmlFor="email"
                  className="agbalumo mb-3 block text-sm  text-gray-200"
                >
                  Your Email
                </label>
                <input
                  id="email"
                  {...register("email", {
                    required: "Email field is required",
                    pattern: {
                      value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                      message: "Email is not valid",
                    },
                  })}
                  type="email"
                  placeholder="Enter your Email"
                  className="border-stroke w-full rounded-sm border px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary border-transparent bg-[#525660] focus:border-indigo-500 focus:shadow-none text-white"
                />
                {errors.email && (
                  <p className="text-red-500">{errors?.email.message}</p>
                )}
              </div>
            </div>
            <div className="w-full px-4">
              <div className="mb-8">
                <label
                  htmlFor="message"
                  className="agbalumo mb-3 block text-sm  text-gray-200"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  {...register("message", {
                    required: "message field is required",
                  })}
                  type="text"
                  rows={5}
                  placeholder="Enter your Message"
                  className="border-stroke w-full rounded-sm border px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary border-transparent bg-[#525660] focus:border-indigo-500 focus:shadow-none text-white"
                ></textarea>
                {errors.message && (
                  <p className="text-red-500">{errors?.message.message}</p>
                )}
              </div>
            </div>
            <div className="w-full px-4">
              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-sm bg-blue-600	 px-9 py-4  text-white duration-300 hover:bg-blue-500"
              >
                Submit Ticket
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="max-w-1/2 mt-10">
        <img
          src="https://treact.owaiskhan.me/static/media/email-illustration.84fb82b841c197337a4bc2c1e660d5a0.svg"
          className="w-auto h-auto"
        />
      </div>
    </section>
  );
};

export default Ticket;
