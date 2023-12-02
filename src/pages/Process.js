import React from "react";
import Navbar from "../features/navbar/Navbar";
import Footer from "../features/common/Footer";
import StepperContent from "../features/common/StepperContent";
import SoapBubbleBackground from "../features/common/SoapBubbleBackground";
import Ticket from "../features/common/Ticket";

const Process = () => {
  return (
    <>
      <Navbar>
      <SoapBubbleBackground className="hidden md:block"></SoapBubbleBackground>
        <StepperContent/>
        <section className="max-w-full overflow-hidden relative z-[-1] py-10  bg-[#1D2430] ">
          <div className="">
            <div className="-mx-4 flex flex-wrap items-center">
              <div className="w-full px-4 lg:w-1/2">
                <div className="relative mx-auto mb-12 aspect-[25/24] max-w-[500px] text-center lg:m-0 ">
                  <img
                    src="https://github.com/jitujiten/ecommerceBackend/assets/120164938/98959159-5ef1-4d13-b667-935f4df58305"
                    alt="about image"
                    className="ml-0 md:ml-20 "
                  />
                </div>
              </div>
              <div className="overflow-hidden p-4  lg:w-1/2  flex justify-center items-center ">
                <div className="p-10">
                  <div className="mb-9">
                    <h3 className="agbalumo mb-4 text-xl  text-white sm:text-2xl lg:text-xl xl:text-2xl border-b-8 border-indigo-600 p-2">
                      Product Section
                    </h3>
                    <ul className="text-gray-300 font-serif">
                      <li className="py-2 flex items-center ">
                        <span className="bg-gray-400 h-2 w-2 rounded-full mr-2  "></span>
                        Choose your favourite star product on product page
                      </li>
                      <li className="py-2 flex items-center">
                        <span className="bg-gray-400 h-2 w-2 rounded-full mr-2"></span>
                        Explore about the product on the product details page
                      </li>
                      <li className="py-2 flex items-center">
                        <span className="bg-gray-400 h-2 w-2 rounded-full mr-2"></span>
                        Register with token amount (30% of the base bid price)
                      </li>
                    </ul>
                  </div>
                  <div className="mb-9">
                    <h3 className="agbalumo mb-4 text-xl  text-white sm:text-2xl lg:text-xl xl:text-2xl  border-b-8 border-indigo-600 p-2">
                      Bidding Process
                    </h3>
                    <ul className="text-gray-300 font-serif">
                      <li className="py-2 flex items-center">
                        <span className="bg-gray-400 h-2 w-2 rounded-full mr-2"></span>
                        Go to the bidding page of the perticular product
                      </li>
                      <li className="py-2 flex items-center">
                        <span className="bg-gray-400 h-2 w-2 rounded-full mr-2"></span>
                        Participate in the bid
                      </li>
                      <li className="py-2 flex items-center">
                        <span className="bg-gray-400 h-2 w-2 rounded-full mr-2"></span>
                        You will get 20 chance to place bid
                      </li>
                    </ul>
                  </div>
                  <div className="mb-1">
                    <h3 className="agbalumo mb-4 text-xl  text-white sm:text-2xl lg:text-xl xl:text-2xl border-b-8 border-indigo-600 p-2">
                      After Winning Process
                    </h3>
                    <ul className="text-gray-300 font-serif">
                      <li className="py-2 flex items-center">
                        <span className="bg-gray-400 h-2 w-2 rounded-full mr-2"></span>
                        Pay rest amount within 24 hours to place the order
                      </li>
                      <li className="py-2 flex items-center">
                        <span className="bg-gray-400 h-2 w-2 rounded-full mr-2"></span>
                        The Product will deliver within 15 days after paying the
                        rest amount
                      </li>
                      <li className="py-2 flex items-center">
                        <span className="bg-gray-400 h-2 w-2 rounded-full mr-2"></span>
                        we provide a video chat with your favourite star after
                        winning the bid
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Ticket/>
      </Navbar>
      <Footer />
    </>
  );
};

export default Process;
