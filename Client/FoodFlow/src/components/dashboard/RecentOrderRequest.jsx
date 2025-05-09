import { BsThreeDotsVertical } from "react-icons/bs"
import Rounded2xlBtn from "../button/Rounded2xlBtn"
import MapPin from "../shapeDisplays/MapPin"
import SquareDisplay from "../shapeDisplays/SquareDisplay"
import { MdKeyboardArrowDown } from "react-icons/md"
import OrderRequestAction from "./OrderRequestAction"

export default function RecentOrderRequest() {
  return (
          <div className="w-[66%] max-sm:w-[100%] border rounded-md h-full border-zinc-300 p-3 overflow-y-scroll scrollbar-hide">
            <div className="w-full flex justify-between items-center">
              <div className="flex items-center gap-4">
              <MapPin/>
              <h2>Recent order request</h2>
              </div>
                <Rounded2xlBtn
                border="border"
                borderColor="zinc-300"
                color="[#4F4F4F]"
                bg=""
                width="w-32"
                hieght="h-10"
                 content={
                 <div className="flex gap-2">
                    <span>Newest</span>
                    <MdKeyboardArrowDown size={24}/>
                 </div>}
                 />
            </div>

          <div className="mt-4 max-sm:w-[100%] flex flex-col gap-1 ">
            {Array(2).fill(1).map((x,i)=>{
              return(
                <div
                 key={i}
                  className="w-full max-sm:w-[fit-content] border border-zinc-300 h-fit rounded-md flex gap-2 items-center md:justify-between px-4 py-1 text-xs">
                    <div className="flex items-center gap-4 w-fit">
                      {/* for image */}
                      <div className=" w-[40px] h-[40px] rounded-full border"></div>
                      <div className="flex flex-col ">
                        <span>Akwu Stew and Chicken</span>
                        <span className="text-secondary text-[0.6rem]">Friday march 15</span>
                        <span className="text-primary text-[0.6rem]">#6462762832</span>
                      </div>
                    </div>

                    <div className="w-fit flex justify-between items-center">
                      <div className="flex flex-col ">
                        <span>Tayo peters</span>
                        <span className="text-[0.6rem] text- text-[#4F4F4F]">no 14, akpu street</span>
                      </div>

                      <div className="flex gap-4 items-center">
                          <div>#2200</div>
                          <div>x3</div>
                          <SquareDisplay
                          color="text-white"
                          border="border border-blue-800"
                          bg="bg-[#52A9EA]"
                          // w-[100px] h-[30px]"
                          size="w-[70px] h-[25px] sm:w-[100px] sm:h-[30px]"
                          content={<span>Pending</span>}
                          maxWidth="sm:max-w-[50px]"
                          />
                          <OrderRequestAction/>
                      </div>
                    </div>
                </div>
              )
            })}
            <div className="flex items-center gap-1 text-primary mx-auto text-sm"><span className="underline">view more</span> <MdKeyboardArrowDown className="mt-1" size={20}/></div>
          </div>

          </div>
  )
}
