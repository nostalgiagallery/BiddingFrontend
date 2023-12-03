import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import {
  EditProductAsync,
  addProductAsync,
  clearSelectedProduct,
  fetchProductByIdAsync,
  selectedProduct,
} from "../product/productSlice";

const ProductForm = () => {
  const dispatch = useDispatch();
  const [thumbnailurl, Setthumbnailurl] = useState(null);
  const [imagepng, Settimagepng] = useState(null);
  const [imagetwo, setImagetwo] = useState(null);
  const [video, setvideo] = useState(null);
  const [videoposter, setvideoposter] = useState(null);
  const [avatar, setavatar] = useState(null);
  const alert = useAlert();
  const selectedProductIS = useSelector(selectedProduct);
  const [loading, setLoading] = useState({
    thumbnailLoading: false,
    imagePngLoading: false,
    productTwoLoading: false,
    productVideoLoading: false,
    videoPosterLoading: false,
    avatarLoading: false,
  });
  const params = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  useEffect(() => {
    if (params.id) {
      dispatch(fetchProductByIdAsync(params.id));
    } else {
      dispatch(clearSelectedProduct());
    }
  }, [params.id, dispatch, setValue]);

  function uploadImage(file, setUrl, type) {
    const formData = new FormData();
    formData.append("file", file);
    setLoading((prevLoading) => ({ ...prevLoading, [type]: true }));

    return fetch("https://biddingapp-5c495b9e8cc1.herokuapp.com/uploadFile", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading((prevLoading) => ({ ...prevLoading, [type]: false }));
        if (data.error) {
          alert.error(`uploading error in ${type}`);
          console.error("Upload failed:");
        } else {
          setUrl(data?.url);
        }
      })
      .catch((error) => {
        setLoading((prevLoading) => ({ ...prevLoading, [type]: false }));
        console.error("Upload failed:", error);
        alert.error(`uploading error in ${type}`);
      });
  }

  const onChangeThumbnail = (e) => {
    const imageData = e.target.files[0];
    if (imageData) {
      uploadImage(imageData, Setthumbnailurl, "thumbnailLoading");
    }
  };

  const onChangeImagePng = (e) => {
    const imageData = e.target.files[0];
    if (imageData) {
      uploadImage(imageData, Settimagepng, "imagePngLoading");
    }
  };

  const onChangeProducttwo = (e) => {
    const imageData = e.target.files[0];
    if (imageData) {
      uploadImage(imageData, setImagetwo, "productTwoLoading");
    }
  };

  const onChangeProductVideo = (e) => {
    const VideoData = e.target.files[0];
    if (VideoData) {
      uploadImage(VideoData, setvideo, "productVideoLoading");
    }
  };
  const onChangeVideoPoster = (e) => {
    const imageData = e.target.files[0];
    if (imageData) {
      uploadImage(imageData, setvideoposter, "videoPosterLoading");
    }
  };

  const onChangeavatar = (e) => {
    const imageData = e.target.files[0];
    if (imageData) {
      uploadImage(imageData, setavatar, "avatarLoading");
    }
  };

  useEffect(() => {
    if (selectedProductIS && params.id) {
      console.log(selectedProductIS);
      setValue("Date", selectedProductIS.Date);
      setValue("Time", selectedProductIS.Time);
      setValue("baseprice", selectedProductIS.baseprice);
      setValue("bidExpired", selectedProductIS.bidExpired);
      setValue("category", selectedProductIS.category);
      setValue("celebrityname", selectedProductIS.celebrity.celebrityname);
      setValue("wikipedia", selectedProductIS.celebrity.wikipedia);
      setValue("role", selectedProductIS.celebrity.role);
      setavatar(selectedProductIS.celebrity.avatar);
      setValue("colors", selectedProductIS.colors);
      setValue("description", selectedProductIS.description);
      setValue("name", selectedProductIS.name);
      setValue("sizes", selectedProductIS.sizes);
      setvideo(selectedProductIS.videolink);
      setvideoposter(selectedProductIS.videoposter);
      Setthumbnailurl(selectedProductIS.imagesrc);
      setImagetwo(selectedProductIS.imagetwo);
      Settimagepng(selectedProductIS.imagepng);
    }
  }, [selectedProductIS, params.id, setValue]);

  return (
    <form
      className="relative bg-gray-200 p-6 rounded-md text-gray-200"
      onSubmit={handleSubmit((data) => {
        if (
          thumbnailurl &&
          imagetwo &&
          video &&
          videoposter &&
          avatar &&
          imagepng
        ) {
          const product = { ...data };
          product.baseprice = +product.baseprice;
          product.imagesrc = thumbnailurl;
          product.imagetwo = imagetwo;
          product.videolink = video;
          product.videoposter = videoposter;
          product.videoposter = videoposter;
          product.imagepng = imagepng;
          product.celebrity = {
            celebrityname: product.celebrityname,
            wikipedia: product.wikipedia,
            role: product.role,
            avatar: avatar,
          };
          if (params.id) {
            dispatch(
              EditProductAsync({
                ...product,
                id: params.id,
              })
            );
          } else {
            dispatch(addProductAsync(product));
          }

          reset();
        } else {
          alert.error("one of the file upload is missing upload correctly");
        }
      })}
    >
      <div className="space-y-12 p-10">
        <div className="border-b border-gray-00/10 pb-12">
          <h2 className="text-xl font-semibold leading-7 text-gray-800">
            {params.id ? `Edit` : `Add`} Product Form
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="name"
                className="text-left block text-sm font-medium leading-6 text-gray-900"
              >
                Product Name :
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="text"
                    {...register("name", {
                      required: "Product Name field is required",
                    })}
                    id="name"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="thumbnail"
                className="flex w-full items-center justify-center bg-green-400 p-2 text-white duration-300 rounded-lg  cursor-pointer"
              >
                {loading.thumbnailLoading ? (
                  <p>Uploading..</p>
                ) : (
                  <p>Upload Thumbnail</p>
                )}
              </label>
              <input
                id="thumbnail"
                type="file"
                onChange={onChangeThumbnail}
                className="hidden"
                accept="image/*"
              />
            </div>
            <div>
              {thumbnailurl && (
                <img
                  src={thumbnailurl}
                  alt="profile_image"
                  className="w-20 h-20 rounded-lg"
                />
              )}
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="productimage"
                className="flex w-full items-center justify-center bg-green-400 p-2 text-white duration-300 rounded-lg  cursor-pointer"
              >
                {loading.productTwoLoading ? (
                  <p>Uploading..</p>
                ) : (
                  <p>Upload Product Image</p>
                )}
              </label>

              <input
                id="productimage"
                type="file"
                onChange={onChangeProducttwo}
                className="hidden"
                accept="image/*"
              />
            </div>
            <div>
              {imagetwo && (
                <img
                  src={imagetwo}
                  alt="profile_image"
                  className="w-20 h-20 rounded-lg"
                />
              )}
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="baseprice"
                className="text-left block text-sm font-medium leading-6 text-gray-900"
              >
                Base Price :
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="number"
                    {...register("baseprice", {
                      required: "Base price  field is required",
                      min: 1,
                    })}
                    id="baseprice"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="category"
                className="text-left block text-sm font-medium leading-6 text-gray-900"
              >
                Category :
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="text"
                    {...register("category", {
                      required: "category  field is required",
                    })}
                    id="category"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="colors"
                className="text-left block text-sm font-medium leading-6 text-gray-900"
              >
                Colors :
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="text"
                    {...register("colors", {})}
                    id="colors"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="sizes"
                className="text-left block text-sm font-medium leading-6 text-gray-900"
              >
                sizes :
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="text"
                    {...register("sizes", {})}
                    id="sizes"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <div className="mt-7">
                <label
                  htmlFor="imagepng"
                  className="flex w-full items-center justify-center bg-green-400 p-2 text-white duration-300 rounded-lg  cursor-pointer"
                >
                  {" "}
                  {loading.imagePngLoading ? (
                    <p>Uploading..</p>
                  ) : (
                    <p> Upload Product Png</p>
                  )}
                </label>
                <input
                  id="imagepng"
                  type="file"
                  onChange={onChangeImagePng}
                  className="hidden"
                  accept="image/*"
                />
              </div>
            </div>
            <div>
              {imagepng && (
                <img
                  src={imagepng}
                  alt="profile_image"
                  className="w-20 h-20 rounded-lg"
                />
              )}
            </div>

            <div className="col-span-full">
              <label
                htmlFor="description"
                className="text-left block text-sm font-medium leading-6 text-gray-900"
              >
                Description :
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  {...register("description", {
                    required: "Description  field is required",
                  })}
                  rows={3}
                  className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                />
              </div>
              <p className="text-left mt-3 text-sm leading-6 text-gray-600">
                Write a few sentences about Product.
              </p>
            </div>

            <div className="sm:col-span-1">
              <label
                htmlFor="productVideo"
                className="flex w-full items-center justify-center bg-green-400 p-2 text-white duration-300 rounded-lg  cursor-pointer"
              >
                {loading.productVideoLoading ? (
                  <p>Uploading..</p>
                ) : (
                  <p>Upload Product Video</p>
                )}
              </label>
              <input
                id="productVideo"
                type="file"
                onChange={onChangeProductVideo}
                className="hidden"
                accept="video/*"
              />
            </div>
            <div className="sm:col-span-2">
              {video && (
                <video
                  src={video}
                  alt="profile_image"
                  className="w-auto h-auto rounded-lg"
                  controls
                />
              )}
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="videoposter"
                className="flex w-full items-center justify-center bg-green-400 p-2 text-white duration-300 rounded-lg  cursor-pointer"
              >
                {loading.videoPosterLoading ? (
                  <p>Uploading..</p>
                ) : (
                  <p>Upload video Thumbnail</p>
                )}
              </label>
              <input
                id="videoposter"
                type="file"
                onChange={onChangeVideoPoster}
                className="hidden"
                accept="image/*"
              />
            </div>
            <div>
              {videoposter && (
                <img
                  src={videoposter}
                  alt="profile_image"
                  className="w-auto h-auto rounded-lg"
                />
              )}
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="Date"
                className="text-left block text-sm font-medium leading-6 text-gray-900"
              >
                Date of bidding:
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 p-1">
                  <input
                    type="date"
                    {...register("Date", {
                      required: "Date field is required",
                    })}
                    id="Date"
                    className="block flex-1 border-0 bg-transparent pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    style={{ outline: "none", minWidth: "150px" }} // Additional styling
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="Time"
                className="text-left block text-sm font-medium leading-6 text-gray-900"
              >
                Time of bidding:
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 p-1">
                  <input
                    type="time"
                    {...register("Time", {
                      required: "Time field is required",
                    })}
                    id="Time"
                    className="block flex-1 border-0 bg-transparent pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    style={{ outline: "none", minWidth: "150px" }} // Additional styling
                  />
                </div>
              </div>
            </div>

            <div className="col-span-2">
              <label
                htmlFor="bidExpired"
                className="text-left block text-sm font-medium leading-6 text-gray-900"
              >
                Bid Expired :
              </label>
              <div className="mt-2 text-left">
                <select
                  className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register("bidExpired", {
                    required: "Bid Expired  field is required",
                  })}
                >
                  <option value="">---Choose One value----</option>
                  <option value={false} defaultChecked>
                    false
                  </option>
                  <option value={true}>true</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="celebrityname"
                className="text-left block text-sm font-medium leading-6 text-gray-900"
              >
                celebrity name :
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="text"
                    {...register("celebrityname", {
                      required: " celebrity name   field is required",
                    })}
                    id="celebrityname"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="wikipedia"
                className="text-left block text-sm font-medium leading-6 text-gray-900"
              >
                celebrity wikipedia :
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="text"
                    {...register("wikipedia", {
                      required: " celebrity wikipedia   field is required",
                    })}
                    id="wikipedia"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="role"
                className="text-left block text-sm font-medium leading-6 text-gray-900"
              >
                celebrity role :
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="text"
                    {...register("role", {
                      required: " celebrity role   field is required",
                    })}
                    id="role"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="avatar"
                className="flex w-full items-center justify-center bg-green-400 p-2 text-white duration-300 rounded-lg  cursor-pointer"
              >
                {loading.avatarLoading ? (
                  <p>Uploading..</p>
                ) : (
                  <p> Upload celebrity avatar</p>
                )}
              </label>
              <input
                id="avatar"
                type="file"
                onChange={onChangeavatar}
                className="hidden"
                accept="image/*"
              />
            </div>
            <div>
              {avatar && (
                <img
                  src={avatar}
                  alt="profile_image"
                  className="w-20 h-20 rounded-lg"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Link
          to="/admin-product"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
