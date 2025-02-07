"use client";
import React, { useState } from "react";
import axios from "axios";
import { IoCheckbox } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
// import { useSelector } from "react-redux";
import { TrackShipment } from "../../global-components/tracking"
import { postOrderData } from "../../../helper/placeOrder"
import { useSession } from "next-auth/react";
import { createClient } from "@sanity/client";
import dotenv from "dotenv";

interface ShipToAddress {
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  cityLocality: string;
  stateProvince: string;
  postalCode: string;
  countryCode: string;
  addressResidentialIndicator: string;
}

const CheckoutForm: React.FC = () => {
  const [rates, setRates] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [rateId, setRateId] = useState<string | null>(null);
  const [labelPdf, setLabelPdf] = useState<string | null>(null);
  const [trackingObj, setTrackingObj] = useState<any | null>(null);
  const [rateAmount, setRateAmount] = useState<number>(0);
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const [shippingButText, setShippingButText] = useState("Continue Shipping");
  const[ cartItems,setCartitems] = useState([])
  const router = useRouter();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isOrder, setIsOrder] = useState(false);
  const { data: session } = useSession();
  dotenv.config();




  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: "2025-01-17",
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  });





  const handleOrderConfirmation = () => {
    setOrderPlaced(true);
    setShowModal(false);
    setTimeout(() => {
      setOrderPlaced(false);
    }, 5000);
    router.push("/products");
  };
  const handleContinueShopping = () => {
    router.push("/products");
  };




  const [shipToAddress, setShipToAddress] = useState<ShipToAddress>({
    name: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    cityLocality: "",
    stateProvince: "CA",
    postalCode: "90001",
    countryCode: "US",
    addressResidentialIndicator: "yes",
  });




  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShipToAddress((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };





  const calculateSubtotal = (): number => {
    const subtotal = cartItems.reduce((total: number, item: any) => {
      const itemPrice = Number(item?.price) * Number(item?.quantity);
      const discountAmount =
        item?.dicountPercentage && !isNaN(item?.dicountPercentage)
          ? itemPrice * (Number(item?.dicountPercentage) / 100)
          : 0;
      const priceAfterDiscount = itemPrice - discountAmount;
      return total + priceAfterDiscount;
    }, 0);
    return subtotal + (rateAmount || 0);
  };
  const subtotal = calculateSubtotal();
  const [showModal, setShowModal] = useState(false);
  const calculateTotalQuantity = () => {
    return cartItems.reduce(
      (total: any, item: any) => total + item.quantity,
      0
    );
  };





  const calculateTotalDiscount = () => {
    return cartItems.reduce((total: any, item: any) => {
      const itemPrice = Number(item?.price) * Number(item?.quantity);
      const discountAmount = item?.dicountPercentage
        ? itemPrice * (Number(item?.dicountPercentage) / 100)
        : 0;
      return total + discountAmount;
    }, 0);
  };
  const totalQuantity = calculateTotalQuantity();
  const totalDiscount = calculateTotalDiscount();
  const total = subtotal - totalDiscount + (rateAmount || 0);

  const handleCreateLabel = async () => {
    if (!rateId) {
      alert("Please select a rate to create a label.");
      return;
    }
    setLoading(true);
    setErrors([]);
    try {
      const response = await axios.post("/api/create-label", {
        rateId: rateId,
      });
      const labelData = response.data;
      setLabelPdf(labelData.labelDownload.href);
      setTrackingObj({
        trackingNumber: labelData.trackingNumber,
        labelId: labelData.labelId,
        carrierCode: labelData.carrierCode,
      });
    } catch (error) {
      console.error(error);
      setErrors(["An error occurred due to server issue while creating the label.Please try again later!"]);
    } finally {
      setLoading(false);
    }
  };





  async function uploadImageToSanity(imageUrl: any) {
    try {
      console.log(`Uploading image: ${imageUrl}`);
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${imageUrl}`);
      }
      const buffer = await response.arrayBuffer();
      const bufferImage = Buffer.from(buffer);
      const asset = await client.assets.upload("image", bufferImage, {
        filename: imageUrl.split("/").pop(),
      });
      console.log(`Image uploaded successfully: ${asset._id}`);
      return asset._id;
    } catch (error) {
      console.error("Failed to upload image:", imageUrl, error);
      return null;
    }
  }






  const placeOrderHandler = async () => {
    for (const item of cartItems) {
      const imageRef = await uploadImageToSanity(item.productImage.asset?.url);

      if (!imageRef) {
        console.error("Failed to upload image");
        return;
      }
      const placedOrder = {
        productImage: {
          _type: "image",
          asset: {
            _ref: imageRef,
          },
        },
        productPrice: item.price,
        productTitle: item.title,
        productId:item._id,
        dicountPercentage: item.dicountPercentage || 0,
        userId: session?.user?.email || "default-user-id",
        userEmail: session?.user?.email || "default-email@example.com",
        userName: shipToAddress.name,
        userAddress: `${shipToAddress.addressLine1}, ${shipToAddress.cityLocality}, ${shipToAddress.stateProvince}, ${shipToAddress.postalCode}, ${shipToAddress.countryCode}`,
        userPhoneNumber: shipToAddress.phone,
      };
      await postOrderData(placedOrder);
    }
  };






  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]);
    setRates([]);
    setShippingButText("Fetching Rates...");

    setLoading(true);
    setErrors([]);

    try {
      const response = await axios.post("/api/get-rates", {
        shipToAddress,
        packages: [
          {
            weight: { value: 2, unit: "pound" },
            dimensions: { length: 10, width: 5, height: 8, unit: "inch" },
          },
        ],
      });
      setRates(response.data.rateResponse.rates);
      setShippingButText("Continue Shipping");
      console.log(response.data, "response");
    } catch (error) {
      console.error(error);
      setErrors(["An error occurred while fetching rates."]);
    } finally {
      setLoading(false);
    }
  };





  return (
    <main className="max-w-[1920px] mx-auto">
      <section className="my-9 sm:mx-[170px] mx-[30px]">
        <div className="flex gap-3 lg:flex-row flex-col h-auto mt-3 mb-44">
          <div className="w-full bg-[#F8F8FD] py-6 px-4">
            {rates.length === 0 ? (
              <form onSubmit={handleSubmit}>
                <div className="flex justify-between text-[#C1C8E1] mt-6 border-b-[2px] border-b-[#d0ced4]">
                  <input
                    type="tel"
                    placeholder="Phone number"
                    className="w-full p-2 bg-inherit"
                    required
                    name="phone"
                    value={shipToAddress.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex gap-2 mt-4">
                  <IoCheckbox className="text-[#19D16F]" />
                  <p className="text-[#8A91AB] text-[10px]">
                    Keep me up to date on news and exclusive offers
                  </p>
                </div>

                <h1 className="text-[16px] text-[#1D3178] font-bold mt-32">
                  Shipping address
                </h1>

                <div className="flex flex-col md:flex-row md:gap-4 md:justify-evenly">
                  <div className="text-[#C1C8E1] mt-10 border-b-[2px] border-b-[#d0ced4] w-full">
                    <input
                      type="text"
                      placeholder="Name"
                      className="w-full p-2 bg-inherit"
                      name="name"
                      value={shipToAddress.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="text-[#C1C8E1] mt-10 border-b-[2px] border-b-[#d0ced4] w-full">
                    <input
                      type="text"
                      placeholder="Last name (optional)"
                      className="w-full p-2 bg-inherit"
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:gap-4 md:justify-evenly">
                  <div className="text-[#C1C8E1] mt-10 border-b-[2px] border-b-[#d0ced4] w-full">
                    <input
                      type="text"
                      placeholder="Address Line 1"
                      className="w-full p-2 bg-inherit"
                      name="addressLine1"
                      value={shipToAddress.addressLine1}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="text-[#C1C8E1] mt-10 border-b-[2px] border-b-[#d0ced4] w-full">
                    <input
                      type="text"
                      placeholder="Address Line 2"
                      className="w-full p-2 bg-inherit"
                      name="addressLine2"
                      value={shipToAddress.addressLine2}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="text-[#C1C8E1] mt-10 border-b-[2px] border-b-[#d0ced4]">
                  <input
                    type="text"
                    placeholder="State/Province (DC/CA)"
                    className="w-full p-2 bg-inherit"
                    name="stateProvince"
                    value={shipToAddress.stateProvince}
                    onChange={handleChange}
                    required
                    readOnly
                  />
                </div>

                <div className="text-[#C1C8E1] mt-10 border-b-[2px] border-b-[#d0ced4]">
                  <input
                    type="text"
                    placeholder="City"
                    className="w-full p-2 bg-inherit"
                    name="cityLocality"
                    value={shipToAddress.cityLocality}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex flex-col md:flex-row md:gap-4 md:justify-evenly">
                  <div className="text-[#C1C8E1] mt-10 border-b-[2px] border-b-[#d0ced4] w-full">
                    <input
                      type="text"
                      placeholder="Country Code (e.g., US)"
                      className="w-full p-2 bg-inherit"
                      name="countryCode"
                      value={shipToAddress.countryCode}
                      onChange={handleChange}
                      readOnly
                    />
                  </div>
                  <div className="text-[#C1C8E1] mt-10 border-b-[2px] border-b-[#d0ced4] w-full">
                    <input
                      type="text"
                      placeholder="Postal Code"
                      className="w-full p-2 bg-inherit"
                      name="postalCode"
                      value={shipToAddress.postalCode}
                      onChange={handleChange}
                      readOnly
                    />
                  </div>
                </div>

                <button
                  className="bg-yellow-600 hover:bg-yellow-700 h-[44px] w-[182px] rounded-sm text-white mt-24"
                  type="submit"
                >
                  {shippingButText}
                </button>
              </form>
            ) : (
              <>
                <h1 className="text-[22px] text-[#1D3178] font-bold my-6 text-center">
                  Select a Rate
                </h1>
                <div className="grid md:grid-cols-2 gap-2">
                  {rates.map((rate) => (
                    <div
                      key={rate.rateId}
                      className={`p-4 border-[2px] flex gap-2 items-center rounded-lg shadow-md transition-transform transform hover:scale-105 cursor-pointer ${
                        rateId === rate.rateId
                          ? "border-[#19D16F] bg-green-200"
                          : "border-gray-200 bg-gray-50"
                      }`}
                      onClick={() => {
                        setRateId(rate.rateId);
                        setRateAmount(rate.shippingAmount.amount);
                      }}
                    >
                      <input
                        title="input"
                        type="radio"
                        name="shippingRate"
                        checked={rateId === rate.rateId}
                        onChange={() => setRateId(rate.rateId)}
                        className="form-radio h-4 w-4 text-[#19D16F]"
                      />
                      <div>
                        <p className="text-[#1D3178]">
                          Service: {rate.serviceType} in{" "}
                          {rate.carrierDeliveryDays} Days
                        </p>
                        <p className="text-[#1D3178]">
                          Cost: {rate.shippingAmount.amount}{" "}
                          {rate.shippingAmount.currency}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {rateId && (
                  <div className="mt-8">
                    <button
                      onClick={handleCreateLabel}
                      disabled={loading}
                      className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-gray-400"
                    >
                      {loading ? "Creating Label..." : "Create Label"}
                    </button>
                    {errors && (<p className="text-red-500 text-center font-samibold mt-8">{errors}</p>)}
                  </div>
                )}

                {labelPdf && (
                  <Link target="_blank" href={labelPdf}>
                    <button className="px-4 py-2 w-full border-[2px] border-green-500 bg-green-300 mt-3 text-green-900 rounded-md hover:bg-green-400">
                      Download Label
                    </button>
                  </Link>
                )}

                {trackingObj && (
                  <div className="mt-8">
                    <h2 className="text-[18px] font-semibold text-gray-800 mb-4">
                      Tracking: (We are using ShipEngine test API key, so the
                      order will not be traced)
                    </h2>
                    <p>Tracking Number: {trackingObj.trackingNumber}</p>
                    <p>Label ID: {trackingObj.labelId}</p>
                    <p>Carrier Code: {trackingObj.carrierCode}</p>
                    <button
                      onClick={() => {
                        setIsConfirm(true);
                        setIsOrder(true);
                        router.push(
                          `/checkout/?labelId=${trackingObj.labelId}`
                        );
                      }}
                      className="px-4 py-2 w-full mt-3 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                      Track Order
                    </button>
                  </div>
                )}

                {isConfirm && <TrackShipment />}
              </>
            )}
          </div>

          <div className="lg:w-[60%] w-full p-4">
            {cartItems.map((item: any) => {
              const itemPrice = item?.quantity * Number(item?.price);
              const discountAmount =
                item?.dicountPercentage && item?.dicountPercentage > 0
                  ? itemPrice * (Number(item?.dicountPercentage) / 100)
                  : 0;
              const priceAfterDiscount = itemPrice - discountAmount;

              return (
                <div
                  key={item?._id}
                  className="bg-[#E1E1E4] px-4 py-3 mb-6 rounded-lg shadow-md flex justify-between items-center"
                >
                  <div className="flex gap-4 items-center">
                    <Image
                      src={item?.productImage.asset?.url}
                      height={87}
                      width={83}
                      alt={item?.title}
                      className="h-[87px] w-[83px] object-cover rounded-lg"
                    />
                    <div>
                      <h2 className="text-[14px] font-semibold text-[#1D3178]">
                        {item?.title}
                      </h2>
                      <p className="text-[12px] text-[#A1A8C1]">Color: Brown</p>
                      <p className="text-[12px] text-[#A1A8C1]">Size: XL</p>
                      <div className="mt-2 text-sm text-[#1D3178]">
                        Quantity: {item?.quantity}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm text-[#A1A8C1] line-through">
                      ${itemPrice.toFixed(2)}
                    </div>

                    <div className="text-lg font-bold text-[#15245E]">
                      ${priceAfterDiscount.toFixed(2)}
                    </div>

                    {discountAmount > 0 && (
                      <div className="text-xs text-green-600 mt-2">
                        You save ${discountAmount.toFixed(2)} (
                        {item?.dicountPercentage}% off)
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Cart Totals Section */}
            <div className="w-full bg-[#E8E6F1] p-6 rounded-lg shadow-md">
              <h2 className="text-center text-[#1D3178] text-[18px] font-bold mb-4">
                Cart Totals
              </h2>

              {/* Total Quantity */}
              <div className="flex justify-between text-[#1D3178] py-2 border-b border-[#d0ced4]">
                <h3 className="font-medium">Total Quantity:</h3>
                <h3 className="font-bold">${totalQuantity.toFixed(2)}</h3>
              </div>

              {/* Total Discount */}
              <div className="flex justify-between text-[#1D3178] py-2 border-b border-[#d0ced4]">
                <h3 className="font-medium">Total Discount:</h3>
                <h3 className="font-bold">${totalDiscount.toFixed(2)}</h3>
              </div>
              {/* ship charges  */}
              {rateAmount > 0 && (
                <div className="flex justify-between text-[#1D3178] py-2 border-b border-[#d0ced4]">
                  <h3 className="font-medium">Ship Charges:</h3>
                  <h3 className="font-bold">${rateAmount.toFixed(2)}</h3>
                </div>
              )}
              {/* Subtotal */}
              <div className="flex justify-between text-[#1D3178] py-2 border-b border-[#d0ced4]">
                <h3 className="font-medium">Subtotals:</h3>
                <h3 className="font-bold">${subtotal.toFixed(2)}</h3>
              </div>

              {/* Total */}
              <div className="flex justify-between text-[#1D3178] py-2 border-b border-[#d0ced4]">
                <h3 className="font-medium">Total:</h3>
                <h3 className="font-bold">${total.toFixed(2)}</h3>
              </div>

              {/* Shipping & Taxes Note */}
              <div className="flex gap-2 items-center mt-4">
                <IoCheckbox className="text-[#19D16F]" />
                <p className="text-[#8A91AB] text-[14px]">
                  Shipping & taxes calculated at checkout
                </p>
              </div>
              <p className="text-gray-500 text-[14px] mt-3 ml-4">
                Payment will be received at the time of delivery
              </p>

              {/* Place Order Button */}
              <button
                className={`w-full text-[16px] py-3 mt-6 rounded-md ${
                  isOrder
                    ? "bg-yellow-600 hover:bg-yellow-700 text-white"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                onClick={() => {
                  if (!isOrder) return;
                  setShowModal(true);
                  placeOrderHandler();
                }}
                disabled={!isOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </section>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-[90%] md:w-[400px]">
            <h3 className="text-xl font-bold text-[#1D3178] mb-4">
              Confirm Order
            </h3>
            <p className="text-[#8A91AB] text-sm mb-6">
              Are you sure you want to place this order? You can review your
              cart before finalizing the order.
            </p>
            <div className="flex justify-between">
              <button
                className="text-white bg-gray-600 hover:bg-gray-700 py-2 px-4 rounded-md"
                onClick={handleContinueShopping}
              >
                Continue Shopping
              </button>
              <button
                className="text-white bg-yellow-600 hover:bg-yellow-700 py-2 px-4 rounded-md"
                onClick={handleOrderConfirmation}
              >
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order Confirmation Message */}
      {orderPlaced && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-[90%] md:w-[400px]">
            <h3 className="text-xl font-bold text-[#1D3178] mb-4">
              Order Placed
            </h3>
            <p className="text-[#8A91AB] text-sm mb-6">
              Your order has been placed. Payment will be received at the time
              of delivery.
            </p>
          </div>
        </div>
      )}
    </main>
  );
};

export default CheckoutForm;